export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  venueType: "conference" | "journal" | "workshop" | "preprint";
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
}

export interface TeamMember {
  id: string;
  name: string;
  /** Current role in the research group */
  role: "phd" | "postdoc" | "masters" | "undergrad" | "alumni" | "collaborator";
  photo?: string;
  website?: string;
  email?: string;
  joined?: number; // year
  graduated?: number; // year (alumni only)
  research?: string; // short research description
}

export interface Course {
  id: string;
  code: string;
  title: string;
  semester: string;
  year: number;
  level: "undergraduate" | "graduate";
  description?: string;
  syllabusUrl?: string;
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
  researchInterests: string[];
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
  keywords: string[];
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
