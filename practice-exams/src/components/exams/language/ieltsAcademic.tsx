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

const ACCENT = '#6ec99a';

export default function IELTSAcademic({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');

  return (
    <ExamShell
      accent={ACCENT}
      code='ACADEMIC'
      title='IELTS Academic — Practice Exam'
      subtitle='Reading & Writing · Check answers as you go'
      sections={['reading', 'writing', 'grammar', 'connectors'] as const}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      {activeSection === 'reading' && (
        <div className='space-y-6'>
          <SectionCard>
            <PassageTitle>Passage 1 — Geothermal energy</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Geothermal power is one of the world's most reliable sources of renewable energy. Countries located on
                volcanic belts have a particular advantage: one of the oldest large geothermal stations in the world has
                been generating electricity continuously since 1958. Today, geothermal energy supplies a significant
                share of electricity in several volcanic nations and is regarded as a cornerstone of efforts to reach
                fully renewable power supplies.
              </p>
              <p className='mb-3'>
                Geothermal energy is extracted by drilling wells into the earth's crust to access superheated steam and
                hot water reservoirs. This steam drives turbines connected to generators. Unlike solar or wind power,
                geothermal plants operate around the clock regardless of weather conditions, providing what energy
                planners call "baseload" power — the steady minimum level of generation needed to meet constant demand.
              </p>
              <p className='mb-3'>
                However, geothermal development is not without controversy. Active geothermal fields often overlap with
                areas of deep cultural and natural significance, and many governments now require extensive consultation
                with local communities before approving new projects. Critics argue that past extraction caused
                measurable ground subsidence and the loss of natural geysers, underscoring the need for careful
                management and monitoring.
              </p>
              <p>
                Despite these challenges, many governments have signalled support for expanding geothermal capacity.
                Proponents argue that its minimal land footprint, low greenhouse gas emissions, and reliability make it
                an ideal complement to variable renewable sources such as wind and solar. With climate change placing
                mounting pressure on fossil fuel alternatives, the geothermal sector is widely seen as a model for
                volcanic regions around the world.
              </p>
            </Passage>

            <div className='space-y-6'>
              <TrueFalse
                id='r1'
                questionText='1. One of the oldest large geothermal stations has been producing electricity since before 1960.'
                correctAnswer='True'
              />
              <TrueFalse
                id='r2'
                questionText='2. Geothermal plants stop generating electricity during poor weather conditions.'
                correctAnswer='False'
              />
              <TrueFalse
                id='r3'
                questionText='3. Many governments require consultation with local communities before approving new geothermal projects.'
                correctAnswer='True'
              />
              <TrueFalse
                id='r4'
                questionText='4. Geothermal energy is now the cheapest form of electricity in the world.'
                correctAnswer='Not Given'
              />
            </div>

            <div className='mt-10 space-y-6'>
              <MultipleChoice
                id='r5'
                questionText='What is the main advantage of geothermal energy over solar and wind power according to the passage?'
                options={[
                  { letter: 'A', text: 'It produces no greenhouse gas emissions' },
                  { letter: 'B', text: 'It can operate continuously as baseload power' },
                  { letter: 'C', text: 'It requires less investment to build' },
                  { letter: 'D', text: 'It has no environmental impact' },
                ]}
                correctAnswer='B'
              />

              <QuestionInput
                id='r6'
                questionText='What single word does the passage use for the steady minimum level of electricity generation needed to meet constant demand?'
                correctAnswers={['baseload']}
              />
            </div>
          </SectionCard>

          <SectionCard>
            <PassageTitle>Passage 2 — Island birds and invasive predators</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Flightless and ground-nesting birds on remote islands are among the most threatened animals on Earth.
                On many islands, native bird populations have plummeted by roughly 70 percent since human settlement,
                and a large number of species are now listed as either vulnerable or endangered on the International
                Union for Conservation of Nature (IUCN) Red List.
              </p>
              <p className='mb-3'>
                The primary threat to these birds is predation by introduced mammalian predators — such as rats, stoats,
                and feral cats — which were brought to the islands deliberately or accidentally by settlers. These
                animals were absent from island ecosystems for millions of years, meaning native birds had no
                evolutionary defences against them. Flightless, ground-nesting species are particularly vulnerable;
                chick survival rates in areas without predator control can be as low as 5 percent.
              </p>
              <p className='mb-3'>
                To combat this crisis, several governments have launched ambitious programmes to eradicate introduced
                predators from entire islands by the middle of this century. These programmes employ a combination of
                trapping, targeted poison baiting, and cutting-edge genetic biocontrol research. Community groups,
                schools, and businesses have all been enlisted as partners, reflecting a broad societal commitment to
                ecological restoration.
              </p>
              <p>
                Some conservationists remain cautious about timelines. Eradicating predators from large, rugged terrain
                presents enormous logistical difficulties. Critics of poison baiting also argue that it can affect
                non-target native species, though wildlife agencies maintain that the overall benefits far outweigh the
                risks. Fenced sanctuaries have demonstrated that, in predator-free enclosures, native bird populations
                can recover rapidly.
              </p>
            </Passage>

            <div className='mb-6'>
              <Instruction>Match each paragraph to the correct heading below. Write the Roman numeral (i–iv).</Instruction>
              <div
                className='bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] p-4 mb-4 text-sm'
                style={{ color: '#cdd9c0' }}
              >
                <strong>Headings:</strong>
                <br />
                i. A bold national eradication programme
                <br />
                ii. The scale of the birds' decline
                <br />
                iii. Debate over methods and cautious optimism
                <br />
                iv. Why introduced species are so deadly
              </div>
              <div className='space-y-4'>
                <QuestionInput
                  id='r7'
                  questionText='Paragraph A (first paragraph):'
                  correctAnswers={['ii']}
                />
                <QuestionInput
                  id='r8'
                  questionText='Paragraph B (second paragraph):'
                  correctAnswers={['iv']}
                />
                <QuestionInput
                  id='r9'
                  questionText='Paragraph C (third paragraph):'
                  correctAnswers={['i']}
                />
              </div>
            </div>

            <div className='mt-10 space-y-6'>
              <MultipleChoice
                id='r10'
                questionText='What does the passage suggest about fenced predator-free sanctuaries?'
                options={[
                  { letter: 'A', text: 'They prove eradication across whole islands is impossible' },
                  { letter: 'B', text: 'They show native birds can recover when predators are removed' },
                  { letter: 'C', text: 'They rely entirely on poison baiting' },
                  { letter: 'D', text: 'They are funded only by local community groups' },
                ]}
                correctAnswer='B'
              />

              <QuestionInput
                id='r11'
                questionText='According to the passage, eradication programmes aim to remove introduced predators from entire islands by the middle of this _______.'
                correctAnswers={['century']}
              />
            </div>
          </SectionCard>

          <SectionCard>
            <PassageTitle>Passage 3 — Reviving an endangered language</PassageTitle>
            <Passage>
              <p className='mb-3'>
                Many indigenous languages around the world have undergone remarkable transformations over the past fifty
                years. In numerous communities, a language that was on the brink of extinction in the 1970s — spoken
                fluently by fewer than 20 percent of its people — has since experienced a resurgence. Thanks to
                deliberate policy interventions and grassroots activism, several such languages now attract international
                attention as models for endangered language revival.
              </p>
              <p className='mb-3'>
                A common turning point comes when a threatened language is declared an official language and given legal
                protection. In many cases this milestone was preceded by the establishment of "language nests" —
                preschools where young children are immersed in the language from an early age. Initiated by community
                elders concerned about language loss, these nests proved extraordinarily successful, and within a decade
                hundreds were operating and serving thousands of children. They became the foundation for a complete
                education pathway, eventually expanding into primary and secondary schools that teach in the language.
              </p>
              <p className='mb-3'>
                Government support has been crucial but uneven. Public funding for radio stations and television
                programming in the language has helped normalise it in public life. However, critics argue that
                resources remain insufficient. Reviews have found that while public awareness has grown significantly —
                with many people now able to use basic greetings and phrases — the number of truly fluent speakers has
                plateaued at around the same proportion as in the 1970s.
              </p>
              <p>
                Linguists attribute the plateau to what they call "passive competence" — widespread recognition and
                limited vocabulary, but insufficient deep fluency for transmission to the next generation. Addressing
                this gap will require sustained investment in adult education and creating more domains where the
                language is the primary means of communication, not merely a symbolic gesture. Nonetheless, these
                approaches have inspired similar initiatives among indigenous communities worldwide, demonstrating that
                language revitalisation, though challenging, is achievable with political will and community leadership.
              </p>
            </Passage>

            <div className='mb-6'>
              <Instruction>Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.</Instruction>
              <div
                className='bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] p-4 mb-4 text-sm leading-relaxed'
                style={{ color: '#cdd9c0' }}
              >
                Many indigenous languages were in danger of disappearing in the 1970s. A common first initiative to save
                them is the creation of <strong>(12) _______</strong>, which are preschools where children are immersed
                in the language. A key legal milestone comes when the language is declared an{' '}
                <strong>(13) _______</strong> and given legal protection. Despite increased public awareness, the
                percentage of fluent speakers has often remained low, which linguists explain is due to{' '}
                <strong>(14) _______</strong> rather than deep fluency.
              </div>
              <div className='space-y-4'>
                <QuestionInput
                  id='r12'
                  questionText='(12)'
                  correctAnswers={['language nests', 'language nest']}
                />
                <QuestionInput
                  id='r13'
                  questionText='(13)'
                  correctAnswers={['official language']}
                />
                <QuestionInput
                  id='r14'
                  questionText='(14)'
                  correctAnswers={['passive competence']}
                />
              </div>
            </div>

            <MultipleChoice
              id='r15'
              questionText='According to the passage, what is needed to increase the number of fluent speakers beyond current levels?'
              options={[
                { letter: 'A', text: 'More television programming in the language' },
                { letter: 'B', text: 'Creating environments where the language is the main language used' },
                { letter: 'C', text: 'Teaching basic greetings to the whole population' },
                { letter: 'D', text: 'Establishing more language-nest preschools' },
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
                The table below shows the number of international visitors to one country from five source countries in
                2019 and 2023. Summarise the information by selecting and reporting the main features, and make
                comparisons where relevant.
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
                        className={`border border-[rgba(150,180,200,0.3)] px-3 py-2 ${i === 0 ? 'text-left' : 'text-right'}`}
                        style={{ background: 'rgba(8,16,24,0.6)', color: '#8ba3b8' }}
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
                      <td className='border border-[rgba(150,180,200,0.3)] px-3 py-2' style={{ color: '#eaf2f8' }}>
                        {row.country}
                      </td>
                      <td
                        className='border border-[rgba(150,180,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#eaf2f8' }}
                      >
                        {row.y2019}
                      </td>
                      <td
                        className='border border-[rgba(150,180,200,0.3)] px-3 py-2 text-right'
                        style={{ color: '#eaf2f8' }}
                      >
                        {row.y2023}
                      </td>
                      <td
                        className='border border-[rgba(150,180,200,0.3)] px-3 py-2 text-right'
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
                  Some people believe that countries should prioritise economic development over environmental
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
                The graph below shows the percentage of households in one country with internet access from 2000 to
                2023. Summarise the information by selecting and reporting the main features, and make comparisons where
                relevant.
              </>
            }
          >
            <div className='bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] p-4 mb-6'>
              <div className='text-center mb-3 text-sm font-semibold' style={{ color: '#a8cae0' }}>
                Percentage of Households with Internet Access
              </div>
              <div className='flex items-end justify-around h-48 border-l-2 border-b-2 border-[rgba(150,180,200,0.3)] pl-2 pb-2'>
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
                    <div className='text-xs' style={{ color: '#8ba3b8' }}>
                      {bar.year}
                    </div>
                    <div className='text-xs font-semibold' style={{ color: '#eaf2f8' }}>
                      {bar.pct}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </WritingTask>

          <WritingTask
            id='w4'
            title='Task 4 — Academic essay'
            instructions='Spend about 40 minutes on this task. Write at least 250 words. Write your answer in English — that is the skill being assessed.'
            minWords={250}
            rows={13}
            prompt={
              <>
                <strong>
                  In Argentina, football (soccer) plays a central role in social and cultural life. Some people argue that
                  countries place too much importance on sport, while others believe it brings important social benefits.
                </strong>
                <br />
                <br />
                Discuss both views and give your own opinion. Support your answer with reasons and relevant examples.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Task 4 tip:</strong> The topic is Argentine culture, but write entirely in English. Present both
            views fairly before giving your own opinion, and develop each point with a specific example rather than
            listing several briefly.
          </TipBox>

          <WritingTask
            id='w5'
            title='Task 5 — Problem & solution essay'
            instructions='Spend about 40 minutes on this task. Write at least 250 words.'
            minWords={250}
            rows={13}
            prompt={
              <>
                <strong>
                  Cities such as Buenos Aires face growing traffic congestion and air pollution as more people move to
                  urban areas.
                </strong>
                <br />
                <br />
                What problems does rapid urban growth cause, and what measures could governments and citizens take to
                address them? Give reasons and examples to support your answer.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Task 5 tip:</strong> For problem–solution essays, devote one paragraph to the problems and one to the
            solutions, and make sure each solution clearly answers a problem you raised. The AI feedback explains issues
            in Spanish and shows the improved English wording.
          </TipBox>
        </div>
      )}

      {activeSection === 'grammar' && (
        <div className='space-y-6'>
          <SectionCard>
            <Instruction>
              Choose the grammatically correct option. The topics are Argentine, but the focus is academic English
              grammar — tenses, articles, agreement, and word form.
            </Instruction>
            <div className='space-y-6'>
              <MultipleChoice
                id='ag1'
                questionText='1. The number of tourists visiting Patagonia ______ increased steadily over the past decade.'
                options={[
                  { letter: 'A', text: 'have' },
                  { letter: 'B', text: 'has' },
                  { letter: 'C', text: 'are' },
                  { letter: 'D', text: 'is' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='ag2'
                questionText='2. Argentina is one of the world’s largest producers ______ beef.'
                options={[
                  { letter: 'A', text: 'of' },
                  { letter: 'B', text: 'for' },
                  { letter: 'C', text: 'in' },
                  { letter: 'D', text: 'about' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='ag3'
                questionText='3. The research suggests that mate ______ several health benefits when consumed in moderation.'
                options={[
                  { letter: 'A', text: 'have' },
                  { letter: 'B', text: 'having' },
                  { letter: 'C', text: 'has' },
                  { letter: 'D', text: 'is have' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='ag4'
                questionText='4. Tango ______ in Buenos Aires in the late nineteenth century.'
                options={[
                  { letter: 'A', text: 'originates' },
                  { letter: 'B', text: 'has originated' },
                  { letter: 'C', text: 'originated' },
                  { letter: 'D', text: 'was originating' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='ag5'
                questionText='5. The government introduced new policies ______ protect the natural areas of Patagonia.'
                options={[
                  { letter: 'A', text: 'for' },
                  { letter: 'B', text: 'to' },
                  { letter: 'C', text: 'so' },
                  { letter: 'D', text: 'that' },
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
                id='ag6'
                questionText='Rewrite in the passive voice: "Argentine families prepare the asado slowly over hot coals."'
                correctAnswers={[
                  'The asado is prepared slowly over hot coals by Argentine families.',
                  'The asado is prepared slowly over hot coals.',
                ]}
              />
              <QuestionInput
                id='ag7'
                questionText='Complete with the correct article (a / an / the / —): "______ Iguazú Falls are among the largest waterfall systems in the world."'
                correctAnswers={['The', 'the']}
              />
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Grammar tip:</strong> In academic writing, watch subject–verb agreement with phrases like "the number
            of …" (singular) and choose tenses from time markers in the sentence. Read the full sentence before
            answering.
          </TipBox>
        </div>
      )}

      {activeSection === 'connectors' && (
        <div className='space-y-6'>
          <SectionCard>
            <Instruction>
              Choose the best connecting word. The questions get harder as you go — from basic linkers to more advanced
              academic ones.
            </Instruction>
            <div className='space-y-6'>
              <MultipleChoice
                id='ac1'
                questionText='1. (Basic) Mate is popular in Argentina ______ it is now becoming popular in other countries too.'
                options={[
                  { letter: 'A', text: 'and' },
                  { letter: 'B', text: 'but' },
                  { letter: 'C', text: 'or' },
                  { letter: 'D', text: 'so' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='ac2'
                questionText='2. (Basic) The city built more buses and trains, ______ traffic slowly got better.'
                options={[
                  { letter: 'A', text: 'so' },
                  { letter: 'B', text: 'but' },
                  { letter: 'C', text: 'or' },
                  { letter: 'D', text: 'because' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='ac3'
                questionText='3. (Medium) ______ football is enormously popular, it influences fashion, music, and daily conversation in Argentina.'
                options={[
                  { letter: 'A', text: 'Although' },
                  { letter: 'B', text: 'Because' },
                  { letter: 'C', text: 'Despite' },
                  { letter: 'D', text: 'Unless' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='ac4'
                questionText='4. (Medium) Tourism creates jobs in Patagonia; ______, it can place pressure on fragile ecosystems.'
                options={[
                  { letter: 'A', text: 'therefore' },
                  { letter: 'B', text: 'however' },
                  { letter: 'C', text: 'in addition' },
                  { letter: 'D', text: 'for example' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='ac5'
                questionText='5. (Hard) Mate is deeply rooted in Argentine culture; ______, its popularity is now growing rapidly abroad.'
                options={[
                  { letter: 'A', text: 'moreover' },
                  { letter: 'B', text: 'furthermore' },
                  { letter: 'C', text: 'nevertheless' },
                  { letter: 'D', text: 'because' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='ac6'
                questionText='6. (Hard) The city invested heavily in public transport; ______, traffic congestion began to fall.'
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
              Combine the two ideas into ONE clear sentence using a suitable connector. Write in English and press{' '}
              <em>Check</em> for AI feedback.
            </Instruction>
            <div className='space-y-6'>
              <QuestionInput
                id='ac7'
                questionText='(Medium) Join with "so": "Buenos Aires has many tourists." + "The city must manage traffic carefully."'
                correctAnswers={[
                  'Buenos Aires has many tourists, so the city must manage traffic carefully.',
                  'Buenos Aires has many tourists so the city must manage traffic carefully.',
                ]}
              />
              <QuestionInput
                id='ac8'
                questionText='(Hard) Join into one academic sentence showing contrast: "Mate is a centuries-old tradition." + "It remains central to social life in modern Argentina."'
                correctAnswers={[
                  'Although mate is a centuries-old tradition, it remains central to social life in modern Argentina.',
                  'Mate is a centuries-old tradition, yet it remains central to social life in modern Argentina.',
                  'Mate is a centuries-old tradition; nevertheless, it remains central to social life in modern Argentina.',
                ]}
              />
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Connecting words tip:</strong> Master the basics first — <em>and</em> (adds), <em>but</em>
            (difference), <em>because</em> (reason), <em>so</em> (result). Then add academic range with{' '}
            <em>although</em>, <em>however</em>, <em>nevertheless</em>, and <em>consequently</em>. Overusing one
            connector lowers your cohesion score.
          </TipBox>
        </div>
      )}
    </ExamShell>
  );
}
