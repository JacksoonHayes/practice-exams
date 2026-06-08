import type { ExamCard, ExamId } from '../types';

export default function Dashboard({ onSelectExam }: { onSelectExam: (exam: ExamId) => void }) {
  const exams: ExamCard[] = [
    {
      id: 'aws-cloud-practitioner',
      title: 'AWS Cloud Practitioner',
      code: 'CLF-C02',
      description: 'Foundational cloud knowledge',
      icon: '',
      color: 'border-[#7bc8ea]',
    },
    {
      id: 'aws-developer',
      title: 'AWS Developer Associate',
      code: 'DVA-C02',
      description: 'Build cloud applications',
      icon: '',
      color: 'border-[#f2a05a]',
    },
    {
      id: 'claude-architect',
      title: 'Claude Architect Foundations',
      code: 'CCA-F',
      description: 'AI application architecture',
      icon: '',
      color: 'border-[#c9a8e0]',
    },
  ];

  return (
    <div className='relative min-h-screen overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover'
        style={{
          backgroundImage: 'url(/bg.jpg)',
          backgroundPosition: 'center 0%',
          filter: 'brightness(1) saturate(1)',
        }}
      />

      <div
        className='absolute inset-0'
        style={{
          background:
            'linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)',
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-16 max-w-5xl'>
        <div className='text-center mb-16'>
          <h1
            className='text-4xl mb-3 tracking-wider'
            style={{
              color: '#f2d8e8',
              textShadow: '2px 2px 0 #3a1040, 0 0 12px rgba(200,140,220,0.4)',
            }}
          >
            Practice Exams
          </h1>
          <p className='text-base tracking-wide' style={{ color: '#b89ab8' }}>
            Select an exam to begin
          </p>
        </div>

        <div className='space-y-4'>
          {exams.map((exam) => (
            <div
              key={exam.id}
              className={`flex items-center justify-between bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] border-l-4 ${exam.color} px-6 py-6 cursor-pointer transition-all backdrop-blur-sm hover:bg-[rgba(80,50,110,0.55)] hover:border-[rgba(200,160,220,0.5)]`}
              onClick={() => onSelectExam(exam.id)}
            >
              <div className='flex flex-col gap-2'>
                <span className='text-xl tracking-wide' style={{ color: '#ede0f5' }}>
                  {exam.title}
                </span>
                <span className='text-base tracking-wide' style={{ color: '#9a88b8' }}>
                  {exam.description}
                </span>
              </div>
              <div className='flex items-center gap-4'>
                <span
                  className='text-sm px-3 py-2 border border-[rgba(180,140,200,0.3)] bg-[rgba(10,5,20,0.6)] tracking-wider'
                  style={{ color: '#c9a8e0' }}
                >
                  {exam.code}
                </span>
                <span className='text-2xl transition-colors' style={{ color: 'rgba(180,140,200,0.4)' }}>
                  ▶
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
