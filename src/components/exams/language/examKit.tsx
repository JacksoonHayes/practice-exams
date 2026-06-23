import type { ReactNode } from "react";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import Markdown from "react-markdown";
import { streamWritingFeedback, translateToArgentineSpanish } from "../../../services/feedback";

type Feedback = { correct: boolean; message: string };

type ExamState = {
  examName: string;
  answers: Record<string, string>;
  feedback: Record<string, Feedback>;
  multi: Record<string, string[]>;
  setAnswer: (id: string, value: string) => void;
  checkText: (id: string, correctAnswers: string[]) => void;
  select: (id: string, choice: string, correctAnswer: string) => void;
  toggleMulti: (id: string, choice: string) => void;
  checkMulti: (id: string, correctAnswers: string[]) => void;
};

const ExamContext = createContext<ExamState | null>(null);

function useExam() {
  const ctx = useContext(ExamContext);
  if (!ctx) throw new Error("Exam components must be rendered inside <ExamShell>");
  return ctx;
}

const wordCount = (text: string) =>
  text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

const card = "bg-[rgba(12,20,28,0.75)] border border-[rgba(150,180,200,0.22)] p-6 backdrop-blur-sm";
const innerBox = "bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)]";
const correctClasses = "bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]";
const incorrectClasses = "bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]";

function FeedbackBox({ id }: { id: string }) {
  const { feedback } = useExam();
  if (!feedback[id]) return null;
  return (
    <div className={`mt-2 px-3 py-2 text-sm border ${feedback[id].correct ? correctClasses : incorrectClasses}`}>
      {feedback[id].message}
    </div>
  );
}

function CheckButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className='mt-2 px-4 py-2 bg-[rgba(40,75,100,0.55)] hover:bg-[rgba(55,95,120,0.6)] border border-[rgba(150,180,200,0.22)] text-sm'
      style={{ color: "#eaf2f8" }}
    >
      Check
    </button>
  );
}

export function SectionCard({ children }: { children: ReactNode }) {
  return <div className={card}>{children}</div>;
}

export function PassageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className='text-xl mb-4' style={{ color: "#eaf2f8" }}>
      {children}
    </h2>
  );
}

export function Passage({ children }: { children: ReactNode }) {
  return (
    <div className={`${innerBox} p-4 mb-6 text-sm leading-relaxed`} style={{ color: "#cdd9c0" }}>
      {children}
    </div>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div
      className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(150,180,200,0.22)]'
      style={{ color: "#8ba3b8" }}
    >
      {children}
    </div>
  );
}

export function Instruction({ children }: { children: ReactNode }) {
  return (
    <div className='text-sm mb-4' style={{ color: "#eaf2f8" }}>
      {children}
    </div>
  );
}

export function TipBox({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <div
      className='bg-[rgba(8,16,24,0.6)] border-l-4 p-4 text-sm'
      style={{ color: "#8ba3b8", borderLeftColor: accent }}
    >
      {children}
    </div>
  );
}

export function QuestionInput({
  id,
  questionNum,
  questionText,
  correctAnswers,
}: {
  id: string;
  questionNum?: string;
  questionText: string;
  correctAnswers: string[];
}) {
  const { answers, setAnswer, checkText } = useExam();
  return (
    <div>
      {questionNum && (
        <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#8ba3b8" }}>
          {questionNum}
        </div>
      )}
      <div className='text-sm mb-3' style={{ color: "#eaf2f8" }}>
        {questionText}
      </div>
      <input
        type='text'
        value={answers[id] || ""}
        onChange={(e) => setAnswer(id, e.target.value)}
        placeholder='Write your answer'
        className={`w-full px-3 py-2 ${innerBox} text-sm`}
        style={{ color: "#eaf2f8" }}
      />
      <CheckButton onClick={() => checkText(id, correctAnswers)} />
      <FeedbackBox id={id} />
    </div>
  );
}

