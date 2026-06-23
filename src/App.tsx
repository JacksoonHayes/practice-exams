import { lazy, Suspense, useState } from 'react';
import Dashboard from './components/dashboard';
import type { ExamId } from './types';

const AWSCloudPractitioner = lazy(() => import('./components/exams/awsCloudPractitioner'));
const AWSDeveloper = lazy(() => import('./components/exams/awsDeveloper'));
const ClaudeArchitect = lazy(() => import('./components/exams/claudeArchitect'));
const IELTSAcademic = lazy(() => import('./components/exams/language/ieltsAcademic'));
const IELTSGeneral = lazy(() => import('./components/exams/language/ieltsGeneral'));
const PTEAcademic = lazy(() => import('./components/exams/language/pteAcademic'));

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
      case 'ielts-academic':
        return <IELTSAcademic onBack={() => setCurrentView('dashboard')} />;
      case 'ielts-general':
        return <IELTSGeneral onBack={() => setCurrentView('dashboard')} />;
      case 'pte-academic':
        return <PTEAcademic onBack={() => setCurrentView('dashboard')} />;
      default:
        return <Dashboard onSelectExam={setCurrentView} />;
    }
  };

  return (
    <div className='min-h-screen'>
      <Suspense
        fallback={
          <div className='relative min-h-screen'>
            <div
              className='fixed inset-0 bg-cover'
              style={{
                backgroundImage: 'url(/CfKUpQS.jpg)',
                backgroundPosition: 'center center',
                backgroundAttachment: 'fixed',
                filter: 'brightness(1.25) saturate(1.05)',
              }}
            />
            <div
              className='fixed inset-0'
              style={{
                background:
                  'linear-gradient(to bottom, rgba(15,25,35,0.30) 0%, rgba(10,18,28,0.70) 60%, rgba(8,14,22,0.90) 100%)',
              }}
            />
            <div className='relative z-10 flex items-center justify-center min-h-screen'>
              <div className='flex flex-col items-center gap-4'>
                <div
                  className='w-12 h-12 border-4 border-t-transparent rounded-full animate-spin'
                  style={{ borderColor: '#a8cae0', borderTopColor: 'transparent' }}
                ></div>
                <p className='text-base tracking-wider' style={{ color: '#9ab0c0' }}>
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
