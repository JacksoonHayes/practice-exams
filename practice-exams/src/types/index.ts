export type ExamId = 'aws-cloud-practitioner' | 'aws-developer' | 'claude-architect';

export type ExamCard = {
  id: ExamId;
  title: string;
  code: string;
  description: string;
  icon: string;
  color: string;
};
