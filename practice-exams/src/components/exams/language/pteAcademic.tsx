import { useState } from 'react';
import {
  Dropdown,
  ExamShell,
  Instruction,
  MultipleChoice,
  MultiSelect,
  Passage,
  PassageTitle,
  QuestionInput,
  Reorder,
  SectionCard,
  TipBox,
  WritingTask,
} from './examKit';

type Section = 'reading' | 'writing' | 'grammar' | 'connectors';

const ACCENT = '#7bc8ea';

export default function PTEAcademic({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');

  return (
    <ExamShell
      accent={ACCENT}
      code='PTE'
      title='PTE Academic — Practice Exam'
      subtitle='Reading & Writing · Check answers as you go'
      sections={['reading', 'writing', 'grammar', 'connectors'] as const}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      {activeSection === 'reading' && (
        <div className='space-y-6'>
          {/* ── Multiple choice, single answer ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Reading · Multiple choice, choose single answer
            </div>
            <Instruction>Read the text and answer the question by selecting the correct response.</Instruction>
            <Passage>
              <p>
                In some countries, a national conservation agency manages a large share of public land, including
                dozens of national parks. Unlike many places where national parks charge entry fees, access to these
                parks is generally free, reflecting a long-standing belief that the outdoors should be available to
                everyone. Revenue is instead raised through hut and campsite fees, concessions to commercial operators
                such as guides and transport companies, and central government funding. Critics note that this model
                leaves conservation budgets vulnerable to political shifts, while supporters argue free access protects
                the parks' role as a shared public good.
              </p>
            </Passage>
            <MultipleChoice
              id='pr1'
              questionText='According to the text, how are these national parks mainly funded?'
              options={[
                { letter: 'A', text: 'Through entry fees charged to all visitors' },
                { letter: 'B', text: 'Through hut and campsite fees, concessions, and government funding' },
                { letter: 'C', text: 'Entirely through private donations' },
                { letter: 'D', text: 'Through a national tourism tax on flights' },
              ]}
              correctAnswer='B'
            />
          </SectionCard>

          {/* ── Multiple choice, multiple answers ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Reading · Multiple choice, choose multiple answers
            </div>
            <Instruction>
              Read the text and answer the question. More than one response is correct — select ALL that apply.
            </Instruction>
            <Passage>
              <p>
                One coastal capital city is frequently ranked among the world's most liveable cities, but it faces real
                challenges. Built on a fault line, the city is at significant risk from earthquakes, and many older
                buildings have required expensive strengthening. Its compact, hilly geography limits urban sprawl — an
                environmental advantage — but also constrains housing supply and pushes up prices. The city is famous
                for its strong winds, which, while sometimes inconvenient, make it a leading site for wind-power
                generation. A vibrant arts and café culture, supported by the presence of national institutions and the
                film industry, contributes to its high quality of life.
              </p>
            </Passage>
            <MultiSelect
              id='pr2'
              questionText='Which of the following challenges or features of the city are mentioned in the text?'
              options={[
                { letter: 'A', text: 'Earthquake risk from a fault line' },
                { letter: 'B', text: 'Limited housing supply due to its geography' },
                { letter: 'C', text: 'A complete lack of public transport' },
                { letter: 'D', text: 'Strong winds suited to wind-power generation' },
                { letter: 'E', text: 'The highest population of any city in the country' },
              ]}
              correctAnswers={['A', 'B', 'D']}
            />
          </SectionCard>

          {/* ── Re-order paragraphs ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Reading · Re-order paragraphs
            </div>
            <Instruction>
              The paragraphs below are in the wrong order. Assign each a position (1–4) to restore the correct sequence,
              then check.
            </Instruction>
            <Reorder
              items={[
                {
                  key: 'A',
                  correctPos: 2,
                  text: 'The first organised attempt began in 1901, when the government set aside a reserve. However, with little funding and no clear management plan, early efforts achieved very little.',
                },
                {
                  key: 'B',
                  correctPos: 1,
                  text: 'The history of national parks in many countries stretches back more than a century and reflects changing ideas about the relationship between people and the land.',
                },
                {
                  key: 'C',
                  correctPos: 4,
                  text: 'Today, that network protects some of the most spectacular landscapes in the country and attracts millions of visitors each year, both domestic and international.',
                },
                {
                  key: 'D',
                  correctPos: 3,
                  text: 'It was only after the Second World War, as car ownership and leisure time expanded, that a coherent national parks network gradually took shape.',
                },
              ]}
            />
          </SectionCard>

          {/* ── Fill in the blanks (dropdowns) ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Reading · Fill in the blanks
            </div>
            <Instruction>
              In the text below, some words are missing. For each gap, choose the correct word from the drop-down list.
            </Instruction>
            <div className={'bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] p-4 text-sm leading-loose'} style={{ color: '#cdd9c0' }}>
              A great mountain range forms the rugged backbone of one large island. The mountains were created by the
              <Dropdown id='pf1' options={['collision', 'erosion', 'eruption', 'flooding']} correctAnswer='collision' />
              of two tectonic plates, a process that continues to push the mountains
              <Dropdown id='pf2' options={['downward', 'upward', 'sideways', 'apart']} correctAnswer='upward' />
              by several millimetres each year. Heavy rainfall on the western slopes
              <Dropdown id='pf3' options={['sustains', 'prevents', 'pollutes', 'drains']} correctAnswer='sustains' />
              dense rainforest and feeds the glaciers, while the eastern side lies in a relatively dry
              <Dropdown id='pf4' options={['rain shadow', 'flood plain', 'river delta', 'coral reef']} correctAnswer='rain shadow' />
              .
            </div>
            <p className='text-xs mt-3' style={{ color: '#8ba3b8' }}>
              Each drop-down turns green when correct and red when incorrect.
            </p>
          </SectionCard>

          {/* ── Reading & writing fill in the blanks ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Reading &amp; Writing · Fill in the blanks
            </div>
            <Instruction>Choose the word that best fits each gap from the drop-down options.</Instruction>
            <div className={'bg-[rgba(8,16,24,0.6)] border border-[rgba(150,180,200,0.3)] p-4 text-sm leading-loose'} style={{ color: '#cdd9c0' }}>
              Tourism is one of many countries' largest export industries, but its rapid growth has raised
              <Dropdown id='prw1' options={['concerns', 'profits', 'discounts', 'distances']} correctAnswer='concerns' />
              about its impact on the environment. Popular destinations can become
              <Dropdown id='prw2' options={['overcrowded', 'underused', 'invisible', 'affordable']} correctAnswer='overcrowded' />
              during peak season, putting pressure on local infrastructure. In response, several regions have
              <Dropdown id='prw3' options={['introduced', 'abolished', 'ignored', 'refunded']} correctAnswer='introduced' />
              measures to manage visitor numbers and protect fragile sites.
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Reading tip:</strong> In real PTE, "multiple answers" questions apply a negative mark for wrong
            selections, so only choose options you are confident about. For "re-order paragraphs", first find the
            sentence that can only be the introduction — it usually names the topic without referring back to anything.
          </TipBox>
        </div>
      )}

      {activeSection === 'writing' && (
        <div className='space-y-6'>
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Writing · Summarize written text
            </div>
            <PassageTitle>Summarize the passage in one sentence</PassageTitle>
            <Passage>
              <p>
                Hydroelectricity has been the foundation of many countries' electricity supply for almost a century.
                Large dams on major rivers capture the energy of falling water to spin turbines, providing a renewable
                and flexible source of power that can be ramped up or down to match demand. However, hydro generation
                depends on rainfall and snowmelt, so in unusually dry years lake levels fall and a country must rely
                more heavily on gas or coal. To reduce this vulnerability, planners are increasingly pairing hydro with
                wind, solar, and geothermal generation, creating a more diverse and resilient electricity system.
              </p>
            </Passage>
          </SectionCard>
          <WritingTask
            id='pw1'
            title=''
            instructions='Summarize the text above in ONE sentence (5–75 words). Use a single sentence — do not use full stops in the middle.'
            minWords={5}
            rows={4}
          />

          <TipBox accent={ACCENT}>
            <strong>Summarize tip:</strong> It must be exactly one sentence. A reliable pattern is to join two main ideas
            with "while", "although", or "because" — e.g. "Although hydroelectricity provides…, it depends on…, so
            planners are…". Stay between 5 and 75 words or the response scores zero.
          </TipBox>

          <WritingTask
            id='pw2'
            title='Writing · Write essay'
            instructions='You have 20 minutes. Write 200–300 words. Your response is scored on content, structure, grammar, vocabulary, and spelling.'
            minWords={200}
            rows={14}
            prompt={
              <>
                <strong>
                  Some people think that international tourism brings more benefits than drawbacks to a country like New
                  Zealand. Others disagree.
                </strong>
                <br />
                <br />
                Discuss both points of view and give your own opinion. Support your position with reasons and examples
                from your own knowledge or experience.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Essay tip:</strong> PTE rewards a clear, predictable structure: introduction stating your position →
            one paragraph for each view → conclusion restating your opinion. Aim squarely for 200–300 words; going over
            300 or under 200 reduces your score. Use linking words (firstly, however, in conclusion) generously.
          </TipBox>

          <WritingTask
            id='pw3'
            title='Writing · Write essay (2)'
            instructions='You have 20 minutes. Write 200–300 words in English. The topic is Argentine culture, but the skill assessed is your English writing.'
            minWords={200}
            rows={14}
            prompt={
              <>
                <strong>
                  In Argentina, the tradition of sharing mate encourages people to spend time together in person. Some
                  people believe that modern technology is reducing this kind of face-to-face social interaction.
                </strong>
                <br />
                <br />
                Do you agree or disagree? Support your position with reasons and examples from your own knowledge or
                experience.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Essay tip:</strong> State your position clearly in the first sentence and keep it consistent to the
            end. The AI feedback is written in encouraging Spanish, with any corrected English shown in English.
          </TipBox>

          <WritingTask
            id='pw4'
            title='Writing · Write essay (3)'
            instructions='You have 20 minutes. Write 200–300 words.'
            minWords={200}
            rows={14}
            prompt={
              <>
                <strong>
                  Large international football tournaments bring excitement and tourism to countries like Argentina, but
                  they are also extremely expensive to host.
                </strong>
                <br />
                <br />
                Do the benefits of hosting major sporting events outweigh the costs? Give reasons and examples to support
                your view.
              </>
            }
          />

          <WritingTask
            id='pw5'
            title='Writing · Summarize written text (2)'
            instructions='Summarize the text below in ONE sentence (5–75 words). Use a single sentence — do not use a full stop in the middle.'
            minWords={5}
            rows={4}
            prompt={
              <>
                Patagonia, shared by Argentina and Chile, is one of the least densely populated regions on Earth. Its
                glaciers, steppes, and mountain ranges attract scientists and tourists alike, yet the same remoteness
                that protects its ecosystems also makes conservation and infrastructure expensive and difficult to
                manage.
              </>
            }
          />

          <TipBox accent={ACCENT}>
            <strong>Summarize tip:</strong> One sentence only. Join the two main ideas (the region’s appeal and the
            challenge of protecting it) with a linker such as "although", "while", or "because", and stay between 5 and
            75 words.
          </TipBox>
        </div>
      )}

      {activeSection === 'grammar' && (
        <div className='space-y-6'>
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Grammar · Choose the correct form
            </div>
            <Instruction>
              Choose the grammatically correct option. The topics are Argentine, but the focus is English grammar —
              tenses, articles, prepositions, and agreement.
            </Instruction>
            <div className='space-y-6'>
              <MultipleChoice
                id='pg1'
                questionText='1. Every weekend, families across Argentina ______ together to share an asado.'
                options={[
                  { letter: 'A', text: 'gathers' },
                  { letter: 'B', text: 'gather' },
                  { letter: 'C', text: 'gathering' },
                  { letter: 'D', text: 'is gathering' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='pg2'
                questionText='2. Last summer we ______ the glaciers in Patagonia.'
                options={[
                  { letter: 'A', text: 'visit' },
                  { letter: 'B', text: 'have visited' },
                  { letter: 'C', text: 'visited' },
                  { letter: 'D', text: 'were visiting' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='pg3'
                questionText='3. Buenos Aires is ______ capital of Argentina.'
                options={[
                  { letter: 'A', text: 'a' },
                  { letter: 'B', text: 'an' },
                  { letter: 'C', text: 'the' },
                  { letter: 'D', text: '(no article)' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='pg4'
                questionText='4. If the weather ______ good tomorrow, we will watch the football match in the plaza.'
                options={[
                  { letter: 'A', text: 'is' },
                  { letter: 'B', text: 'will be' },
                  { letter: 'C', text: 'was' },
                  { letter: 'D', text: 'would be' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='pg5'
                questionText='5. Mate is usually shared ______ a group of friends from the same cup.'
                options={[
                  { letter: 'A', text: 'between' },
                  { letter: 'B', text: 'among' },
                  { letter: 'C', text: 'along' },
                  { letter: 'D', text: 'across' },
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
                id='pg6'
                questionText='Rewrite in the past simple: "We watch the tango show and eat empanadas afterwards."'
                correctAnswers={['We watched the tango show and ate empanadas afterwards.']}
              />
              <QuestionInput
                id='pg7'
                questionText='Complete with the correct preposition: "The match begins ______ eight o’clock in the evening."'
                correctAnswers={['at']}
              />
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Grammar tip:</strong> Time markers tell you the tense ("last summer" → past simple). For
            prepositions, learn common pairs ("at" + a clock time, "on" + a day, "in" + a month).
          </TipBox>
        </div>
      )}

      {activeSection === 'connectors' && (
        <div className='space-y-6'>
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#a8cae0' }}>
              Connecting words · Choose the best linker
            </div>
            <Instruction>
              Choose the best connecting word. The questions get harder as you go — from basic linkers to more advanced
              ones.
            </Instruction>
            <div className='space-y-6'>
              <MultipleChoice
                id='pc1'
                questionText='1. (Basic) Argentina is famous for football ______ it also has great music and food.'
                options={[
                  { letter: 'A', text: 'and' },
                  { letter: 'B', text: 'but' },
                  { letter: 'C', text: 'or' },
                  { letter: 'D', text: 'so' },
                ]}
                correctAnswer='A'
              />
              <MultipleChoice
                id='pc2'
                questionText='2. (Basic) Many people visit Patagonia in summer ______ the days are longer and warmer.'
                options={[
                  { letter: 'A', text: 'but' },
                  { letter: 'B', text: 'because' },
                  { letter: 'C', text: 'or' },
                  { letter: 'D', text: 'and' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='pc3'
                questionText='3. (Medium) ______ the asado took several hours to cook, everyone agreed it was worth the wait.'
                options={[
                  { letter: 'A', text: 'Because' },
                  { letter: 'B', text: 'Although' },
                  { letter: 'C', text: 'So' },
                  { letter: 'D', text: 'And' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='pc4'
                questionText='4. (Medium) Argentina is famous for football; ______, it has a rich tradition of literature and film.'
                options={[
                  { letter: 'A', text: 'however' },
                  { letter: 'B', text: 'in addition' },
                  { letter: 'C', text: 'because' },
                  { letter: 'D', text: 'for example' },
                ]}
                correctAnswer='B'
              />
              <MultipleChoice
                id='pc5'
                questionText='5. (Hard) Hosting a major tournament is very expensive; ______, many countries still compete to do it.'
                options={[
                  { letter: 'A', text: 'therefore' },
                  { letter: 'B', text: 'moreover' },
                  { letter: 'C', text: 'nevertheless' },
                  { letter: 'D', text: 'meanwhile' },
                ]}
                correctAnswer='C'
              />
              <MultipleChoice
                id='pc6'
                questionText='6. (Hard) The region attracts more visitors each year; ______, the need for environmental protection keeps growing.'
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
                id='pc7'
                questionText='(Medium) Join with "because": "Stadiums are often full." + "Football is very popular in Argentina."'
                correctAnswers={['Stadiums are often full because football is very popular in Argentina.']}
              />
              <QuestionInput
                id='pc8'
                questionText='(Hard) Join into one sentence showing contrast: "Patagonia is beautiful and remote." + "Travelling there can be expensive."'
                correctAnswers={[
                  'Although Patagonia is beautiful and remote, travelling there can be expensive.',
                  'Patagonia is beautiful and remote, but travelling there can be expensive.',
                  'Patagonia is beautiful and remote; however, travelling there can be expensive.',
                ]}
              />
            </div>
          </SectionCard>

          <TipBox accent={ACCENT}>
            <strong>Connecting words tip:</strong> Master the basics first — <em>and</em> (adds), <em>but</em>
            (difference), <em>because</em> (reason), <em>so</em> (result). Then add range with <em>although</em>,
            <em> however</em>, <em>nevertheless</em>, and <em>consequently</em>.
          </TipBox>
        </div>
      )}
    </ExamShell>
  );
}
