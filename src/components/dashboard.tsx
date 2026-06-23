import type { ExamCard, ExamId } from "../types";

export default function Dashboard({ onSelectExam }: { onSelectExam: (exam: ExamId) => void }) {
  const exams: ExamCard[] = [
    {
      id: "aws-cloud-practitioner",
      title: "AWS Cloud Practitioner",
      code: "CLF-C02",
      description: "Foundational cloud knowledge",
      icon: "",
      color: "border-[#7bc8ea]",
    },
    {
      id: "aws-developer",
      title: "AWS Developer Associate",
      code: "DVA-C02",
      description: "Build cloud applications",
      icon: "",
      color: "border-[#f2a05a]",
    },
    {
      id: "claude-architect",
      title: "Claude Architect Foundations",
      code: "CCA-F",
      description: "AI application architecture",
      icon: "",
      color: "border-[#a8cae0]",
    },
    {
      id: "ielts-academic",
      title: "IELTS Academic",
      code: "ACADEMIC",
      description: "Reading & writing practice exam",
      icon: "",
      color: "border-[#6ec99a]",
    },
    {
      id: "ielts-general",
      title: "IELTS General Training",
      code: "GT",
      description: "Reading & writing practice exam",
      icon: "",
      color: "border-[#e0a8c9]",
    },
    {
      id: "pte-academic",
      title: "PTE Academic",
      code: "PTE",
      description: "Reading & writing practice exam",
      icon: "",
      color: "border-[#7bc8ea]",
    },
  ];

  const renderCard = (exam: ExamCard) => (
    <div
      key={exam.id}
      className={`flex items-center justify-between bg-[rgba(12,20,28,0.75)] border border-[rgba(150,180,200,0.22)] border-l-4 ${exam.color} px-6 py-6 cursor-pointer transition-all backdrop-blur-sm hover:bg-[rgba(40,75,100,0.55)] hover:border-[rgba(160,200,225,0.5)]`}
      onClick={() => onSelectExam(exam.id)}
    >
      <div className='flex flex-col gap-2'>
        <span className='text-xl tracking-wide' style={{ color: "#eaf2f8" }}>
          {exam.title}
        </span>
        <span className='text-base tracking-wide' style={{ color: "#8ba3b8" }}>
          {exam.description}
        </span>
      </div>
      <div className='flex items-center gap-4'>
        <span
          className='text-sm px-3 py-2 border border-[rgba(150,180,200,0.3)] bg-[rgba(8,16,24,0.6)] tracking-wider'
          style={{ color: "#a8cae0" }}
        >
          {exam.code}
        </span>
        <span className='text-2xl transition-colors' style={{ color: "rgba(150,180,200,0.4)" }}>
          ▶
        </span>
      </div>
    </div>
  );

  return (
    <div className='relative min-h-screen'>
      <div
        className='fixed inset-0 bg-cover'
        style={{
          backgroundImage: "url(/CfKUpQS.jpg)",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
          filter: "brightness(1.25) saturate(1.05)",
        }}
      />

      <div
        className='fixed inset-0'
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,25,35,0.30) 0%, rgba(10,18,28,0.70) 60%, rgba(8,14,22,0.90) 100%)",
        }}
      />

      <div className='relative z-10 container mx-auto px-4 py-16 max-w-5xl'>
        <div className='text-center mb-16'>
          <h1
            className='text-4xl mb-3 tracking-wider'
            style={{
              color: "#e8f4fb",
              textShadow: "2px 2px 0 #0a2230, 0 0 12px rgba(150,200,225,0.4)",
            }}
          >
            Practice Exams
          </h1>
          <p
            className='text-base tracking-wide'
            style={{
              color: "#dce8f0",
              textShadow: "1px 1px 0 #0a2230, 0 0 8px rgba(10,34,48,0.8)",
            }}
          >
            Select an exam to begin
          </p>
        </div>

        <div className='space-y-4'>
          {exams.slice(3).map(renderCard)}

          <div className='flex items-center gap-4 mt-12 mb-8'>
            <div className='flex-1 h-px bg-[rgba(150,180,200,0.22)]'></div>
            <span className='text-sm tracking-wider' style={{ color: "#8ba3b8" }}>
              Technical Exams
            </span>
            <div className='flex-1 h-px bg-[rgba(150,180,200,0.22)]'></div>
          </div>

          {exams.slice(0, 3).map(renderCard)}
        </div>
      </div>
    </div>
  );
}
