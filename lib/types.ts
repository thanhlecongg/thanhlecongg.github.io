export interface Publication {
  id: string;
  title: string;
  authors: string[];
  /** Authors who contributed equally as co-first authors */
  coFirstAuthors?: string[];
  year: number;
  venue: string;
  venueType: "conference" | "journal" | "workshop" | "preprint";
  /** Track within the venue, e.g. "Research Track", "NIER Track", "Tool Track", "Main", "Findings" */
  track?: string;
  links: {
    pdf?: string;
    doi?: string;
    arxiv?: string;
    code?: string;
    slides?: string;
  };
  abstract?: string;
  bibtex?: string;
  tags?: string[];
  /** Award received by this publication, e.g. "IEEE TCSE Distinguished Paper Award" */
  award?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  /** e.g. "From 2027", "Semester 1, 2025", "Fall 2024" */
  term: string;
  level: "Undergraduate" | "Master's" | "Graduate";
  description: string;
  /** Role held while teaching, e.g. "Academic Tutor — 3 weekly tutorial classes, 30 students each" */
  role?: string;
}

export interface NewsItem {
  /** Format: "YYYY-MM" */
  date: string;
  text: string;
}

export interface Profile {
  name: string;
  title: string;
  department: string;
  university: string;
  email: string;
  officeLocation?: string;
  bio: string;
  socialLinks: {
    googleScholar?: string;
    dblp?: string;
    github?: string;
    twitter?: string;
    linkedin?: string;
    orcid?: string;
  };
  news: NewsItem[];
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Publication IDs from publications.json to show as linked papers under this area */
  relatedPapers?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed";
  links: {
    github?: string;
    paper?: string;
    website?: string;
  };
}

export interface ResearchData {
  statement: string;
  areas: ResearchArea[];
  projects: Project[];
}

export interface ResearchExperience {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  type: "full-time" | "part-time" | "visiting" | "internship";
  supervisors?: string[];
  hosts?: string[];
  highlights?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  location: string;
  thesis?: string;
  advisors?: string[];
  highlights?: string[];
}

export interface Award {
  year: string;
  title: string;
  org: string;
}

export interface ServiceItem {
  year: string;
  role: string;
  venue?: string;
  venues?: string[];
}
