import { useState } from 'react';

type Section = 'reading' | 'writing' | 'speaking';

export default function IELTSAcademic({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { correct: boolean; message: string }>>({});

  const checkTextAnswer = (id: string, correctAnswers: string[]) => {
    const userAnswer = (answers[id] || '').trim().toLowerCase();
    if (!userAnswer) {
      setFeedback({
        ...feedback,
        [id]: { correct: false, message: 'Please write an answer first.' },
      });
      return;
    }
    const isCorrect = correctAnswers.some((ans) => userAnswer === ans.toLowerCase());
    setFeedback({
      ...feedback,
      [id]: {
        correct: isCorrect,
        message: isCorrect ? 'Correct! Well done.' : `Not quite. The correct answer is: ${correctAnswers[0]}`,
      },
    });
  };

  const selectOption = (id: string, choice: string, correctAnswer: string) => {
    const isCorrect = choice === correctAnswer;
    setAnswers({ ...answers, [id]: choice });
    setFeedback({
      ...feedback,
      [id]: {
        correct: isCorrect,
        message: isCorrect ? 'Correct!' : `Incorrect. The correct answer is ${correctAnswer}.`,
      },
    });
  };

  const QuestionInput = ({
    id,
    questionNum,
    questionText,
    correctAnswers,
  }: {
    id: string;
    questionNum: string;
    questionText: string;
    correctAnswers: string[];
  }) => (
    <div>
      <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
        {questionNum}
      </div>
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
        {questionText}
      </div>
      <input
        type='text'
        value={answers[id] || ''}
        onChange={(e) => setAnswers({ ...answers, [id]: e.target.value })}
        placeholder='Write your answer'
        className='w-full px-3 py-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] text-sm'
        style={{ color: '#ede0f5' }}
      />
      <button
        onClick={() => checkTextAnswer(id, correctAnswers)}
        className='mt-2 px-4 py-2 bg-[rgba(80,50,110,0.55)] hover:bg-[rgba(100,70,130,0.6)] border border-[rgba(180,140,200,0.22)] text-sm'
        style={{ color: '#ede0f5' }}
      >
        Check
      </button>
      {feedback[id] && (
        <div
          className={`mt-2 px-3 py-2 text-sm border ${
            feedback[id].correct
              ? 'bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]'
              : 'bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]'
          }`}
        >
          {feedback[id].message}
        </div>
      )}
    </div>
  );

  const MultipleChoice = ({
    id,
    questionNum,
    questionText,
    options,
    correctAnswer,
  }: {
    id: string;
    questionNum: string;
    questionText: string;
    options: { letter: string; text: string }[];
    correctAnswer: string;
  }) => (
    <div>
      <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
        {questionNum}
      </div>
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
        {questionText}
      </div>
      <div className='space-y-2'>
        {options.map((option) => (
          <div
            key={option.letter}
            onClick={() => selectOption(id, option.letter, correctAnswer)}
            className={`flex gap-3 px-4 py-3 border cursor-pointer transition-colors ${
              answers[id] === option.letter
                ? feedback[id]?.correct
                  ? 'bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]'
                  : 'bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]'
                : 'bg-[rgba(10,5,20,0.6)] border-[rgba(180,140,200,0.3)] hover:bg-[rgba(40,30,50,0.6)]'
            } text-sm`}
          >
            <span className='font-semibold' style={{ color: answers[id] === option.letter ? 'inherit' : '#9a88b8' }}>
              {option.letter}
            </span>
            <span style={{ color: answers[id] === option.letter ? 'inherit' : '#ede0f5' }}>{option.text}</span>
          </div>
        ))}
      </div>
      {feedback[id] && (
        <div
          className={`mt-2 px-3 py-2 text-sm border ${
            feedback[id].correct
              ? 'bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]'
              : 'bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]'
          }`}
        >
          {feedback[id].message}
        </div>
      )}
    </div>
  );

  const TrueFalse = ({
    id,
    questionText,
    correctAnswer,
  }: {
    id: string;
    questionText: string;
    correctAnswer: string;
  }) => (
    <div>
      <div className='text-sm mb-3' style={{ color: '#ede0f5' }}>
        {questionText}
      </div>
      <div className='flex gap-2 flex-wrap'>
        {['True', 'False', 'Not Given'].map((option) => (
          <button
            key={option}
            onClick={() => selectOption(id, option, correctAnswer)}
            className={`px-4 py-2 text-sm border transition-colors ${
              answers[id] === option
                ? feedback[id]?.correct
                  ? 'bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]'
                  : 'bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]'
                : 'bg-[rgba(10,5,20,0.6)] border-[rgba(180,140,200,0.3)] text-[#ede0f5] hover:bg-[rgba(40,30,50,0.6)]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback[id] && (
        <div
          className={`mt-2 px-3 py-2 text-sm border ${
            feedback[id].correct
              ? 'bg-[rgba(106,176,76,0.15)] border-[#6ab04c] text-[#b4d99a]'
              : 'bg-[rgba(214,48,49,0.15)] border-[#d63031] text-[#ff7675]'
          }`}
        >
          {feedback[id].message}
        </div>
      )}
    </div>
  );

  return (
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
          background: 'linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)',
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

        <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] border-l-4 border-l-[#6ec99a] p-8 backdrop-blur-sm mb-6'>
          <div className='mb-8'>
            <span
              className='inline-block text-sm px-3 py-2 border border-[rgba(180,140,200,0.3)] bg-[rgba(10,5,20,0.6)] tracking-wider'
              style={{ color: '#c9a8e0' }}
            >
              NZ
            </span>
            <h1
              className='text-4xl mt-4 mb-2 tracking-wider'
              style={{
                color: '#f2d8e8',
                textShadow: '2px 2px 0 #3a1040, 0 0 12px rgba(200,140,220,0.4)',
              }}
            >
              IELTS Academic — NZ Practice Exam
            </h1>
            <p className='text-base tracking-wide' style={{ color: '#9a88b8' }}>
              New Zealand context · Four sections · Check answers as you go
            </p>
          </div>

          <div className='flex gap-2 flex-wrap'>
            {(['reading', 'writing', 'speaking'] as Section[]).map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
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


        {activeSection === 'reading' && (
          <div className='space-y-6'>
            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Passage 1 — New Zealand's geothermal energy
              </h2>
              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-6 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                <p className='mb-3'>
                  New Zealand sits on the Pacific Ring of Fire, giving it access to one of the world's most reliable
                  sources of renewable energy: geothermal power. The Waikato region, in particular, hosts the Wairakei
                  Geothermal Power Station — one of the oldest in the world, having generated electricity since 1958.
                  Today, geothermal energy accounts for roughly 17 percent of New Zealand's electricity generation,
                  making it a cornerstone of the country's push toward 100 percent renewable electricity by 2030.
                </p>
                <p className='mb-3'>
                  Geothermal energy is extracted by drilling wells into the earth's crust to access superheated steam
                  and hot water reservoirs. This steam drives turbines connected to generators. Unlike solar or wind
                  power, geothermal plants operate around the clock regardless of weather conditions, providing what
                  energy planners call "baseload" power — the steady minimum level of generation needed to meet constant
                  demand.
                </p>
                <p className='mb-3'>
                  However, geothermal development is not without controversy in New Zealand. Several active geothermal
                  fields overlap with areas of deep cultural significance to Māori iwi (tribes). Rotorua's famous
                  geothermal landscape, for example, is considered taonga — a treasure — by local Māori, and any
                  development proposals require extensive consultation under the Resource Management Act 1991 and Treaty
                  of Waitangi principles. Critics argue that past geothermal extraction near Rotorua caused measurable
                  subsidence and the loss of natural geysers, underscoring the need for careful management.
                </p>
                <p>
                  Despite these challenges, the New Zealand government has signalled support for expanding geothermal
                  capacity. Proponents argue that its minimal land footprint, low greenhouse gas emissions, and
                  reliability make it an ideal complement to variable renewable sources such as wind and solar. With
                  climate change placing mounting pressure on fossil fuel alternatives, New Zealand's geothermal sector
                  is widely seen as a model for other volcanic nations including Iceland and Kenya.
                </p>
              </div>

              <div
                className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Questions 1–4 · True / False / Not Given
              </div>

              <div className='space-y-6'>
                <TrueFalse
                  id='r1'
                  questionText='1. The Wairakei Geothermal Power Station began operating before 1960.'
                  correctAnswer='True'
                />
                <TrueFalse
                  id='r2'
                  questionText="2. Geothermal power currently provides more than 20 percent of New Zealand's electricity."
                  correctAnswer='False'
                />
                <TrueFalse
                  id='r3'
                  questionText='3. The Resource Management Act 1991 requires consultation with Māori before geothermal development.'
                  correctAnswer='True'
                />
                <TrueFalse
                  id='r4'
                  questionText='4. Iceland imports geothermal technology from New Zealand.'
                  correctAnswer='Not Given'
                />
              </div>

              <div
                className='text-xs uppercase tracking-wider my-6 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Question 5 · Multiple choice
              </div>

              <MultipleChoice
                id='r5'
                questionNum='Question 5'
                questionText='What is the main advantage of geothermal energy over solar and wind power according to the passage?'
                options={[
                  { letter: 'A', text: 'It produces no greenhouse gas emissions' },
                  { letter: 'B', text: 'It can operate continuously as baseload power' },
                  { letter: 'C', text: 'It requires less investment to build' },
                  { letter: 'D', text: 'It has no environmental impact' },
                ]}
                correctAnswer='B'
              />

              <div
                className='text-xs uppercase tracking-wider my-6 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Question 6 · Short answer (max 3 words)
              </div>

              <QuestionInput
                id='r6'
                questionNum='Question 6'
                questionText="What word does the passage use to describe Rotorua's geothermal landscape in terms of Māori cultural value?"
                correctAnswers={['taonga']}
              />
            </div>

            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Passage 2 — The kiwi bird and conservation
              </h2>
              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-6 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                <p className='mb-3'>
                  The kiwi, New Zealand's most iconic bird, is in trouble. Once widespread across both the North and
                  South Islands, kiwi populations have plummeted by roughly 70 percent since European colonisation began
                  in the 19th century. Today, fewer than 70,000 kiwi remain in the wild, with all five species listed as
                  either vulnerable or endangered on the International Union for Conservation of Nature (IUCN) Red List.
                </p>
                <p className='mb-3'>
                  The primary threat to kiwi survival is predation by introduced mammalian predators — stoats, ferrets,
                  rats, and possums — which were brought to New Zealand deliberately or accidentally by European
                  settlers. These animals were absent from New Zealand's ecosystems for millions of years, meaning native
                  birds had no evolutionary defences against them. Kiwi, being flightless and ground-nesting, are
                  particularly vulnerable; chick survival rates in areas without predator control can be as low as 5
                  percent.
                </p>
                <p className='mb-3'>
                  To combat this crisis, the New Zealand government launched Predator Free 2050 (PF2050) — an ambitious
                  goal to eradicate rats, stoats, and possums from the entire country by mid-century. The programme
                  employs a combination of trapping, 1080 poison aerial drops, and cutting-edge genetic biocontrol
                  research. Community groups, Māori organisations, schools, and businesses have all been enlisted as
                  partners, reflecting a broad societal commitment to ecological restoration.
                </p>
                <p>
                  Some conservationists remain cautious about timelines. Eradicating predators from large, rugged terrain
                  — including Fiordland's steep valleys — presents enormous logistical difficulties. Critics of 1080 also
                  argue that the poison affects non-target native species such as kea, though the Department of
                  Conservation maintains that the overall benefits of 1080 far outweigh its risks. Kiwi sanctuaries such
                  as Zealandia in Wellington and Maungatautari in the Waikato have demonstrated that, in predator-free
                  enclosures, kiwi populations can recover rapidly.
                </p>
              </div>

              <div
                className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Questions 7–9 · Matching headings
              </div>

              <div className='mb-6'>
                <div className='text-sm mb-4' style={{ color: '#ede0f5' }}>
                  Match each paragraph to the correct heading below. Write the Roman numeral (i–iv).
                </div>
                <div
                  className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-4 text-sm'
                  style={{ color: '#d4b894' }}
                >
                  <strong>Headings:</strong>
                  <br />
                  i. A bold national eradication programme
                  <br />
                  ii. The scale of kiwi's decline
                  <br />
                  iii. Debate over methods and cautious optimism
                  <br />
                  iv. Why introduced species are so deadly
                </div>

                <div className='space-y-4'>
                  <QuestionInput
                    id='r7'
                    questionNum='Question 7'
                    questionText='Paragraph A (first paragraph):'
                    correctAnswers={['ii']}
                  />
                  <QuestionInput
                    id='r8'
                    questionNum='Question 8'
                    questionText='Paragraph B (second paragraph):'
                    correctAnswers={['iv']}
                  />
                  <QuestionInput
                    id='r9'
                    questionNum='Question 9'
                    questionText='Paragraph C (third paragraph):'
                    correctAnswers={['i']}
                  />
                </div>
              </div>

              <div
                className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Question 10 · Multiple choice
              </div>

              <MultipleChoice
                id='r10'
                questionNum='Question 10'
                questionText='What does the passage suggest about kiwi sanctuaries like Zealandia and Maungatautari?'
                options={[
                  { letter: 'A', text: 'They prove eradication nationwide is impossible' },
                  { letter: 'B', text: 'They show kiwi can recover when predators are removed' },
                  { letter: 'C', text: 'They rely entirely on 1080 poison drops' },
                  { letter: 'D', text: 'They were established by Māori iwi alone' },
                ]}
                correctAnswer='B'
              />

              <div
                className='text-xs uppercase tracking-wider my-6 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Question 11 · Sentence completion (max 2 words)
              </div>

              <QuestionInput
                id='r11'
                questionNum='Question 11'
                questionText='The programme Predator Free 2050 aims to eliminate three specific predators from New Zealand by the year _______.'
                correctAnswers={['2050', 'mid-century']}
              />
            </div>

            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Passage 3 — The Māori Language Revitalisation
              </h2>
              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-6 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                <p className='mb-3'>
                  Te reo Māori, the indigenous language of New Zealand, has undergone a remarkable transformation over the past fifty years. In the 1970s, the language was on the brink of extinction, with fewer than 20 percent of Māori people able to speak it fluently. Today, thanks to deliberate policy interventions and grassroots activism, te reo Māori is experiencing a resurgence that has captured international attention as a model for endangered language revival.
                </p>
                <p className='mb-3'>
                  The turning point came in 1987 when te reo Māori was declared an official language of New Zealand under the Māori Language Act. This legislative milestone was preceded by the establishment of kōhanga reo (language nests) in 1982 — Māori-language preschools where children were immersed in te reo from an early age. The kōhanga reo movement, initiated by Māori elders concerned about language loss, proved extraordinarily successful. By 1990, over 800 kōhanga reo were operating nationwide, serving more than 14,000 children. These early-childhood centres became the foundation for a complete education pathway, eventually expanding into kura kaupapa Māori (Māori-language primary schools) and wharekura (secondary schools).
                </p>
                <p className='mb-3'>
                  Government support has been crucial but uneven. Te Māngai Pāho, a Crown entity established to promote Māori language broadcasting, has funded radio stations and television programming since 1993. The creation of the dedicated Māori Television channel in 2004 further normalised te reo in public life. However, critics argue that resources remain insufficient. A 2019 review found that while public awareness of te reo has grown significantly — with many New Zealanders now able to use basic greetings and phrases — the number of fluent speakers has plateaued at around 20 percent of the Māori population, roughly the same proportion as in the 1970s.
                </p>
                <p>
                  Linguists attribute the plateau to what they call "passive competence" — widespread recognition and limited vocabulary, but insufficient deep fluency for transmission to the next generation. Addressing this gap will require sustained investment in adult education and creating more domains where te reo is the primary language of communication, not merely a symbolic gesture. Nonetheless, New Zealand's approach has inspired similar initiatives in Hawaii, Scotland, and among Indigenous communities in Canada, demonstrating that language revitalisation, though challenging, is achievable with political will and community leadership.
                </p>
              </div>

              <div
                className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Questions 12–14 · Summary completion (choose from list)
              </div>

              <div className='mb-6'>
                <div className='text-sm mb-4' style={{ color: '#ede0f5' }}>
                  Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.
                </div>
                <div
                  className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-4 text-sm leading-relaxed'
                  style={{ color: '#d4b894' }}
                >
                  The Māori language was in danger of disappearing in the 1970s. The first major initiative to save it was the creation of <strong>(12) _______</strong>, which were Māori-language preschools. These were established in 1982 after concerns from Māori elders. By 1990, more than 14,000 children attended these centres. The Māori Language Act of 1987 made te reo Māori an <strong>(13) _______</strong> of New Zealand. Despite increased public awareness, the percentage of fluent speakers has remained at about 20 percent, which linguists explain is due to <strong>(14) _______</strong> rather than deep fluency.
                </div>

                <div className='space-y-4'>
                  <QuestionInput
                    id='r12'
                    questionNum='Question 12'
                    questionText='(12)'
                    correctAnswers={['kōhanga reo', 'kohanga reo', 'language nests']}
                  />
                  <QuestionInput
                    id='r13'
                    questionNum='Question 13'
                    questionText='(13)'
                    correctAnswers={['official language']}
                  />
                  <QuestionInput
                    id='r14'
                    questionNum='Question 14'
                    questionText='(14)'
                    correctAnswers={['passive competence']}
                  />
                </div>
              </div>

              <div
                className='text-xs uppercase tracking-wider mb-4 pb-2 border-b border-[rgba(180,140,200,0.22)]'
                style={{ color: '#9a88b8' }}
              >
                Question 15 · Multiple choice
              </div>

              <MultipleChoice
                id='r15'
                questionNum='Question 15'
                questionText='According to the passage, what is needed to increase the number of fluent te reo Māori speakers beyond current levels?'
                options={[
                  { letter: 'A', text: 'More Māori Television programming' },
                  { letter: 'B', text: 'Creating environments where te reo is the main language used' },
                  { letter: 'C', text: 'Teaching basic greetings to all New Zealanders' },
                  { letter: 'D', text: 'Establishing more kōhanga reo centres' },
                ]}
                correctAnswer='B'
              />
            </div>

            <div
              className='bg-[rgba(10,5,20,0.6)] border-l-4 border-l-[#6ec99a] p-4 text-sm'
              style={{ color: '#9a88b8' }}
            >
              <strong>Reading tip:</strong> For True/False/Not Given questions, "Not Given" means the passage neither
              confirms nor denies the statement — not that it's unknown in real life. For summary completion, read the instructions carefully about word limits and whether words must come from the passage.
            </div>
          </div>
        )}

        {activeSection === 'writing' && (
          <div className='space-y-6'>
            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Task 1 — Data description
              </h2>
              <p className='text-sm mb-4' style={{ color: '#9a88b8' }}>
                Spend about 20 minutes on this task. Write at least 150 words.
              </p>
              <p className='text-sm mb-4' style={{ color: '#d4b894' }}>
                The table below shows the number of international visitors to New Zealand from five countries in 2019
                and 2023. Summarise the information by selecting and reporting the main features, and make comparisons
                where relevant.
              </p>

              <div className='overflow-x-auto mb-6'>
                <table className='w-full text-sm border-collapse'>
                  <thead>
                    <tr>
                      <th
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-left'
                        style={{ background: 'rgba(10,5,20,0.6)', color: '#9a88b8' }}
                      >
                        Country
                      </th>
                      <th
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ background: 'rgba(10,5,20,0.6)', color: '#9a88b8' }}
                      >
                        2019 (thousands)
                      </th>
                      <th
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ background: 'rgba(10,5,20,0.6)', color: '#9a88b8' }}
                      >
                        2023 (thousands)
                      </th>
                      <th
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ background: 'rgba(10,5,20,0.6)', color: '#9a88b8' }}
                      >
                        Change
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='border border-[rgba(180,140,200,0.3)] px-3 py-2' style={{ color: '#ede0f5' }}>
                        Australia
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        1,520
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        1,380
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ff7675' }}
                      >
                        −9.2%
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-[rgba(180,140,200,0.3)] px-3 py-2' style={{ color: '#ede0f5' }}>
                        USA
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        390
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        420
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#b4d99a' }}
                      >
                        +7.7%
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-[rgba(180,140,200,0.3)] px-3 py-2' style={{ color: '#ede0f5' }}>
                        China
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        410
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        210
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ff7675' }}
                      >
                        −48.8%
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-[rgba(180,140,200,0.3)] px-3 py-2' style={{ color: '#ede0f5' }}>
                        UK
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        270
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        290
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#b4d99a' }}
                      >
                        +7.4%
                      </td>
                    </tr>
                    <tr>
                      <td className='border border-[rgba(180,140,200,0.3)] px-3 py-2' style={{ color: '#ede0f5' }}>
                        India
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        90
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        170
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#b4d99a' }}
                      >
                        +88.9%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <textarea
                value={answers.w1 || ''}
                onChange={(e) => setAnswers({ ...answers, w1: e.target.value })}
                rows={8}
                placeholder='Write your Task 1 response here (at least 150 words)...'
                className='w-full px-3 py-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] text-sm resize-y'
                style={{ color: '#ede0f5' }}
              />
              <div className='text-xs text-right mt-2' style={{ color: '#9a88b8' }}>
                {(answers.w1 || '').trim().split(/\s+/).filter((w) => w.length > 0).length} words
              </div>
            </div>

            <div
              className='bg-[rgba(10,5,20,0.6)] border-l-4 border-l-[#6ec99a] p-4 text-sm'
              style={{ color: '#9a88b8' }}
            >
              <strong>Task 1 tip:</strong> Open with an overview sentence identifying the most striking trends. Do not
              give personal opinions or explain causes — just describe what the data shows. Use language like "overall",
              "notably", "by contrast", and "the most striking change".
            </div>

            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Task 2 — Academic essay
              </h2>
              <p className='text-sm mb-4' style={{ color: '#9a88b8' }}>
                Spend about 40 minutes on this task. Write at least 250 words.
              </p>

              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-6 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                <strong>
                  Some people believe that New Zealand should prioritise economic development over environmental
                  conservation. Others argue that protecting the natural environment must come first.
                </strong>
                <br />
                <br />
                Discuss both views and give your own opinion.
              </div>

              <textarea
                value={answers.w2 || ''}
                onChange={(e) => setAnswers({ ...answers, w2: e.target.value })}
                rows={13}
                placeholder='Write your Task 2 essay here (at least 250 words)...'
                className='w-full px-3 py-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] text-sm resize-y'
                style={{ color: '#ede0f5' }}
              />
              <div className='text-xs text-right mt-2' style={{ color: '#9a88b8' }}>
                {(answers.w2 || '').trim().split(/\s+/).filter((w) => w.length > 0).length} words
              </div>
            </div>

            <div
              className='bg-[rgba(10,5,20,0.6)] border-l-4 border-l-[#6ec99a] p-4 text-sm'
              style={{ color: '#9a88b8' }}
            >
              <strong>Task 2 tip:</strong> Aim for 4–5 paragraphs — Introduction → View 1 → View 2 → Your opinion →
              Conclusion. Each body paragraph needs a clear topic sentence, development, and a specific example. Avoid
              listing points; develop each one fully.
            </div>

            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm mt-6'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Task 3 — Graph description
              </h2>
              <p className='text-sm mb-4' style={{ color: '#9a88b8' }}>
                Spend about 20 minutes on this task. Write at least 150 words.
              </p>
              <p className='text-sm mb-4' style={{ color: '#d4b894' }}>
                The graph below shows the percentage of households in New Zealand with internet access from 2000 to 2023. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.
              </p>

              <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-6'>
                <div className='text-center mb-3 text-sm font-semibold' style={{ color: '#c9a8e0' }}>
                  Percentage of NZ Households with Internet Access
                </div>
                <div className='flex items-end justify-around h-48 border-l-2 border-b-2 border-[rgba(180,140,200,0.3)] pl-2 pb-2'>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: '37%' }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>2000</div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>37%</div>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: '57%' }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>2005</div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>57%</div>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: '75%' }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>2010</div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>75%</div>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: '85%' }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>2015</div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>85%</div>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: '93%' }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>2020</div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>93%</div>
                  </div>
                  <div className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: '95%' }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>2023</div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>95%</div>
                  </div>
                </div>
              </div>

              <textarea
                value={answers.w3 || ''}
                onChange={(e) => setAnswers({ ...answers, w3: e.target.value })}
                rows={8}
                placeholder='Write your Task 3 response here (at least 150 words)...'
                className='w-full px-3 py-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] text-sm resize-y'
                style={{ color: '#ede0f5' }}
              />
              <div className='text-xs text-right mt-2' style={{ color: '#9a88b8' }}>
                {(answers.w3 || '').trim().split(/\s+/).filter((w) => w.length > 0).length} words
              </div>
            </div>
          </div>
        )}

        {activeSection === 'speaking' && (
          <div className='space-y-6'>
            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Part 1 — Introduction and interview
              </h2>
              <p className='text-sm mb-6' style={{ color: '#9a88b8' }}>
                Answer these questions as you would in the exam. Aim for 2–4 natural sentences per answer.
              </p>

              <div className='space-y-4'>
                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 1
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    Where are you from, and what do you like most about your hometown?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 2
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    Do you prefer spending time outdoors or indoors? Why?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 3
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    How do people in New Zealand typically spend their weekends?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 4
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    Are you studying or working at the moment?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 5
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    Do you think it's important for children to spend time in nature? Why or why not?
                  </div>
                </div>
              </div>
            </div>

            <div
              className='bg-[rgba(10,5,20,0.6)] border-l-4 border-l-[#6ec99a] p-4 text-sm'
              style={{ color: '#9a88b8' }}
            >
              <strong>Part 1 tip:</strong> Keep answers natural and conversational. Extend with a reason or brief
              example. Avoid one-word answers, but don't over-prepare a script — the examiner will notice.
            </div>

            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Part 2 — Individual long turn
              </h2>
              <p className='text-sm mb-4' style={{ color: '#9a88b8' }}>
                You have 1 minute to prepare notes, then speak for 1–2 minutes without interruption.
              </p>

              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-4 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                <strong>Describe a natural place in New Zealand that you have visited or would like to visit.</strong>
                <br />
                <br />
                You should say:
                <br />· where this place is
                <br />· what it looks like
                <br />· what you can do there
                <br />
                <br />
                and explain why this place is special to you or appeals to you.
              </div>

              <div className='text-sm mb-2' style={{ color: '#9a88b8' }}>
                Use the space below to jot 1-minute preparation notes:
              </div>
              <textarea
                value={answers.sp2 || ''}
                onChange={(e) => setAnswers({ ...answers, sp2: e.target.value })}
                rows={4}
                placeholder='Preparation notes...'
                className='w-full px-3 py-2 bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] text-sm resize-y'
                style={{ color: '#ede0f5' }}
              />
            </div>

            <div
              className='bg-[rgba(10,5,20,0.6)] border-l-4 border-l-[#6ec99a] p-4 text-sm'
              style={{ color: '#9a88b8' }}
            >
              <strong>Part 2 tip:</strong> Use signpost phrases to sound structured and fluent — "The place I'd like to
              talk about is…", "One thing that really strikes me about it is…", "What makes it particularly special
              is…". Keep talking for the full 2 minutes.
            </div>

            <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] p-6 backdrop-blur-sm'>
              <h2 className='text-xl mb-4' style={{ color: '#ede0f5' }}>
                Part 3 — Two-way discussion
              </h2>
              <p className='text-sm mb-6' style={{ color: '#9a88b8' }}>
                Give extended, well-reasoned answers. Aim for 4–6 sentences each, considering different perspectives.
              </p>

              <div className='space-y-4'>
                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 1
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    How important is it for countries to protect their natural landscapes from the effects of tourism?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 2
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    Do you think future generations will have less access to natural environments than people do today?
                    Why or why not?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 3
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    Some people say technology is damaging people's relationship with nature. To what extent do you
                    agree?
                  </div>
                </div>

                <div>
                  <div className='text-xs uppercase tracking-wider mb-2' style={{ color: '#9a88b8' }}>
                    Question 4
                  </div>
                  <div className='text-sm' style={{ color: '#ede0f5' }}>
                    In your view, what role should governments play in protecting endangered species compared to private conservation organisations?
                  </div>
                </div>
              </div>
            </div>

            <div
              className='bg-[rgba(10,5,20,0.6)] border-l-4 border-l-[#6ec99a] p-4 text-sm'
              style={{ color: '#9a88b8' }}
            >
              <strong>Part 3 tip:</strong> Start with a clear position, support it with a reason and example, then
              acknowledge the other side briefly. Phrases like "That said…" or "However, one could argue…" signal
              sophisticated thinking to the examiner.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
