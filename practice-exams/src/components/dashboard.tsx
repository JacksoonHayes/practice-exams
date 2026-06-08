import type { ExamCard, ExamId } from '../types';

export default function Dashboard({ onSelectExam }: { onSelectExam: (exam: ExamId) => void }) {
  const exams: ExamCard[] = [
    {
      id: 'aws-cloud-practitioner',
      title: 'AWS Certified Cloud Practitioner',
      code: 'CLF-C02',
      description: 'Foundational AWS cloud knowledge and services',
      icon: '☁️',
      color: 'bg-orange-500',
    },
    {
      id: 'aws-developer',
      title: 'AWS Certified Developer - Associate',
      code: 'DVA-C02',
      description: 'Develop and maintain AWS-based applications',
      icon: '⚙️',
      color: 'bg-blue-500',
    },
    {
      id: 'claude-architect',
      title: 'Claude Certified Architect - Foundations',
      code: 'CCA-F',
      description: 'Build AI-powered applications with Claude',
      icon: '🤖',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Practice Exams</h1>
        <p className="text-xl text-base-content/70">Choose a certification path to begin your practice exam</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {exams.map((exam) => (
          <div key={exam.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="card-body">
              <div className={`w-16 h-16 ${exam.color} rounded-full flex items-center justify-center text-3xl mb-4`}>
                {exam.icon}
              </div>
              <h2 className="card-title text-2xl">{exam.title}</h2>
              <div className="badge badge-primary mb-2">{exam.code}</div>
              <p className="text-base-content/70 grow">{exam.description}</p>
              <div className="card-actions justify-end mt-4">
                <button onClick={() => onSelectExam(exam.id)} className="btn btn-primary">
                  Start Practice Exam
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Exams</div>
            <div className="stat-value">3</div>
            <div className="stat-desc">AWS & Claude Certifications</div>
          </div>
        </div>
      </div>
    </div>
  );
}
