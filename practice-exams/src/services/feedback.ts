const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4o";
/** Cheaper model for the short translate lookups. */
const TRANSLATE_MODEL = "gpt-4o-mini";

/** In-memory cache so repeated lookups of the same word/phrase don't re-bill. */
const translationCache = new Map<string, string>();

/**
 * Translate an English word or short phrase into Argentinian (Rioplatense)
 * Spanish. Returns ONLY the translation — no explanation. Cached in memory.
 * Runs on demand (only when the user searches), to keep API costs low.
 *
 * @throws Error with a user-friendly message if the request fails.
 */
export async function translateToArgentineSpanish(
  input: string,
  signal?: AbortSignal,
): Promise<string> {
  const term = input.trim();
  if (!term) return "";

  const cacheKey = term.toLowerCase();
  const cached = translationCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const apiKey = import.meta.env.VITE_OPENAI_KEY as string | undefined;
  if (!apiKey) {
    throw new Error("Missing VITE_OPENAI_KEY. Add it to your .env file and restart the dev server.");
  }

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: TRANSLATE_MODEL,
      temperature: 0.2,
      max_tokens: 60,
      messages: [
        {
          role: "system",
          content:
            "You are a translator. Translate the English word or phrase the user sends into Argentinian (Rioplatense) Spanish. " +
            "Output ONLY the translation — no explanations, no quotes, no extra words, no punctuation beyond what the translation itself needs. " +
            "If there are several common senses, give the most common one, optionally followed by one alternative separated by a comma.",
        },
        { role: "user", content: term },
      ],
    }),
    signal,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("OpenAI rejected the API key (401). Check VITE_OPENAI_KEY.");
    if (res.status === 429) throw new Error("Rate limited or out of quota (429). Try again shortly.");
    throw new Error(`OpenAI request failed (${res.status}). ${detail.slice(0, 200)}`);
  }

  const json = await res.json();
  const translation = (json.choices?.[0]?.message?.content ?? "").trim();
  translationCache.set(cacheKey, translation);
  return translation;
}

export type WritingContext = {
  exam: string;
  task: string;
  prompt: string;
  answer: string;
  minWords: number;
};

function buildSystemPrompt(exam: string): string {
  return [
    `You are an experienced ${exam} English writing examiner.`,
    "Give personalized, constructive feedback on the candidate's written response.",
    "",
    "ENGLISH STANDARD (important):",
    "- Assess against STANDARD INTERNATIONAL ENGLISH, exactly as a global IELTS/PTE examiner would. The reading passages use New Zealand topics for context only — this is NOT a New Zealand English exam.",
    "- Do NOT require, reward, or suggest New Zealand slang, regionalisms, or NZ-specific spelling/usage. Judge grammar, vocabulary, coherence, and task response by globally accepted English-exam norms. Standard British or American conventions are equally acceptable.",
    "",
    "LANGUAGE RULES (important):",
    "- Write ALL of your explanation and commentary in Argentinian (Rioplatense) Spanish — use voseo (vos/tenés/podés), informal but respectful register, and natural Argentinian phrasing. Do NOT use Spain or neutral Latin American Spanish.",
    "- The candidate is learning ENGLISH, so every English reference, correction, example, and suggested rewrite must be shown IN ENGLISH (the target language they are practising). Explain the issue in Spanish, then give the improved English version in English.",
    "- When you quote the candidate or show a corrected sentence, keep that quote/rewrite in English; only the surrounding explanation is in Spanish.",
    "",
    "Structure your feedback with these sections, using markdown headings (write the heading text in Spanish):",
    "1. **Impresión general** — one or two sentences in Spanish.",
    "2. **Fortalezas** — specific things done well, quoting their actual English text (quotes stay in English).",
    "3. **Aspectos a mejorar** — concrete issues (task response, coherence, grammar, vocabulary). Explain each in Spanish, then provide the suggested rewrite in English (label it clearly, e.g. *Mejor:* \"<English rewrite>\").",
    "4. **Puntaje estimado** — give an approximate score/band for this exam and briefly justify it in Spanish.",
    "Be warm and encouraging while staying honest and useful — the goal is to motivate an English learner. Reference the candidate's actual words. Keep the whole response under 200 words if possible.",
  ].join("\n");
}

function buildUserPrompt(ctx: WritingContext): string {
  return [
    `Exam: ${ctx.exam}`,
    `Task: ${ctx.task}`,
    `Minimum words expected: ${ctx.minWords}`,
    "",
    "Prompt the candidate was answering:",
    ctx.prompt || "(no prompt text provided)",
    "",
    "Candidate's response:",
    ctx.answer,
  ].join("\n");
}
export async function streamWritingFeedback(
  ctx: WritingContext,
  onToken: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const apiKey = import.meta.env.VITE_OPENAI_KEY as string | undefined;
  if (!apiKey) {
    throw new Error("Missing VITE_OPENAI_KEY. Add it to your .env file and restart the dev server.");
  }

  const res = await fetch(OPENAI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.4,
      messages: [
        { role: "system", content: buildSystemPrompt(ctx.exam) },
        { role: "user", content: buildUserPrompt(ctx) },
      ],
    }),
    signal,
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 401) throw new Error("OpenAI rejected the API key (401). Check VITE_OPENAI_KEY.");
    if (res.status === 429) throw new Error("Rate limited or out of quota (429). Try again shortly.");
    throw new Error(`OpenAI request failed (${res.status}). ${detail.slice(0, 200)}`);
  }
  if (!res.body) throw new Error("No response stream from OpenAI.");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        const token = json.choices?.[0]?.delta?.content;
        if (token) onToken(token);
      } catch {
        // Ignore keep-alive lines or partial JSON; the next chunk completes it.
      }
    }
  }
}
