// Types for portfolio content

export interface ResearchFrontmatter {
  title: string;
  author: string;
  date: string;
  tags: string[];
  thumbnail?: string;
  summary: string;
  readingTime: number;
  slug: string;
  category: string;
}

export interface ResearchArticle extends ResearchFrontmatter {
  content: string;
}

export interface ResearchInterest {
  title: string;
  description: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  currentRole: string;
  keyProgram: string;
  startup: string;
  teaching: string;
  postdocInterests: string[];
  vision: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  thesis?: string;
  advisor?: string;
}

export interface Experience {
  title: string;
  department: string;
  company: string;
  period: string;
}

export interface Publication {
  authors: string;
  title: string;
  journal: string;
  year: string;
  impact: number;
  isFirstAuthor: boolean;
  category?: string;
  googleScholarUrl?: string;
}

export interface Award {
  title: string;
  event: string;
  date: string;
}
