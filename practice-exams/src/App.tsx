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
    <div className="min-h-screen bg-base-200">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        }
      >
        {renderView()}
      </Suspense>
    </div>
  );
}

export default App;
