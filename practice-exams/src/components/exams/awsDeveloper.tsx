export default function AWSDeveloper({ onBack }: { onBack: () => void }) {
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
          background: 'linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)',
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-12 max-w-4xl'>
        <button
          onClick={onBack}
          className='mb-8 text-base tracking-wide transition-colors hover:text-[#f2d8e8]'
          style={{ color: '#b89ab8' }}
        >
          ← Back to Dashboard
        </button>

        <div className='bg-[rgba(15,8,28,0.75)] border border-[rgba(180,140,200,0.22)] border-l-4 border-l-[#f2a05a] p-8 backdrop-blur-sm'>
          <div className='mb-8'>
            <span
              className='inline-block text-sm px-3 py-2 border border-[rgba(180,140,200,0.3)] bg-[rgba(10,5,20,0.6)] tracking-wider'
              style={{ color: '#c9a8e0' }}
            >
              DVA-C02
            </span>
            <h1
              className='text-4xl mt-4 mb-2 tracking-wider'
              style={{
                color: '#f2d8e8',
                textShadow: '2px 2px 0 #3a1040, 0 0 12px rgba(200,140,220,0.4)',
              }}
            >
              AWS Developer Associate
            </h1>
          </div>

          <div className='bg-[rgba(10,5,20,0.6)] border border-[rgba(180,140,200,0.3)] p-6 mb-8'>
            <p className='text-base tracking-wide' style={{ color: '#9a88b8' }}>
              Practice exam content coming soon!
            </p>
          </div>

          <div>
            <h2
              className='text-2xl mb-4 tracking-wide'
              style={{
                color: '#ede0f5',
                textShadow: '1px 1px 0 #3a1040',
              }}
            >
              Exam Details
            </h2>
            <div className='space-y-3 text-base tracking-wide' style={{ color: '#9a88b8' }}>
              <div className='flex items-start gap-3'>
                <span style={{ color: '#f2a05a' }}>•</span>
                <span>65 questions</span>
              </div>
              <div className='flex items-start gap-3'>
                <span style={{ color: '#f2a05a' }}>•</span>
                <span>130 minutes</span>
              </div>
              <div className='flex items-start gap-3'>
                <span style={{ color: '#f2a05a' }}>•</span>
                <span>Score: 720/1000 to pass</span>
              </div>
              <div className='flex items-start gap-3'>
                <span style={{ color: '#f2a05a' }}>•</span>
                <span>Multiple choice and multiple response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