export function MultipleChoice({
  id,
  questionNum,
  questionText,
  options,
  correctAnswer,
}: {
  id: string;
  questionNum?: string;
  questionText: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
}) {
  const { answers, feedback, select } = useExam();
  return (
    <div>
      {questionNum && (
        <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#8ba3b8" }}>
          {questionNum}
        </div>
      )}
      <div className='text-sm mb-3' style={{ color: "#eaf2f8" }}>
        {questionText}
      </div>
      <div className='space-y-2'>
        {options.map((option) => {
          const selected = answers[id] === option.letter;
          return (
            <div
              key={option.letter}
              onClick={() => select(id, option.letter, correctAnswer)}
              className={`flex gap-3 px-4 py-3 border cursor-pointer transition-colors text-sm ${
                selected
                  ? feedback[id]?.correct
                    ? correctClasses
                    : incorrectClasses
                  : "bg-[rgba(8,16,24,0.6)] border-[rgba(150,180,200,0.3)] hover:bg-[rgba(28,40,52,0.6)]"
              }`}
            >
              <span className='font-semibold' style={{ color: selected ? "inherit" : "#8ba3b8" }}>
                {option.letter}
              </span>
              <span style={{ color: selected ? "inherit" : "#eaf2f8" }}>{option.text}</span>
            </div>
          );
        })}
      </div>
      <FeedbackBox id={id} />
    </div>
  );
}

