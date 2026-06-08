export default function AWSDeveloper({ onBack }: { onBack: () => void }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button onClick={onBack} className="btn btn-ghost">
          ← Back to Dashboard
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-3xl">⚙️</div>
            <div>
              <h1 className="text-4xl font-bold">AWS Certified Developer - Associate</h1>
              <div className="badge badge-primary mt-2">DVA-C02</div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-current shrink-0 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Practice exam content coming soon!</span>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Exam Details</h2>
            <ul className="space-y-2">
              <li>✓ 65 questions</li>
              <li>✓ 130 minutes</li>
              <li>✓ Score: 720/1000 to pass</li>
              <li>✓ Multiple choice and multiple response</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
