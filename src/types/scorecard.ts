export interface Question {
  QID: string;
  Section: string;
  Question: string;
  Tooltip?: string;
  Scale0: string;
  Scale1: string;
  Scale2: string;
  Scale3: string;
  Scale4: string;
  AllowNA?: boolean;
  Weight: number;
}

export interface AnsweredBy {
  firstName: string;
  lastName: string;
  initials: string;
  timestamp: number;
}

export interface Answer {
  qid: string;
  score: number | "N/A" | null;
  notes: string;
  answeredBy?: AnsweredBy;
}

export interface SectionScore {
  section: string;
  sectionName: string;
  average: number;
  answered: number;
  total: number;
  min: number;
  max: number;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  role: string;
}

export interface TeamMember {
  firstName: string;
  lastName: string;
  email: string;
  initials: string;
  joinedAt: number;
}
