export type ExamId = 'aws-cloud-practitioner' | 'aws-developer' | 'claude-architect' | 'ielts-academic';

export type ExamCard = {
  id: ExamId;
  title: string;
  code: string;
  description: string;
  icon: string;
  color: string;
};

export type Question = {
  domain: string;
  multi: number;
  q: string;
  opts: string[];
  ans: number[];
  exp: {
    correct: string[];
    incorrect: string[];
  };
};
