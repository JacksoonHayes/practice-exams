import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * Shared UI kit for the language practice exams (IELTS Academic, IELTS General
 * Training, PTE). It keeps the violet/twilight theme of the app consistent and
 * holds the "check answers as you go" state so individual question components
 * can self-wire through context instead of threading props.
 */

type Feedback = { correct: boolean; message: string };

type ExamState = {
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
  if (!ctx) throw new Error('Exam components must be rendered inside <ExamShell>');
  return ctx;
}

const wordCount = (text: string) => text.trim().split(/\s+/).filter((w) => w.length > 0).length;

// ── Shared class strings ──────────────────────────────────────────────────
const card = 'bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm';
const innerBox = 'bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)]';
const correctClasses = 'bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]';
const incorrectClasses = 'bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]';

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
      className='mt-2 px-4 py-2 bg-[rgba(80,50,110,0.55)] hover:bg-[rgba(100,70,130,0.6)] border border-[rgba(180,140,200,0.22)] text-sm'
      style={{ color: '#ede0f5' }}
    >
      Check
    </button>
  );
}

// ── Layout primitives ─────────────────────────────────────────────────────

export function SectionCard({ children }: { children: ReactNode }) {
  return <div className={card}>{children}</div>;
}

export function PassageTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
      {children}
    </h2>
  );
}

export function Passage({ children }: { children: ReactNode }) {
  return (
    <div className={`${innerBox} p-4 mb-6 text-sm leading-relaxed`} style={{ color: '#d4b894' }}>
      {children}
    </div>
  );
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div
      className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(180,140,200,0.22)]'
      style={{ color: '#9a88b8' }}
    >
      {children}
    </div>
  );
}

export function Instruction({ children }: { children: ReactNode }) {
  return (
    <div className='text-sm mb-4' style={{ color: '#ede0f5' }}>
      {children}
    </div>
  );
}

export function TipBox({ accent, children }: { accent: string; children: ReactNode }) {
  return (
    <div className='bg-[rgba(10,5,20,0.6)] border-l-4 p-4 text-sm' style={{ color: '#9a88b8', borderLeftColor: accent }}>
      {children}
    </div>
  );
}

