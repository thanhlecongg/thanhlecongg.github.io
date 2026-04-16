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
    /** Internal project page route e.g. "/papers/patchguru" */
    projectPage?: string;
  };
  abstract?: string;
  bibtex?: string;
  tags?: string[];
}

export interface PaperDetail {
  slug: string;
  /** Must match a Publication id for back-linking */
  publicationId: string;
  title: string;
  authors: string[];
  venue: string;
  venueType: "conference" | "journal" | "workshop" | "preprint";
  year: number;
  status?: string;
  abstract: string;
  tldr: string;
  contributions: string[];
  results?: string[];
  links: {
    arxiv?: string;
    pdf?: string;
    code?: string;
    slides?: string;
    demo?: string;
    doi?: string;
  };
  bibtex: string;
  tags: string[];
  /** Optional path (relative to /public) for an approach/architecture figure */
  approachFigure?: { src: string; alt: string; caption?: string };
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
  keywords?: string[];
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

export interface TeachingRole {
  id: string;
  institution: string;
  role: string;
  /** e.g. "Jan 2024 – Present" */
  period: string;
  location?: string;
  /** Optional list of course codes/names taught in this role */
  courses?: string[];
  highlights: string[];
}

export interface MentoredStudent {
  name: string;
  affiliation: string;
  topic: string;
  /** Publication references, e.g. "[J3]" */
  papers?: string[];
}

export interface ResearchExperience {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  type: "full-time" | "part-time" | "visiting";
  supervisors?: string[];
  highlights: string[];
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
