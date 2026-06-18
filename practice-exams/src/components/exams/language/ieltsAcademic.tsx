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

const ACCENT = '#6ec99a';

export default function IELTSAcademic({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');

  return (
    <ExamShell
      accent={ACCENT}
      code='NZ'
      title='IELTS Academic — NZ Practice Exam'
      subtitle='New Zealand context · Reading & Writing · Check answers as you go'
      sections={['reading', 'writing'] as const}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      {activeSection === 'reading' && (
        <div className='space-y-6'>
          <SectionCard>
            <PassageTitle>Passage 1 — New Zealand's geothermal energy</PassageTitle>
            <Passage>
              <p className='mb-3'>
                New Zealand sits on the Pacific Ring of Fire, giving it access to one of the world's most reliable
                sources of renewable energy: geothermal power. The Waikato region, in particular, hosts the Wairakei
                Geothermal Power Station — one of the oldest in the world, having generated electricity since 1958.
                Today, geothermal energy accounts for roughly 17 percent of New Zealand's electricity generation, making
                it a cornerstone of the country's push toward 100 percent renewable electricity by 2030.
              </p>
              <p className='mb-3'>
                Geothermal energy is extracted by drilling wells into the earth's crust to access superheated steam and
                hot water reservoirs. This steam drives turbines connected to generators. Unlike solar or wind power,
                geothermal plants operate around the clock regardless of weather conditions, providing what energy
                planners call "baseload" power — the steady minimum level of generation needed to meet constant demand.
              </p>
              <p className='mb-3'>
                However, geothermal development is not without controversy in New Zealand. Several active geothermal
                fields overlap with areas of deep cultural significance to Māori iwi (tribes). Rotorua's famous
                geothermal landscape, for example, is considered taonga — a treasure — by local Māori, and any
                development proposals require extensive consultation under the Resource Management Act 1991 and Treaty of
                Waitangi principles. Critics argue that past geothermal extraction near Rotorua caused measurable
                subsidence and the loss of natural geysers, underscoring the need for careful management.
              </p>
              <p>
                Despite these challenges, the New Zealand government has signalled support for expanding geothermal
                capacity. Proponents argue that its minimal land footprint, low greenhouse gas emissions, and
                reliability make it an ideal complement to variable renewable sources such as wind and solar. With
                climate change placing mounting pressure on fossil fuel alternatives, New Zealand's geothermal sector is
                widely seen as a model for other volcanic nations including Iceland and Kenya.
              </p>
            </Passage>

            <Divider>Questions 1–4 · True / False / Not Given</Divider>
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

            <div className='my-6'>
              <Divider>Question 5 · Multiple choice</Divider>
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

            <div className='my-6'>
              <Divider>Question 6 · Short answer (max 3 words)</Divider>
            </div>
            <QuestionInput
              id='r6'
              questionNum='Question 6'
              questionText="What word does the passage use to describe Rotorua's geothermal landscape in terms of Māori cultural value?"
              correctAnswers={['taonga']}
            />
          </SectionCard>

          <SectionCard>
            <PassageTitle>Passage 2 — The kiwi bird and conservation</PassageTitle>
            <Passage>
              <p className='mb-3'>
                The kiwi, New Zealand's most iconic bird, is in trouble. Once widespread across both the North and South
                Islands, kiwi populations have plummeted by roughly 70 percent since European colonisation began in the
                19th century. Today, fewer than 70,000 kiwi remain in the wild, with all five species listed as either
                vulnerable or endangered on the International Union for Conservation of Nature (IUCN) Red List.
              </p>
              <p className='mb-3'>
                The primary threat to kiwi survival is predation by introduced mammalian predators — stoats, ferrets,
                rats, and possums — which were brought to New Zealand deliberately or accidentally by European settlers.
                These animals were absent from New Zealand's ecosystems for millions of years, meaning native birds had
                no evolutionary defences against them. Kiwi, being flightless and ground-nesting, are particularly
                vulnerable; chick survival rates in areas without predator control can be as low as 5 percent.
              </p>
              <p className='mb-3'>
                To combat this crisis, the New Zealand government launched Predator Free 2050 (PF2050) — an ambitious
                goal to eradicate rats, stoats, and possums from the entire country by mid-century. The programme employs
                a combination of trapping, 1080 poison aerial drops, and cutting-edge genetic biocontrol research.
                Community groups, Māori organisations, schools, and businesses have all been enlisted as partners,
                reflecting a broad societal commitment to ecological restoration.
              </p>
              <p>
                Some conservationists remain cautious about timelines. Eradicating predators from large, rugged terrain —
                including Fiordland's steep valleys — presents enormous logistical difficulties. Critics of 1080 also
                argue that the poison affects non-target native species such as kea, though the Department of
                Conservation maintains that the overall benefits of 1080 far outweigh its risks. Kiwi sanctuaries such as
                Zealandia in Wellington and Maungatautari in the Waikato have demonstrated that, in predator-free
                enclosures, kiwi populations can recover rapidly.
              </p>
            </Passage>

            <Divider>Questions 7–9 · Matching headings</Divider>
            <div className='mb-6'>
              <Instruction>Match each paragraph to the correct heading below. Write the Roman numeral (i–iv).</Instruction>
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

            <Divider>Question 10 · Multiple choice</Divider>
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

            <div className='my-6'>
              <Divider>Question 11 · Sentence completion (max 2 words)</Divider>
            </div>
            <QuestionInput
              id='r11'
              questionNum='Question 11'
              questionText='The programme Predator Free 2050 aims to eliminate three specific predators from New Zealand by the year _______.'
              correctAnswers={['2050', 'mid-century']}
            />
          </SectionCard>

          <SectionCard>
            <PassageTitle>Passage 3 — The Māori language revitalisation</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Te reo Māori, the indigenous language of New Zealand, has undergone a remarkable transformation over the
                past fifty years. In the 1970s, the language was on the brink of extinction, with fewer than 20 percent
                of Māori people able to speak it fluently. Today, thanks to deliberate policy interventions and
                grassroots activism, te reo Māori is experiencing a resurgence that has captured international attention
                as a model for endangered language revival.
              </p>
              <p className='mb-3'>
                The turning point came in 1987 when te reo Māori was declared an official language of New Zealand under
                the Māori Language Act. This legislative milestone was preceded by the establishment of kōhanga reo
                (language nests) in 1982 — Māori-language preschools where children were immersed in te reo from an early
                age. The kōhanga reo movement, initiated by Māori elders concerned about language loss, proved
                extraordinarily successful. By 1990, over 800 kōhanga reo were operating nationwide, serving more than
                14,000 children. These early-childhood centres became the foundation for a complete education pathway,
                eventually expanding into kura kaupapa Māori (Māori-language primary schools) and wharekura (secondary
                schools).
              </p>
              <p className='mb-3'>
                Government support has been crucial but uneven. Te Māngai Pāho, a Crown entity established to promote
                Māori language broadcasting, has funded radio stations and television programming since 1993. The
                creation of the dedicated Māori Television channel in 2004 further normalised te reo in public life.
                However, critics argue that resources remain insufficient. A 2019 review found that while public
                awareness of te reo has grown significantly — with many New Zealanders now able to use basic greetings
                and phrases — the number of fluent speakers has plateaued at around 20 percent of the Māori population,
                roughly the same proportion as in the 1970s.
              </p>
              <p>
                Linguists attribute the plateau to what they call "passive competence" — widespread recognition and
                limited vocabulary, but insufficient deep fluency for transmission to the next generation. Addressing
                this gap will require sustained investment in adult education and creating more domains where te reo is
                the primary language of communication, not merely a symbolic gesture. Nonetheless, New Zealand's approach
                has inspired similar initiatives in Hawaii, Scotland, and among Indigenous communities in Canada,
                demonstrating that language revitalisation, though challenging, is achievable with political will and
                community leadership.
              </p>
            </Passage>

            <Divider>Questions 12–14 · Summary completion (choose from passage)</Divider>
            <div className='mb-6'>
              <Instruction>Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.</Instruction>
              <div
                className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-4 text-sm leading-relaxed'
                style={{ color: '#d4b894' }}
              >
                The Māori language was in danger of disappearing in the 1970s. The first major initiative to save it was
                the creation of <strong>(12) _______</strong>, which were Māori-language preschools. These were
                established in 1982 after concerns from Māori elders. By 1990, more than 14,000 children attended these
                centres. The Māori Language Act of 1987 made te reo Māori an <strong>(13) _______</strong> of New
                Zealand. Despite increased public awareness, the percentage of fluent speakers has remained at about 20
                percent, which linguists explain is due to <strong>(14) _______</strong> rather than deep fluency.
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

            <Divider>Question 15 · Multiple choice</Divider>
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
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Reading tip:</strong> For True/False/Not Given questions, "Not Given" means the passage neither
            confirms nor denies the statement — not that it's unknown in real life. For summary completion, read the
            instructions carefully about word limits and whether words must come from the passage.
          </TipBox>
        </div>
      )}

      {activeSection === 'writing' && (
        <div className='space-y-6'>
          <WritingTask
            id='w1'
            title='Task 1 — Data description'
            instructions='Spend about 20 minutes on this task. Write at least 150 words.'
            minWords={150}
            prompt={
              <>
                The table below shows the number of international visitors to New Zealand from five countries in 2019 and
                2023. Summarise the information by selecting and reporting the main features, and make comparisons where
                relevant.
              </>
            }
          >
            <div className='overflow-x-auto mb-6'>
              <table className='w-full text-sm border-collapse'>
                <thead>
                  <tr>
                    {['Country', '2019 (thousands)', '2023 (thousands)', 'Change'].map((h, i) => (
                      <th
                        key={h}
                        className={`border border-[rgba(180,140,200,0.3)] px-3 py-2 ${i === 0 ? 'text-left' : 'text-right'}`}
                        style={{ background: 'rgba(10,5,20,0.6)', color: '#9a88b8' }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { country: 'Australia', y2019: '1,520', y2023: '1,380', change: '−9.2%', up: false },
                    { country: 'USA', y2019: '390', y2023: '420', change: '+7.7%', up: true },
                    { country: 'China', y2019: '410', y2023: '210', change: '−48.8%', up: false },
                    { country: 'UK', y2019: '270', y2023: '290', change: '+7.4%', up: true },
                    { country: 'India', y2019: '90', y2023: '170', change: '+88.9%', up: true },
                  ].map((row) => (
                    <tr key={row.country}>
                      <td className='border border-[rgba(180,140,200,0.3)] px-3 py-2' style={{ color: '#ede0f5' }}>
                        {row.country}
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        {row.y2019}
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#ede0f5' }}
                      >
                        {row.y2023}
                      </td>
                      <td
                        className='border border-[rgba(180,140,200,0.3)] px-3 py-2 text-right'
                        style={{ color: row.up ? '#b4d99a' : '#ff7675' }}
                      >
                        {row.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </WritingTask>

          <TipBox accent={ACCENT}>
            <strong>Task 1 tip:</strong> Open with an overview sentence identifying the most striking trends. Do not give
            personal opinions or explain causes — just describe what the data shows. Use language like "overall",
            "notably", "by contrast", and "the most striking change".
          </TipBox>

          <WritingTask
            id='w2'
            title='Task 2 — Academic essay'
            instructions='Spend about 40 minutes on this task. Write at least 250 words.'
            minWords={250}
            rows={13}
            prompt={
              <>
                <strong>
                  Some people believe that New Zealand should prioritise economic development over environmental
                  conservation. Others argue that protecting the natural environment must come first.
                </strong>
                <br />
                <br />
                Discuss both views and give your own opinion.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Task 2 tip:</strong> Aim for 4–5 paragraphs — Introduction → View 1 → View 2 → Your opinion →
            Conclusion. Each body paragraph needs a clear topic sentence, development, and a specific example. Avoid
            listing points; develop each one fully.
          </TipBox>

          <WritingTask
            id='w3'
            title='Extra practice — Graph description'
            instructions='Spend about 20 minutes on this task. Write at least 150 words.'
            minWords={150}
            prompt={
              <>
                The graph below shows the percentage of households in New Zealand with internet access from 2000 to
                2023. Summarise the information by selecting and reporting the main features, and make comparisons where
                relevant.
              </>
            }
          >
            <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 mb-6'>
              <div className='text-center mb-3 text-sm font-semibold' style={{ color: '#c9a8e0' }}>
                Percentage of NZ Households with Internet Access
              </div>
              <div className='flex items-end justify-around h-48 border-l-2 border-b-2 border-[rgba(180,140,200,0.3)] pl-2 pb-2'>
                {[
                  { year: '2000', pct: 37 },
                  { year: '2005', pct: 57 },
                  { year: '2010', pct: 75 },
                  { year: '2015', pct: 85 },
                  { year: '2020', pct: 93 },
                  { year: '2023', pct: 95 },
                ].map((bar) => (
                  <div key={bar.year} className='flex flex-col items-center gap-1'>
                    <div className='w-12 bg-[#7bc8ea]' style={{ height: `${bar.pct}%` }}></div>
                    <div className='text-xs' style={{ color: '#9a88b8' }}>
                      {bar.year}
                    </div>
                    <div className='text-xs font-semibold' style={{ color: '#ede0f5' }}>
                      {bar.pct}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WritingTask>
        </div>
      )}
    </ExamShell>
  );
}
