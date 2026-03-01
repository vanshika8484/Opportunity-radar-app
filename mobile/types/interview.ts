export interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  color: string;
}

export interface Role {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface InterviewConfig {
  company: Company;
  role: Role;
  questions: Question[];
}