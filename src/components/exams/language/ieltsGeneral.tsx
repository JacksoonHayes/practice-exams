import { useState } from 'react';
import {
  ExamShell,
  Instruction,
  MultipleChoice,
  Passage,
  PassageTitle,
  QuestionInput,
  SectionCard,
  TipBox,
  TrueFalse,
  WritingTask,
} from './examKit';

type Section = 'reading' | 'writing' | 'grammar' | 'connectors';

const ACCENT = '#e0a8c9';

export default function IELTSGeneral({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');

  return (
    <ExamShell
      accent={ACCENT}
      code='GT'
      title='IELTS General Training — Practice Exam'
      subtitle='Reading & Writing · Check answers as you go'
      sections={['reading', 'writing', 'grammar', 'connectors'] as const}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      {activeSection === 'reading' && (
        <div className='space-y-6'>
          {/* ── Section 1: social survival ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Section 1 · Social survival
            </div>
            <PassageTitle>Text A — City Council recycling notice</PassageTitle>
            <Passage>
              <p className='mb-3'>
                <strong>Kerbside collection — what goes where</strong>
              </p>
              <p className='mb-3'>
                Your red-lid rubbish bin is collected weekly. Your yellow-lid recycling bin and green-lid food scraps
                bin are collected on alternating fortnights — please check the calendar posted on the council website by
                entering your street address.
              </p>
              <p className='mb-3'>
                <strong>Recycling (yellow lid):</strong> Glass bottles and jars, plastic containers marked 1, 2 and 5,
                paper, and cardboard. Please rinse all containers. Lids should be removed and placed in the rubbish bin,
                not the recycling.
              </p>
              <p className='mb-3'>
                <strong>Food scraps (green lid):</strong> All food waste including meat, bones, and citrus. Do NOT place
                food scraps in plastic bags — line your kitchen caddy with newspaper instead. Garden waste is not
                accepted in this bin.
              </p>
              <p>
                Bins must be placed at the kerb by 7:00 am on collection day with the lid closed. Bins overfilled so the
                lid will not close will not be emptied. For missed collections, report online within 48 hours.
              </p>
            </Passage>

            <div className='space-y-6'>
              <TrueFalse
                id='gt1'
                questionText='1. The rubbish bin and the recycling bin are collected on the same schedule.'
                correctAnswer='False'
              />
              <TrueFalse
                id='gt2'
                questionText='2. Bottle lids should be put in the recycling bin with the bottles.'
                correctAnswer='False'
              />
              <TrueFalse
                id='gt3'
                questionText='3. Meat and bones are allowed in the green-lid food scraps bin.'
                correctAnswer='True'
              />
              <TrueFalse
                id='gt4'
                questionText='4. Garden waste can be placed in the food scraps bin.'
                correctAnswer='False'
              />
              <TrueFalse
                id='gt5'
                questionText='5. Recycling is collected more often in summer than in winter.'
                correctAnswer='Not Given'
              />
            </div>

            <div className='mt-10 space-y-4'>
              <QuestionInput
                id='gt6'
                questionText='What should you use to line your kitchen caddy instead of a plastic bag?'
                correctAnswers={['newspaper']}
              />
              <QuestionInput
                id='gt7'
                questionText='By what time must bins be at the kerb on collection day?'
                correctAnswers={['7:00 am', '7am', '7 am', '7:00am']}
              />
            </div>
          </SectionCard>

          {/* ── Section 2: workplace ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Section 2 · Workplace
            </div>
            <PassageTitle>Text B — New employee leave entitlements</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Welcome to the team. This summary explains your leave entitlements under national employment law and
                our company policy. It is a guide only; the full policy is on the staff intranet.
              </p>
              <p className='mb-3'>
                <strong>Annual leave:</strong> After 12 months of continuous employment you are entitled to four weeks
                of paid annual leave per year. Leave requests must be submitted to your manager at least two weeks in
                advance through the online portal. During the December–January period, requests should be made by 1
                November as this is our busiest holiday season.
              </p>
              <p className='mb-3'>
                <strong>Sick leave:</strong> You become entitled to 10 days of paid sick leave after six months of
                employment, and a further 10 days on each subsequent anniversary. Unused sick leave carries over, up to a
                maximum of 20 days. If you are away sick for three or more consecutive days, the company may require a
                medical certificate, the cost of which we will reimburse.
              </p>
              <p>
                <strong>Public holidays:</strong> The country observes 11 public holidays, plus a regional anniversary
                day. If you work on a public holiday, you are paid time-and-a-half and receive an alternative day off
                ("a day in lieu"). Midwinter Day is a public holiday observed in the middle of winter.
              </p>
            </Passage>

            <div className='space-y-6'>
              <MultipleChoice
                id='gt8'
                questionText='When does an employee first become entitled to paid annual leave?'
                options={[
                  { letter: 'A', text: 'Immediately on starting' },
                  { letter: 'B', text: 'After six months' },
                  { letter: 'C', text: 'After 12 months of continuous employment' },
                  { letter: 'D', text: 'After two years' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='gt9'
                questionText='What is the deadline for requesting leave over the December–January period?'
                options={[
                  { letter: 'A', text: 'Two weeks before the leave' },
                  { letter: 'B', text: '1 November' },
                  { letter: 'C', text: '1 December' },
                  { letter: 'D', text: 'There is no deadline' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='gt10'
                questionText='What is the maximum number of sick days that can be carried over?'
                options={[
                  { letter: 'A', text: '10 days' },
                  { letter: 'B', text: '15 days' },
                  { letter: 'C', text: '20 days' },
                  { letter: 'D', text: 'There is no maximum' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='gt11'
                questionText='What does an employee receive for working on a public holiday?'
                options={[
                  { letter: 'A', text: 'Double pay only' },
                  { letter: 'B', text: 'Time-and-a-half pay and a day in lieu' },
                  { letter: 'C', text: 'A day in lieu only' },
                  { letter: 'D', text: 'An extra week of annual leave' },
                ]}
                correctAnswer='B'
              />
            </div>

            <div className='mt-10 space-y-4'>
              <QuestionInput
                id='gt12'
                questionText='If you are sick for three or more consecutive days, the company may require a _______.'
                correctAnswers={['medical certificate', 'certificate']}
              />
              <QuestionInput
                id='gt13'
                questionText='The public holiday observed in the middle of winter is called _______.'
                correctAnswers={['Midwinter Day', 'Midwinter']}
              />
            </div>
          </SectionCard>

          {/* ── Section 3: general interest ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Section 3 · General interest
            </div>
            <PassageTitle>Text C — A culture of improvisation</PassageTitle>
            <Passage>
              <p className='mb-3'>
                In many rural societies, a culture of improvisation grew out of necessity. In the 19th century, a
                specific gauge of fencing wire was imported in enormous quantities during a farming boom, and over time
                it came to symbolise a wider talent for improvisation — the ability to fix, build, or invent almost
                anything with limited materials and a bit of ingenuity.
              </p>
              <p className='mb-3'>
                The wire arrived with the expansion of livestock farming. Settlers on isolated farms could not easily
                obtain specialised tools or replacement parts, and waiting months for supplies from overseas was
                impractical. Out of necessity, farmers learned to repurpose whatever was at hand. The fencing wire,
                being strong, cheap, and abundant, became the universal solution: it was twisted into gate latches,
                fashioned into tools, and used to repair machinery far from any workshop.
              </p>
              <p className='mb-3'>
                Over time, this practical resourcefulness hardened into a point of cultural pride. People began to speak
                of a "can-do" attitude that valued clever, low-cost solutions over expensive, off-the-shelf ones. The
                idea has been invoked to explain everything from a strong record of agricultural innovation to the
                success of individual inventors who built influential machines in makeshift home workshops.
              </p>
              <p className='mb-3'>
                Not everyone celebrates the idea, however. Some commentators argue that this mentality has a downside: a
                tendency to favour quick fixes over proper investment, and to undervalue specialist expertise. A
                patched-up solution, they point out, is not always the best long-term answer, and an economy cannot
                innovate at scale on improvisation alone. Modern industries, they argue, increasingly depend on
                research, formal training, and international collaboration rather than backyard tinkering.
              </p>
              <p>
                Still, the idea endures. Whether praised or questioned, this kind of practical creativity remains a
                shorthand for resourcefulness that many communities continue to regard as central to their identity.
              </p>
            </Passage>

            <Instruction>Do the following statements agree with the views of the writer?</Instruction>
            <div className='space-y-6'>
              <TrueFalse
                id='gt14'
                variant='ynng'
                questionText='14. The wire described in the text originally referred to a type of fencing wire.'
                correctAnswer='Yes'
              />
              <TrueFalse
                id='gt15'
                variant='ynng'
                questionText='15. Settlers could easily order replacement parts from overseas when machinery broke down.'
                correctAnswer='No'
              />
              <TrueFalse
                id='gt16'
                variant='ynng'
                questionText='16. The writer believes this improvisation mentality has only positive effects.'
                correctAnswer='No'
              />
              <TrueFalse
                id='gt17'
                variant='ynng'
                questionText='17. Inventors who used this approach earned more money than any other inventors in their countries.'
                correctAnswer='Not Given'
              />
            </div>

            <div className='mt-10'>
              <MultipleChoice
                id='gt18'
                questionText='What criticism of the improvisation mentality does the passage mention?'
                options={[
                  { letter: 'A', text: 'It is too expensive for ordinary farmers' },
                  { letter: 'B', text: 'It can favour quick fixes over proper investment and expertise' },
                  { letter: 'C', text: 'It is no longer understood by younger people' },
                  { letter: 'D', text: 'It was invented overseas rather than locally' },
                ]}
                correctAnswer='B'
              />
            </div>

            <div className='mt-10 mb-6'>
              <Instruction>Complete the summary. Choose NO MORE THAN TWO WORDS from the passage for each answer.</Instruction>
              <div
                className='bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] p-4 mb-4 text-sm leading-relaxed'
                style={{ color: '#cdd9c0' }}
              >
                The phrase comes from a gauge of wire imported during a 19th-century farming boom. Because the wire was
                strong, cheap and <strong>(19) _______</strong>, farmers used it to repair almost anything. Today the
                phrase describes a <strong>(20) _______</strong> attitude that prefers clever low-cost solutions.
              </div>
              <div className='space-y-4'>
                <QuestionInput id='gt19' questionText='(19)' correctAnswers={['abundant']} />
                <QuestionInput
                  id='gt20'
                  questionText='(20)'
                  correctAnswers={['can-do', 'can do']}
                />
              </div>
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Reading tip:</strong> In General Training, Section 1 uses everyday texts (notices, ads), Section 2
            focuses on the workplace, and Section 3 is one longer general-interest passage. Watch for small details such
            as times, numbers, and conditions ("at least", "up to", "after") — these are where many marks are won or
            lost.
          </TipBox>
        </div>
      )}

      {activeSection === 'writing' && (
        <div className='space-y-6'>
          <WritingTask
            id='gw1'
            title='Task 1 — Letter'
            instructions='Spend about 20 minutes on this task. Write at least 150 words. You do NOT need to write any addresses.'
            minWords={150}
            rows={10}
            prompt={
              <>
                You recently rented a holiday house at a coastal town through a property manager, but several
                things were not as described in the listing.
                <br />
                <br />
                Write a letter to the property manager. In your letter:
                <br />· explain why you rented the house and when you stayed
                <br />· describe the problems you experienced
                <br />· say what you would like the manager to do about it
                <br />
                <br />
                Begin your letter <em>Dear Sir or Madam,</em>
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Task 1 tip:</strong> Match the tone to the reader — this is a complaint to someone you don't know, so
            keep it semi-formal. Cover all three bullet points, use clear paragraphs, and close appropriately ("I look
            forward to your reply. Yours faithfully,").
          </TipBox>

          <WritingTask
            id='gw2'
            title='Task 2 — Essay'
            instructions='Spend about 40 minutes on this task. Write at least 250 words.'
            minWords={250}
            rows={13}
            prompt={
              <>
                <strong>
                  In many countries, more people are choosing to live in cities rather than in rural areas.
                </strong>
                <br />
                <br />
                Why is this happening, and what problems can it cause? Give reasons for your answer and include any
                relevant examples from your own knowledge or experience.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Task 2 tip:</strong> The General Training essay is marked the same way as Academic. Answer every part
            of the question — here, both the <em>causes</em> and the <em>problems</em>. Use a clear four-paragraph
            structure and support each idea with a specific example.
          </TipBox>

          <WritingTask
            id='gw3'
            title='Task 3 — Informal letter'
            instructions='Write at least 150 words. Practising English with an everyday, friendly topic.'
            minWords={150}
            rows={10}
            prompt={
              <>
                An Argentine friend has invited you to share an <em>asado</em> (a traditional barbecue) with their family
                in Buenos Aires next weekend.
                <br />
                <br />
                Write a friendly reply. In your letter:
                <br />· thank your friend and say you would like to come
                <br />· ask what you could bring or help with
                <br />· explain what time you can arrive and how you will get there
                <br />
                <br />
                Begin your letter <em>Dear …,</em>
              </>
            }
          />

          <WritingTask
            id='gw4'
            title='Task 4 — Opinion essay'
            instructions='Write at least 250 words. Remember: this is English practice — write your whole answer in English.'
            minWords={250}
            rows={13}
            prompt={
              <>
                <strong>
                  In Argentina, sharing <em>mate</em> (a traditional drink) is an important social custom that brings
                  people together. Some people worry that busy modern life and technology are weakening traditions like
                  this.
                </strong>
                <br />
                <br />
                To what extent do you agree or disagree? Give reasons for your answer and include relevant examples from
                your own knowledge or experience.
              </>
            }
          />

          <WritingTask
            id='gw5'
            title='Task 5 — Describe and explain'
            instructions='Write at least 250 words. Describe clearly and give reasons — all in English.'
            minWords={250}
            rows={13}
            prompt={
              <>
                <strong>
                  Tourism to Patagonia and the Iguazú Falls brings money and jobs to Argentina, but large numbers of
                  visitors can also damage natural environments.
                </strong>
                <br />
                <br />
                What are the advantages and disadvantages of tourism growth in natural areas? Suggest what could be done
                to protect these places while still welcoming visitors.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Tasks 3–5 tip:</strong> The topics are about Argentine culture, but your answer must be in English —
            that is the skill being practised. The AI feedback is encouraging and written in Spanish, with the corrected
            English shown in English so you can learn the right form.
          </TipBox>
        </div>
      )}

      {activeSection === 'grammar' && (
        <div className='space-y-6'>
          <SectionCard>
            <Instruction>
              Choose the grammatically correct option. These sentences use Argentine cultural topics, but the focus is
              English grammar — verb tenses, articles, prepositions, and agreement.
            </Instruction>
            <div className='space-y-6'>
              <MultipleChoice
                id='gg1'
                questionText='1. Every Sunday, my Argentine host family ______ a big asado in the garden.'
                options={[
                  { letter: 'A', text: 'have' },
                  { letter: 'B', text: 'has' },
                  { letter: 'C', text: 'having' },
                  { letter: 'D', text: 'is have' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='gg2'
                questionText='2. Last year I ______ to Bariloche for the first time and loved the lakes.'
                options={[
                  { letter: 'A', text: 'go' },
                  { letter: 'B', text: 'have gone' },
                  { letter: 'C', text: 'went' },
                  { letter: 'D', text: 'was going' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='gg3'
                questionText='3. Mate is ______ traditional drink that many Argentines share with friends.'
                options={[
                  { letter: 'A', text: 'a' },
                  { letter: 'B', text: 'an' },
                  { letter: 'C', text: 'the' },
                  { letter: 'D', text: '(no article)' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='gg4'
                questionText='4. If I ______ more time in Buenos Aires, I would learn to dance tango properly.'
                options={[
                  { letter: 'A', text: 'have' },
                  { letter: 'B', text: 'had' },
                  { letter: 'C', text: 'will have' },
                  { letter: 'D', text: 'would have' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='gg5'
                questionText='5. The Iguazú Falls are ______ than I had ever imagined.'
                options={[
                  { letter: 'A', text: 'impressive' },
                  { letter: 'B', text: 'more impressive' },
                  { letter: 'C', text: 'most impressive' },
                  { letter: 'D', text: 'the most impressive' },
                ]}
                correctAnswer='B'
              />
            </div>
          </SectionCard>

          <SectionCard>
            <Instruction>
              Write a short answer in English. Press <em>Check</em> to compare your answer and get encouraging AI
              feedback.
            </Instruction>
            <div className='space-y-6'>
              <QuestionInput
                id='gg6'
                questionText='Rewrite in the past simple: "We travel to Mendoza and visit the vineyards."'
                correctAnswers={['We travelled to Mendoza and visited the vineyards.', 'We traveled to Mendoza and visited the vineyards.']}
              />
              <QuestionInput
                id='gg7'
                questionText='Complete with the correct preposition: "In Argentina, people often meet ______ a café to chat for hours."'
                correctAnswers={['at', 'in']}
              />
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Grammar tip:</strong> Read the whole sentence before choosing — the surrounding words usually signal
            the tense ("last year" → past, "every Sunday" → present). Articles (a/an/the) depend on whether the noun is
            general or specific.
          </TipBox>
        </div>
      )}

      {activeSection === 'connectors' && (
        <div className='space-y-6'>
          <SectionCard>
            <Instruction>
              Choose the best connecting word. The questions get harder as you go — from basic linkers to more advanced
              ones.
            </Instruction>
            <div className='space-y-6'>
              <MultipleChoice
                id='gc1'
                questionText='1. (Basic) I like mate ______ I drink it every morning.'
                options={[
                  { letter: 'A', text: 'and' },
                  { letter: 'B', text: 'but' },
                  { letter: 'C', text: 'or' },
                  { letter: 'D', text: 'so' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='gc2'
                questionText='2. (Basic) We stayed inside ______ it was raining in Buenos Aires.'
                options={[
                  { letter: 'A', text: 'but' },
                  { letter: 'B', text: 'or' },
                  { letter: 'C', text: 'because' },
                  { letter: 'D', text: 'and' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='gc3'
                questionText='3. (Medium) ______ the tickets were expensive, we decided to see the tango show.'
                options={[
                  { letter: 'A', text: 'Because' },
                  { letter: 'B', text: 'Although' },
                  { letter: 'C', text: 'So' },
                  { letter: 'D', text: 'And' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='gc4'
                questionText='4. (Medium) The asado took hours to prepare; ______, everyone agreed it was worth the wait.'
                options={[
                  { letter: 'A', text: 'however' },
                  { letter: 'B', text: 'because' },
                  { letter: 'C', text: 'for example' },
                  { letter: 'D', text: 'so that' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='gc5'
                questionText='5. (Hard) Tourism brings money to Patagonia; ______, it can put pressure on the environment.'
                options={[
                  { letter: 'A', text: 'therefore' },
                  { letter: 'B', text: 'moreover' },
                  { letter: 'C', text: 'nevertheless' },
                  { letter: 'D', text: 'meanwhile' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='gc6'
                questionText='6. (Hard) The city invested heavily in public transport; ______, traffic congestion slowly fell.'
                options={[
                  { letter: 'A', text: 'consequently' },
                  { letter: 'B', text: 'whereas' },
                  { letter: 'C', text: 'although' },
                  { letter: 'D', text: 'in contrast' },
                ]}
                correctAnswer='A'
              />
            </div>
          </SectionCard>

          <SectionCard>
            <Instruction>
              Join the two short sentences into ONE sentence using a suitable connector. Write in English and press{' '}
              <em>Check</em> for AI feedback.
            </Instruction>
            <div className='space-y-6'>
              <QuestionInput
                id='gc7'
                questionText='(Medium) Join with "because": "We went to the park." + "The weather was sunny."'
                correctAnswers={['We went to the park because the weather was sunny.']}
              />
              <QuestionInput
                id='gc8'
                questionText='(Hard) Join into one sentence showing contrast: "Tango began in working-class neighbourhoods." + "It is now performed in theatres around the world."'
                correctAnswers={[
                  'Although tango began in working-class neighbourhoods, it is now performed in theatres around the world.',
                  'Tango began in working-class neighbourhoods, but it is now performed in theatres around the world.',
                  'Tango began in working-class neighbourhoods; however, it is now performed in theatres around the world.',
                ]}
              />
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Connecting words tip:</strong> Master the basics first — <em>and</em> (adds), <em>but</em>
            (difference), <em>because</em> (reason), <em>so</em> (result). Then add range with <em>although</em>,
            <em> however</em>, <em>nevertheless</em>, and <em>consequently</em>. Varied, accurate linkers raise your
            coherence score.
          </TipBox>
        </div>
      )}
    </ExamShell>
  );
}