// ── Question components ────────────────────────────────────────────────────

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
        <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
          {questionNum}
        </div>
      )}
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
        {questionText}
      </div>
      <input
        type='text'
        value={answers[id] || ''}
        onChange={(e) => setAnswer(id, e.target.value)}
        placeholder='Write your answer'
        className={`w-full px-3 py-2 ${innerBox} text-sm`}
        style={{ color: '#ede0f5' }}
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
        <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
          {questionNum}
        </div>
      )}
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
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
                  : 'bg-[rgba(10,5,20,0.6)] border-[rgba(180,140,200,0.3)] hover:bg-[rgba(40,30,50,0.6)]'
              }`}
            >
              <span className='font-semibold' style={{ color: selected ? 'inherit' : '#9a88b8' }}>
                {option.letter}
              </span>
              <span style={{ color: selected ? 'inherit' : '#ede0f5' }}>{option.text}</span>
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
  variant = 'tfng',
}: {
  id: string;
  questionText: string;
  correctAnswer: string;
  variant?: 'tfng' | 'ynng';
}) {
  const { answers, feedback, select } = useExam();
  const options = variant === 'ynng' ? ['Yes', 'No', 'Not Given'] : ['True', 'False', 'Not Given'];
  return (
    <div>
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
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
                  : 'bg-[rgba(10,5,20,0.6)] border-[rgba(180,140,200,0.3)] text-[#ede0f5] hover:bg-[rgba(40,30,50,0.6)]'
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
        <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
          {questionNum}
        </div>
      )}
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
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
                  ? 'bg-[rgba(80,50,110,0.55)] border-[rgba(200,160,220,0.5)] text-[#ede0f5]'
                  : 'bg-[rgba(10,5,20,0.6)] border-[rgba(180,140,200,0.3)] hover:bg-[rgba(40,30,50,0.6)]'
              }`}
            >
              <span className='font-semibold' style={{ color: isChosen ? 'inherit' : '#9a88b8' }}>
                {option.letter}
              </span>
              <span style={{ color: isChosen ? 'inherit' : '#ede0f5' }}>{option.text}</span>
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
export function Dropdown({
  id,
  options,
  correctAnswer,
}: {
  id: string;
  options: string[];
  correctAnswer: string;
}) {
  const { answers, feedback, select } = useExam();
  const status = feedback[id];
  const border = status ? (status.correct ? '#6ab04c' : '#d63031') : 'rgba(180,140,200,0.3)';
  return (
    <select
      value={answers[id] || ''}
      onChange={(e) => select(id, e.target.value, correctAnswer)}
      className='inline-block mx-1 px-2 py-1 bg-[rgba(10,5,20,0.85)] border text-sm align-middle'
      style={{ color: '#ede0f5', borderColor: border }}
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
      setResult({ correct: false, message: 'Assign a position to every paragraph first.' });
      return;
    }
    const allCorrect = items.every((it) => Number(positions[it.key]) === it.correctPos);
    setResult({
      correct: allCorrect,
      message: allCorrect
        ? 'Correct! The paragraphs are in the right order.'
        : `Not quite. The correct order is: ${[...items]
            .sort((a, b) => a.correctPos - b.correctPos)
            .map((it) => it.key)
            .join(' → ')}.`,
    });
  };

  return (
    <div>
      <div className='space-y-3'>
        {items.map((it) => (
          <div key={it.key} className={`flex gap-3 items-start px-4 py-3 ${innerBox}`}>
            <select
              value={positions[it.key] || ''}
              onChange={(e) => setPositions({ ...positions, [it.key]: e.target.value })}
              className='px-2 py-1 bg-[rgba(10,5,20,0.85)] border border-[rgba(180,140,200,0.3)] text-sm shrink-0'
              style={{ color: '#ede0f5' }}
            >
              <option value=''>#</option>
              {Array.from({ length: n }, (_, i) => i + 1).map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
            <span className='font-semibold shrink-0' style={{ color: '#9a88b8' }}>
              {it.key}
            </span>
            <span className='text-sm' style={{ color: '#d4b894' }}>
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
  const { answers, setAnswer } = useExam();
  const text = answers[id] || '';
  const count = wordCount(text);
  return (
    <SectionCard>
      {title && <PassageTitle>{title}</PassageTitle>}
      <p className='text-sm mb-4' style={{ color: '#9a88b8' }}>
        {instructions}
      </p>
      {prompt && (
        <div className={`${innerBox} p-4 mb-6 text-sm leading-relaxed`} style={{ color: '#d4b894' }}>
          {prompt}
        </div>
      )}
      {children}
      <textarea
        value={text}
        onChange={(e) => setAnswer(id, e.target.value)}
        rows={rows}
        placeholder={`Write your response here (at least ${minWords} words)...`}
        className={`w-full px-3 py-2 ${innerBox} text-sm resize-y`}
        style={{ color: '#ede0f5' }}
      />
      <div className='text-xs text-right mt-2' style={{ color: count >= minWords ? '#b4d99a' : '#9a88b8' }}>
        {count} / {minWords} words
      </div>
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
      answers,
      feedback,
      multi,
      setAnswer: (id, val) => setAnswers((prev) => ({ ...prev, [id]: val })),
      checkText: (id, correctAnswers) => {
        const userAnswer = (answers[id] || '').trim().toLowerCase();
        if (!userAnswer) {
          setFeedback((prev) => ({ ...prev, [id]: { correct: false, message: 'Please write an answer first.' } }));
          return;
        }
        const isCorrect = correctAnswers.some((ans) => userAnswer === ans.toLowerCase());
        setFeedback((prev) => ({
          ...prev,
          [id]: {
            correct: isCorrect,
            message: isCorrect ? 'Correct! Well done.' : `Not quite. The correct answer is: ${correctAnswers[0]}`,
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
            message: isCorrect ? 'Correct!' : `Incorrect. The correct answer is ${correctAnswer}.`,
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
          setFeedback((prev) => ({ ...prev, [id]: { correct: false, message: 'Select your answer(s) first.' } }));
          return;
        }
        const sortedChosen = [...chosen].sort().join(',');
        const sortedCorrect = [...correctAnswers].sort().join(',');
        const isCorrect = sortedChosen === sortedCorrect;
        setFeedback((prev) => ({
          ...prev,
          [id]: {
            correct: isCorrect,
            message: isCorrect
              ? 'Correct! Well done.'
              : `Not quite. The correct answer is: ${[...correctAnswers].sort().join(', ')}.`,
          },
        }));
      },
    }),
    [answers, feedback, multi],
  );

  return (
    <ExamContext.Provider value={value}>
      <div className='relative min-h-screen'>
        <div
          className='fixed inset-0 bg-cover'
          style={{
            backgroundImage: 'url(/bg.jpg)',
            backgroundPosition: 'center 0%',
            backgroundAttachment: 'fixed',
            filter: 'brightness(1) saturate(1)',
          }}
        />
        <div
          className='fixed inset-0'
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)',
          }}
        />

        <div className='relative z-10 container mx-auto px-4 py-12 max-w-4xl'>
          <button
            onClick={onBack}
            className='mb-8 text-base tracking-wide transition-all hover:text-[#f2d8e8] hover:translate-x-[-4px]'
            style={{ color: '#b89ab8' }}
          >
            ← Back to Dashboard
          </button>

          <div
            className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] border-l-4 p-8 backdrop-blur-sm mb-6'
            style={{ borderLeftColor: accent }}
          >
            <div className='mb-8'>
              <span
                className='inline-block text-sm px-3 py-2 border border-[rgba(180,140,200,0.3)] bg-[rgba(10,5,20,0.6)] tracking-wider'
                style={{ color: '#c9a8e0' }}
              >
                {code}
              </span>
              <h1
                className='text-4xl mt-4 mb-2 tracking-wider'
                style={{ color: '#f2d8e8', textShadow: '2px 2px 0 #3a1040, 0 0 12px rgba(200,140,220,0.4)' }}
              >
                {title}
              </h1>
              <p className='text-base tracking-wide' style={{ color: '#9a88b8' }}>
                {subtitle}
              </p>
            </div>

            <div className='flex gap-2 flex-wrap'>
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => onSectionChange(section)}
                  className={`px-4 py-2 text-sm tracking-wide transition-colors border border-[rgba(180,140,200,0.22)] ${
                    activeSection === section
                      ? 'bg-[rgba(80,50,110,0.55)] text-[#ede0f5]'
                      : 'bg-[rgba(10,5,20,0.6)] text-[#9a88b8] hover:bg-[rgba(40,30,50,0.6)]'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {children}
        </div>
      </div>
    </ExamContext.Provider>
  );
}