export function TrueFalse({
  id,
  questionText,
  correctAnswer,
  variant = "tfng",
}: {
  id: string;
  questionText: string;
  correctAnswer: string;
  variant?: "tfng" | "ynng";
}) {
  const { answers, feedback, select } = useExam();
  const options = variant === "ynng" ? ["Yes", "No", "Not Given"] : ["True", "False", "Not Given"];
  return (
    <div>
      <div className='text-sm mb-3' style={{ color: "#eaf2f8" }}>
        {questionText}
      </div>
      <div className='flex gap-2 flex-wrap'>
        {options.map((option) => {
          const selected = answers[id] === option;
          return (
            <button
              key={option}
              onClick={() => select(id, option, correctAnswer)}
              className={`px-4 py-2 text-sm border transition-colors ${
                selected
                  ? feedback[id]?.correct
                    ? correctClasses
                    : incorrectClasses
                  : "bg-[rgba(8,16,24,0.6)] border-[rgba(150,180,200,0.3)] text-[#eaf2f8] hover:bg-[rgba(28,40,52,0.6)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <FeedbackBox id={id} />
    </div>
  );
}

/** Choose-multiple question (e.g. "Choose TWO letters"). Order-independent. */
export function MultiSelect({
  id,
  questionNum,
  questionText,
  options,
  correctAnswers,
}: {
  id: string;
  questionNum?: string;
  questionText: string;
  options: { letter: string; text: string }[];
  correctAnswers: string[];
}) {
  const { multi, toggleMulti, checkMulti } = useExam();
  const chosen = multi[id] || [];
  return (
    <div>
      {questionNum && (
        <div className='text-xs uppercase tracking-wider mb-2' style={{ color: "#8ba3b8" }}>
          {questionNum}
        </div>
      )}
      <div className='text-sm mb-3' style={{ color: "#eaf2f8" }}>
        {questionText}
      </div>
      <div className='space-y-2'>
        {options.map((option) => {
          const isChosen = chosen.includes(option.letter);
          return (
            <div
              key={option.letter}
              onClick={() => toggleMulti(id, option.letter)}
              className={`flex gap-3 px-4 py-3 border cursor-pointer transition-colors text-sm ${
                isChosen
                  ? "bg-[rgba(40,75,100,0.55)] border-[rgba(160,200,225,0.5)] text-[#eaf2f8]"
                  : "bg-[rgba(8,16,24,0.6)] border-[rgba(150,180,200,0.3)] hover:bg-[rgba(28,40,52,0.6)]"
              }`}
            >
              <span className='font-semibold' style={{ color: isChosen ? "inherit" : "#8ba3b8" }}>
                {option.letter}
              </span>
              <span style={{ color: isChosen ? "inherit" : "#eaf2f8" }}>{option.text}</span>
            </div>
          );
        })}
      </div>
      <CheckButton onClick={() => checkMulti(id, correctAnswers)} />
      <FeedbackBox id={id} />
    </div>
  );
}

/** Inline drop-down used for fill-in-the-blank style questions. */
export function Dropdown({ id, options, correctAnswer }: { id: string; options: string[]; correctAnswer: string }) {
  const { answers, feedback, select } = useExam();
  const status = feedback[id];
  const border = status ? (status.correct ? "#6ab04c" : "#d63031") : "rgba(150,180,200,0.3)";
  return (
    <select
      value={answers[id] || ""}
      onChange={(e) => select(id, e.target.value, correctAnswer)}
      className='inline-block mx-1 px-2 py-1 bg-[rgba(8,16,24,0.85)] border text-sm align-middle'
      style={{ color: "#eaf2f8", borderColor: border }}
    >
      <option value=''>— select —</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
}

/**
 * Re-order task (PTE "Re-order paragraphs"). Each item gets a position selector;
 * checking compares the chosen order against the intended order. Self-contained
 * local state — does not touch the shared answer store.
 */
export function Reorder({ items }: { items: { key: string; text: string; correctPos: number }[] }) {
  const [positions, setPositions] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Feedback | null>(null);
  const n = items.length;

  const check = () => {
    const allFilled = items.every((it) => positions[it.key]);
    if (!allFilled) {
      setResult({ correct: false, message: "Assign a position to every paragraph first." });
      return;
    }
    const allCorrect = items.every((it) => Number(positions[it.key]) === it.correctPos);
    setResult({
      correct: allCorrect,
      message: allCorrect
        ? "Correct! The paragraphs are in the right order."
        : `Not quite. The correct order is: ${[...items]
            .sort((a, b) => a.correctPos - b.correctPos)
            .map((it) => it.key)
            .join(" → ")}.`,
    });
  };

  return (
    <div>
      <div className='space-y-3'>
        {items.map((it) => (
          <div key={it.key} className={`flex gap-3 items-start px-4 py-3 ${innerBox}`}>
            <select
              value={positions[it.key] || ""}
              onChange={(e) => setPositions({ ...positions, [it.key]: e.target.value })}
              className='px-2 py-1 bg-[rgba(8,16,24,0.85)] border border-[rgba(150,180,200,0.3)] text-sm shrink-0'
              style={{ color: "#eaf2f8" }}
            >
              <option value=''>#</option>
              {Array.from({ length: n }, (_, i) => i + 1).map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            <span className='font-semibold shrink-0' style={{ color: "#8ba3b8" }}>
              {it.key}
            </span>
            <span className='text-sm' style={{ color: "#cdd9c0" }}>
              {it.text}
            </span>
          </div>
        ))}
      </div>
      <CheckButton onClick={check} />
      {result && (
        <div className={`mt-2 px-3 py-2 text-sm border ${result.correct ? correctClasses : incorrectClasses}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}

/** Free-writing task with a live word counter and an optional stimulus area. */
export function WritingTask({
  id,
  title,
  instructions,
  prompt,
  minWords,
  rows = 8,
  children,
}: {
  id: string;
  title?: string;
  instructions: string;
  prompt?: ReactNode;
  minWords: number;
  rows?: number;
  children?: ReactNode;
}) {
  const { examName, answers, setAnswer } = useExam();
  const text = answers[id] || "";
  const count = wordCount(text);

  // Captures the rendered prompt + stimulus (incl. data tables) as plain text,
  // so the feedback request sees exactly what the candidate saw.
  const promptRef = useRef<HTMLDivElement>(null);

  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFeedback = async () => {
    if (!text.trim()) {
      setError("Write your response first, then request feedback.");
      return;
    }
    setLoading(true);
    setError("");
    setFeedback("");
    try {
      await streamWritingFeedback(
        {
          exam: examName,
          task: title || instructions,
          prompt: promptRef.current?.textContent?.trim() || "",
          answer: text,
          minWords,
        },
        (chunk) => setFeedback((prev) => prev + chunk),
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong requesting feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard>
      {title && <PassageTitle>{title}</PassageTitle>}
      <p className='text-sm mb-4' style={{ color: "#8ba3b8" }}>
        {instructions}
      </p>
      <div ref={promptRef}>
        {prompt && (
          <div className={`${innerBox} p-4 mb-6 text-sm leading-relaxed`} style={{ color: "#cdd9c0" }}>
            {prompt}
          </div>
        )}
        {children}
      </div>
      <textarea
        value={text}
        onChange={(e) => setAnswer(id, e.target.value)}
        rows={rows}
        placeholder={`Write your response here (at least ${minWords} words)...`}
        className={`w-full px-3 py-2 ${innerBox} text-sm resize-y`}
        style={{ color: "#eaf2f8" }}
      />
      <div className='text-xs text-right mt-2' style={{ color: count >= minWords ? "#b4d99a" : "#8ba3b8" }}>
        {count} / {minWords} words
      </div>

      <button
        onClick={getFeedback}
        disabled={loading}
        className='mt-3 px-4 py-2 bg-[rgba(40,75,100,0.55)] hover:bg-[rgba(55,95,120,0.6)] border border-[rgba(150,180,200,0.22)] text-sm disabled:opacity-50 disabled:cursor-not-allowed'
        style={{ color: "#eaf2f8" }}
      >
        {loading ? "Getting feedback…" : "✦ Get AI feedback"}
      </button>

      {error && <div className={`mt-2 px-3 py-2 text-sm border ${incorrectClasses}`}>{error}</div>}

      {feedback && (
        <div
          className={`${innerBox} mt-3 p-4 text-sm leading-relaxed`}
          style={{ color: "#eaf2f8" }}
        >
          <Markdown
            components={{
              h1: ({ children }) => (
                <h3 className='text-base font-semibold mt-4 mb-1 first:mt-0' style={{ color: "#a8cae0" }}>
                  {children}
                </h3>
              ),
              h2: ({ children }) => (
                <h3 className='text-base font-semibold mt-4 mb-1 first:mt-0' style={{ color: "#a8cae0" }}>
                  {children}
                </h3>
              ),
              h3: ({ children }) => (
                <h3 className='text-base font-semibold mt-4 mb-1 first:mt-0' style={{ color: "#a8cae0" }}>
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
              ul: ({ children }) => <ul className='list-disc pl-5 mb-2 space-y-1'>{children}</ul>,
              ol: ({ children }) => <ol className='list-decimal pl-5 mb-2 space-y-1'>{children}</ol>,
              li: ({ children }) => <li>{children}</li>,
              strong: ({ children }) => (
                <strong className='font-semibold' style={{ color: "#eaf2f8" }}>
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em style={{ color: "#cdd9c0" }}>{children}</em>
              ),
            }}
          >
            {feedback}
          </Markdown>
        </div>
      )}
    </SectionCard>
  );
}

// ── Exam shell (background, header, section tabs, answer state provider) ────

export function ExamShell<S extends string>({
  accent,
  code,
  title,
  subtitle,
  sections,
  activeSection,
  onSectionChange,
  onBack,
  children,
}: {
  accent: string;
  code: string;
  title: string;
  subtitle: string;
  sections: readonly S[];
  activeSection: S;
  onSectionChange: (section: S) => void;
  onBack: () => void;
  children: ReactNode;
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, Feedback>>({});
  const [multi, setMulti] = useState<Record<string, string[]>>({});

  const value = useMemo<ExamState>(
    () => ({
      examName: title,
      answers,
      feedback,
      multi,
      setAnswer: (id, val) => setAnswers((prev) => ({ ...prev, [id]: val })),
      checkText: (id, correctAnswers) => {
        const userAnswer = (answers[id] || "").trim().toLowerCase();
        if (!userAnswer) {
          setFeedback((prev) => ({ ...prev, [id]: { correct: false, message: "Please write an answer first." } }));
          return;
        }
        const isCorrect = correctAnswers.some((ans) => userAnswer === ans.toLowerCase());
        setFeedback((prev) => ({
          ...prev,
          [id]: {
            correct: isCorrect,
            message: isCorrect ? "Correct! Well done." : `Not quite. The correct answer is: ${correctAnswers[0]}`,
          },
        }));
      },
      select: (id, choice, correctAnswer) => {
        const isCorrect = choice === correctAnswer;
        setAnswers((prev) => ({ ...prev, [id]: choice }));
        setFeedback((prev) => ({
          ...prev,
          [id]: {
            correct: isCorrect,
            message: isCorrect ? "Correct!" : `Incorrect. The correct answer is ${correctAnswer}.`,
          },
        }));
      },
      toggleMulti: (id, choice) =>
        setMulti((prev) => {
          const current = prev[id] || [];
          const next = current.includes(choice) ? current.filter((c) => c !== choice) : [...current, choice];
          return { ...prev, [id]: next };
        }),
      checkMulti: (id, correctAnswers) => {
        const chosen = multi[id] || [];
        if (chosen.length === 0) {
          setFeedback((prev) => ({ ...prev, [id]: { correct: false, message: "Select your answer(s) first." } }));
          return;
        }
        const sortedChosen = [...chosen].sort().join(",");
        const sortedCorrect = [...correctAnswers].sort().join(",");
        const isCorrect = sortedChosen === sortedCorrect;
        setFeedback((prev) => ({
          ...prev,
          [id]: {
            correct: isCorrect,
            message: isCorrect
              ? "Correct! Well done."
              : `Not quite. The correct answer is: ${[...correctAnswers].sort().join(", ")}.`,
          },
        }));
      },
    }),
    [title, answers, feedback, multi],
  );

  return (
    <ExamContext.Provider value={value}>
      <div className='relative min-h-screen'>
        <div
          className='fixed inset-0 bg-cover'
          style={{
            backgroundImage: "url(/CfKUpQS.jpg)",
            backgroundPosition: "center center",
            backgroundAttachment: "fixed",
            filter: "brightness(1.25) saturate(1.05)",
          }}
        />
        <div
          className='fixed inset-0'
          style={{
            background:
              "linear-gradient(to bottom, rgba(15,25,35,0.30) 0%, rgba(10,18,28,0.70) 60%, rgba(8,14,22,0.90) 100%)",
          }}
        />

        <TranslatorPanel accent={accent} />

        <div className='relative z-10 container mx-auto px-4 py-8 sm:py-12 max-w-4xl'>
          <button
            onClick={onBack}
            className='mb-8 inline-block px-3 py-2 text-base tracking-wide transition-all bg-[rgba(8,16,24,0.7)] hover:bg-[rgba(28,40,52,0.8)] border border-[rgba(150,180,200,0.3)] backdrop-blur-sm hover:translate-x-1'
            style={{ color: "#eaf2f8" }}
          >
            ← Back to Dashboard
          </button>

          <div
            className='bg-[rgba(12,20,28,0.75)] border border-[rgba(150,180,200,0.22)] border-l-4 p-5 sm:p-8 backdrop-blur-sm mb-6'
            style={{ borderLeftColor: accent }}
          >
            <div className='mb-6 sm:mb-8'>
              <span
                className='inline-block text-sm px-3 py-2 border border-[rgba(150,180,200,0.3)] bg-[rgba(8,16,24,0.6)] tracking-wider'
                style={{ color: "#a8cae0" }}
              >
                {code}
              </span>
              <h1
                className='text-2xl sm:text-4xl mt-4 mb-2 tracking-wider'
                style={{ color: "#e8f4fb", textShadow: "2px 2px 0 #0a2230, 0 0 12px rgba(150,200,225,0.4)" }}
              >
                {title}
              </h1>
              <p className='text-sm sm:text-base tracking-wide' style={{ color: "#8ba3b8" }}>
                {subtitle}
              </p>
            </div>

            <div className='flex gap-2 flex-wrap'>
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => onSectionChange(section)}
                  className={`px-4 py-2 text-sm tracking-wide transition-colors border border-[rgba(150,180,200,0.22)] ${
                    activeSection === section
                      ? "bg-[rgba(40,75,100,0.55)] text-[#eaf2f8]"
                      : "bg-[rgba(8,16,24,0.6)] text-[#8ba3b8] hover:bg-[rgba(28,40,52,0.6)]"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <TranslatorPanel accent={accent} mobile />

          {children}
        </div>
      </div>
    </ExamContext.Provider>
  );
}

/**
 * Translator panel. The learner pastes/types an English word or phrase and gets
 * its Argentinian Spanish translation on demand. The OpenAI call runs only when
 * they submit (and results are cached), keeping costs low.
 *
 * Two presentations from one component:
 * - Desktop (default): a fixed panel pinned to the left of the exam.
 * - Mobile (`mobile`): a sticky bar that sits just under the exam header and
 *   stays pinned to the top of the viewport as the candidate scrolls. Starts
 *   collapsed so it doesn't crowd the screen.
 */
function TranslatorPanel({ accent, mobile = false }: { accent: string; mobile?: boolean }) {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(!mobile);

  const translate = async () => {
    const q = term.trim();
    if (!q) {
      setError("Type or paste a word to translate.");
      setResult("");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const translation = await translateToArgentineSpanish(q);
      setResult(translation || "—");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Translation failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Mobile: sticky bar under the header, shown below lg. Desktop: fixed left
  // panel, shown from lg up. Each variant is hidden in the other's breakpoint.
  const wrapperClass = mobile
    ? "lg:hidden sticky top-2 z-20 mb-6"
    : "hidden lg:block fixed left-4 top-12 z-20 w-72";

  return (
    <div className={wrapperClass}>
      <div
        className='bg-[rgba(12,20,28,0.85)] border border-[rgba(150,180,200,0.3)] border-l-4 backdrop-blur-sm'
        style={{ borderLeftColor: accent }}
      >
        <button
          onClick={() => setOpen((o) => !o)}
          className='w-full flex items-center justify-between px-4 py-3 text-sm tracking-wide'
          style={{ color: "#e8f4fb" }}
        >
          <span>✦ Translate</span>
          <span style={{ color: "#8ba3b8" }}>{open ? "−" : "+"}</span>
        </button>

        {open && (
          <div className='px-4 pb-4'>
            <p className='text-xs mb-2' style={{ color: "#8ba3b8" }}>
              Paste an English word for its Spanish translation.
            </p>
            <textarea
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyDown={(e) => {
                // Enter translates; Shift+Enter inserts a newline.
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void translate();
                }
              }}
              rows={mobile ? 2 : 5}
              placeholder='e.g. geothermal'
              className='w-full px-3 py-2 bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] text-sm resize-none overflow-y-auto'
              style={{ color: "#eaf2f8" }}
            />
            <button
              onClick={() => void translate()}
              disabled={loading}
              className='mt-2 w-full px-3 py-2 text-sm bg-[rgba(40,75,100,0.55)] hover:bg-[rgba(55,95,120,0.6)] border border-[rgba(150,180,200,0.22)] disabled:opacity-50 disabled:cursor-not-allowed'
              style={{ color: "#eaf2f8" }}
            >
              {loading ? "Translating…" : "Translate"}
            </button>

            {error && (
              <div className={`mt-2 px-3 py-2 text-xs border ${incorrectClasses}`}>{error}</div>
            )}
            {result && (
              <div
                className='mt-2 px-3 py-2 text-sm bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)]'
                style={{ color: "#cdd9c0" }}
              >
                {result}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
