import { useState } from 'react';
import {
  Divider,
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

type Section = 'reading' | 'writing';

const ACCENT = '#e0a8c9';

export default function IELTSGeneral({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');

  return (
    <ExamShell
      accent={ACCENT}
      code='NZ · GT'
      title='IELTS General Training — NZ Practice Exam'
      subtitle='New Zealand context · Reading & Writing · Check answers as you go'
      sections={['reading', 'writing'] as const}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      {activeSection === 'reading' && (
        <div className='space-y-6'>
          {/* ── Section 1: social survival ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Section 1 · Social survival
            </div>
            <PassageTitle>Text A — Auckland Council recycling notice</PassageTitle>
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

            <Divider>Questions 1–5 · True / False / Not Given</Divider>
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

            <div className='my-6'>
              <Divider>Questions 6–7 · Short answer (max 3 words)</Divider>
            </div>
            <div className='space-y-4'>
              <QuestionInput
                id='gt6'
                questionNum='Question 6'
                questionText='What should you use to line your kitchen caddy instead of a plastic bag?'
                correctAnswers={['newspaper']}
              />
              <QuestionInput
                id='gt7'
                questionNum='Question 7'
                questionText='By what time must bins be at the kerb on collection day?'
                correctAnswers={['7:00 am', '7am', '7 am', '7:00am']}
              />
            </div>
          </SectionCard>

          {/* ── Section 2: workplace ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Section 2 · Workplace
            </div>
            <PassageTitle>Text B — New employee leave entitlements</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Welcome to the team. This summary explains your leave entitlements under New Zealand employment law and
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
                <strong>Public holidays:</strong> New Zealand observes 11 public holidays, plus a regional anniversary
                day. If you work on a public holiday, you are paid time-and-a-half and receive an alternative day off
                ("a day in lieu"). Te Rā Aro ki a Matariki (Matariki) is a public holiday observed in mid-winter.
              </p>
            </Passage>

            <Divider>Questions 8–11 · Multiple choice</Divider>
            <div className='space-y-6'>
              <MultipleChoice
                id='gt8'
                questionNum='Question 8'
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
                questionNum='Question 9'
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
                questionNum='Question 10'
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
                questionNum='Question 11'
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

            <div className='my-6'>
              <Divider>Questions 12–13 · Sentence completion (max 2 words)</Divider>
            </div>
            <div className='space-y-4'>
              <QuestionInput
                id='gt12'
                questionNum='Question 12'
                questionText='If you are sick for three or more consecutive days, the company may require a _______.'
                correctAnswers={['medical certificate', 'certificate']}
              />
              <QuestionInput
                id='gt13'
                questionNum='Question 13'
                questionText='The mid-winter public holiday named in the text is _______.'
                correctAnswers={['Matariki', 'Te Rā Aro ki a Matariki']}
              />
            </div>
          </SectionCard>

          {/* ── Section 3: general interest ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Section 3 · General interest
            </div>
            <PassageTitle>Text C — The story of the New Zealand "number 8 wire"</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Few phrases capture the New Zealand character as neatly as "number 8 wire". Originally a reference to a
                specific gauge of fencing wire imported in enormous quantities during the 19th-century farming boom, the
                term has come to describe a national talent for improvisation — the ability to fix, build, or invent
                almost anything with limited materials and a bit of ingenuity.
              </p>
              <p className='mb-3'>
                The literal wire arrived with the expansion of sheep farming. Settlers on isolated stations could not
                easily obtain specialised tools or replacement parts, and waiting months for supplies from Britain was
                impractical. Out of necessity, farmers learned to repurpose whatever was at hand. Number 8 wire, being
                strong, cheap, and abundant, became the universal solution: it was twisted into gate latches, fashioned
                into tools, and used to repair machinery far from any workshop.
              </p>
              <p className='mb-3'>
                Over time, this practical resourcefulness hardened into a point of cultural pride. New Zealanders began
                to speak of a "number 8 wire mentality" — a can-do attitude that valued clever, low-cost solutions over
                expensive, off-the-shelf ones. The phrase has been invoked to explain everything from the country's
                strong record of agricultural innovation to the success of individual inventors such as Bill Hamilton,
                who developed the modern jet boat in the 1950s to navigate the shallow, braided rivers of the South
                Island.
              </p>
              <p className='mb-3'>
                Not everyone celebrates the idea, however. Some commentators argue that the number 8 wire mentality has a
                downside: a tendency to favour quick fixes over proper investment, and to undervalue specialist
                expertise. A patched-up solution, they point out, is not always the best long-term answer, and an economy
                cannot innovate at scale on improvisation alone. Modern New Zealand industries, they argue, increasingly
                depend on research, formal training, and international collaboration rather than backyard tinkering.
              </p>
              <p>
                Still, the phrase endures. Whether praised or questioned, "number 8 wire" remains a shorthand for a
                particular kind of practical creativity that many New Zealanders continue to regard as central to their
                identity.
              </p>
            </Passage>

            <Divider>Questions 14–17 · Yes / No / Not Given</Divider>
            <Instruction>Do the following statements agree with the views of the writer?</Instruction>
            <div className='space-y-6'>
              <TrueFalse
                id='gt14'
                variant='ynng'
                questionText='14. The phrase "number 8 wire" originally referred to a type of fencing wire.'
                correctAnswer='Yes'
              />
              <TrueFalse
                id='gt15'
                variant='ynng'
                questionText='15. Settlers could easily order replacement parts from Britain when machinery broke down.'
                correctAnswer='No'
              />
              <TrueFalse
                id='gt16'
                variant='ynng'
                questionText='16. The writer believes the number 8 wire mentality has only positive effects.'
                correctAnswer='No'
              />
              <TrueFalse
                id='gt17'
                variant='ynng'
                questionText='17. Bill Hamilton earned more money from the jet boat than any other New Zealand inventor.'
                correctAnswer='Not Given'
              />
            </div>

            <div className='my-6'>
              <Divider>Question 18 · Multiple choice</Divider>
            </div>
            <MultipleChoice
              id='gt18'
              questionNum='Question 18'
              questionText='What criticism of the number 8 wire mentality does the passage mention?'
              options={[
                { letter: 'A', text: 'It is too expensive for ordinary farmers' },
                { letter: 'B', text: 'It can favour quick fixes over proper investment and expertise' },
                { letter: 'C', text: 'It is no longer understood by younger New Zealanders' },
                { letter: 'D', text: 'It was invented overseas rather than in New Zealand' },
              ]}
              correctAnswer='B'
            />

            <div className='my-6'>
              <Divider>Questions 19–20 · Summary completion (max 2 words)</Divider>
            </div>
            <div className='mb-6'>
              <Instruction>Complete the summary. Choose NO MORE THAN TWO WORDS from the passage for each answer.</Instruction>
              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-4 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                The phrase comes from a gauge of wire imported during a 19th-century farming boom. Because the wire was
                strong, cheap and <strong>(19) _______</strong>, farmers used it to repair almost anything. Today the
                phrase describes a <strong>(20) _______</strong> attitude that prefers clever low-cost solutions.
              </div>
              <div className='space-y-4'>
                <QuestionInput id='gt19' questionNum='Question 19' questionText='(19)' correctAnswers={['abundant']} />
                <QuestionInput
                  id='gt20'
                  questionNum='Question 20'
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
                You recently rented a holiday house ("bach") in the Coromandel through a property manager, but several
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
                  In many countries, including New Zealand, more people are choosing to live in cities rather than in
                  rural areas.
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
        </div>
      )}
    </ExamShell>
  );
}
