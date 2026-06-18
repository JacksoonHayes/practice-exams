import { useState } from 'react';
import {
  Dropdown,
  ExamShell,
  Instruction,
  MultipleChoice,
  MultiSelect,
  Passage,
  PassageTitle,
  Reorder,
  SectionCard,
  TipBox,
  WritingTask,
} from './examKit';

type Section = 'reading' | 'writing';

const ACCENT = '#7bc8ea';

export default function PTEAcademic({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('reading');

  return (
    <ExamShell
      accent={ACCENT}
      code='NZ · PTE'
      title='PTE Academic — NZ Practice Exam'
      subtitle='New Zealand context · Reading & Writing · Check answers as you go'
      sections={['reading', 'writing'] as const}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      onBack={onBack}
    >
      {activeSection === 'reading' && (
        <div className='space-y-6'>
          {/* ── Multiple choice, single answer ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Reading · Multiple choice, choose single answer
            </div>
            <Instruction>Read the text and answer the question by selecting the correct response.</Instruction>
            <Passage>
              <p>
                The Department of Conservation manages around one-third of New Zealand's land area, including its 13
                national parks. Unlike many countries where national parks charge entry fees, access to New Zealand's
                parks is generally free, reflecting a long-standing belief that the outdoors should be available to
                everyone. Revenue is instead raised through hut and campsite fees, concessions to commercial operators
                such as guides and transport companies, and central government funding. Critics note that this model
                leaves conservation budgets vulnerable to political shifts, while supporters argue free access protects
                the parks' role as a shared public good.
              </p>
            </Passage>
            <MultipleChoice
              id='pr1'
              questionText='According to the text, how are New Zealand national parks mainly funded?'
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
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Reading · Multiple choice, choose multiple answers
            </div>
            <Instruction>
              Read the text and answer the question. More than one response is correct — select ALL that apply.
            </Instruction>
            <Passage>
              <p>
                Wellington, New Zealand's capital, is frequently ranked among the world's most liveable cities, but it
                faces real challenges. Built on a fault line, the city is at significant risk from earthquakes, and many
                older buildings have required expensive strengthening. Its compact, hilly geography limits urban sprawl —
                an environmental advantage — but also constrains housing supply and pushes up prices. The city is famous
                for its strong winds, which, while sometimes inconvenient, make it a leading site for wind-power
                generation. A vibrant arts and café culture, supported by the presence of national institutions and the
                film industry, contributes to its high quality of life.
              </p>
            </Passage>
            <MultiSelect
              id='pr2'
              questionText='Which of the following challenges or features of Wellington are mentioned in the text?'
              options={[
                { letter: 'A', text: 'Earthquake risk from a fault line' },
                { letter: 'B', text: 'Limited housing supply due to its geography' },
                { letter: 'C', text: 'A complete lack of public transport' },
                { letter: 'D', text: 'Strong winds suited to wind-power generation' },
                { letter: 'E', text: 'The highest population of any New Zealand city' },
              ]}
              correctAnswers={['A', 'B', 'D']}
            />
          </SectionCard>

          {/* ── Re-order paragraphs ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
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
                  text: 'The history of national parks in New Zealand stretches back more than a century and reflects changing ideas about the relationship between people and the land.',
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
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Reading · Fill in the blanks
            </div>
            <Instruction>
              In the text below, some words are missing. For each gap, choose the correct word from the drop-down list.
            </Instruction>
            <div className={'bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 text-sm leading-loose'} style={{ color: '#d4b894' }}>
              The Southern Alps form the rugged backbone of New Zealand's South Island. They were created by the
              <Dropdown id='pf1' options={['collision', 'erosion', 'eruption', 'flooding']} correctAnswer='collision' />
              of two tectonic plates, a process that continues to push the mountains
              <Dropdown id='pf2' options={['downward', 'upward', 'sideways', 'apart']} correctAnswer='upward' />
              by several millimetres each year. Heavy rainfall on the western slopes
              <Dropdown id='pf3' options={['sustains', 'prevents', 'pollutes', 'drains']} correctAnswer='sustains' />
              dense rainforest and feeds the glaciers, while the eastern side lies in a relatively dry
              <Dropdown id='pf4' options={['rain shadow', 'flood plain', 'river delta', 'coral reef']} correctAnswer='rain shadow' />
              .
            </div>
            <p className='text-xs mt-3' style={{ color: '#9a88b8' }}>
              Each drop-down turns green when correct and red when incorrect.
            </p>
          </SectionCard>

          {/* ── Reading & writing fill in the blanks ── */}
          <SectionCard>
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Reading &amp; Writing · Fill in the blanks
            </div>
            <Instruction>Choose the word that best fits each gap from the drop-down options.</Instruction>
            <div className={'bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-4 text-sm leading-loose'} style={{ color: '#d4b894' }}>
              Tourism is one of New Zealand's largest export industries, but its rapid growth has raised
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
            <div className='text-xs uppercase tracking-wider mb-3' style={{ color: '#c9a8e0' }}>
              Writing · Summarize written text
            </div>
            <PassageTitle>Summarize the passage in one sentence</PassageTitle>
            <Passage>
              <p>
                Hydroelectricity has been the foundation of New Zealand's electricity supply for almost a century.
                Large dams on rivers such as the Waikato and the Clutha capture the energy of falling water to spin
                turbines, providing a renewable and flexible source of power that can be ramped up or down to match
                demand. However, hydro generation depends on rainfall and snowmelt, so in unusually dry years lake levels
                fall and the country must rely more heavily on gas or coal. To reduce this vulnerability, planners are
                increasingly pairing hydro with wind, solar, and geothermal generation, creating a more diverse and
                resilient electricity system.
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
        </div>
      )}
    </ExamShell>
  );
}
