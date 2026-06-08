import { lazy, Suspense, useState } from 'react';
import Dashboard from './components/dashboard';
import type { ExamId } from './types';

const AWSCloudPractitioner = lazy(() => import('./components/exams/awsCloudPractitioner'));
const AWSDeveloper = lazy(() => import('./components/exams/awsDeveloper'));
const ClaudeArchitect = lazy(() => import('./components/exams/claudeArchitect'));

function App() {
  const [currentView, setCurrentView] = useState<ExamId | 'dashboard'>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'aws-cloud-practitioner':
        return <AWSCloudPractitioner onBack={() => setCurrentView('dashboard')} />;
      case 'aws-developer':
        return <AWSDeveloper onBack={() => setCurrentView('dashboard')} />;
      case 'claude-architect':
        return <ClaudeArchitect onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onSelectExam={setCurrentView} />;
    }
  };

  return (
    <div className='min-h-screen'>
      <Suspense
        fallback={
          <div className='relative min-h-screen overflow-hidden'>
            <div
              className='absolute inset-0 bg-cover'
              style={{
                backgroundImage: 'url(/bg.jpg)',
                backgroundPosition: 'center 30%',
                filter: 'brightness(0.7) saturate(1.1)',
              }}
            />
            <div
              className='absolute inset-0'
              style={{
                background:
                  'linear-gradient(to bottom, rgba(20,12,35,0.25) 0%, rgba(10,6,22,0.72) 60%, rgba(8,4,18,0.92) 100%)',
              }}
            />
            <div className='relative z-10 flex items-center justify-center min-h-screen'>
              <div className='flex flex-col items-center gap-4'>
                <div
                  className='w-12 h-12 border-4 border-t-transparent rounded-full animate-spin'
                  style={{ borderColor: '#c9a8e0', borderTopColor: 'transparent' }}
                ></div>
                <p className='text-base tracking-wider' style={{ color: '#b89ab8' }}>
                  Loading...
                </p>
              </div>
            </div>
          </div>
        }
      >
        {renderView()}
      </Suspense>
    </div>
  );
}

export default App;
