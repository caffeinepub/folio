export type SectionType =
  | "hero"
  | "about"
  | "projects"
  | "education"
  | "skills"
  | "gallery"
  | "certificates"
  | "contact"
  | "custom"
  | "blackberryhub";

export interface ProjectLink {
  id: string;
  label: string;
  url: string;
}

export interface SectionItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  tags?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
  issuer?: string;
  level?: number; // 1-5 for skills
  links?: ProjectLink[];
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  isVisible: boolean;
  order: number;
  items: SectionItem[];
  content?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  location: string;
  email: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  profileImageUrl?: string;
}

export interface PortfolioSettings {
  theme: string;
  fontPair: string;
  portfolioTitle: string;
}

export interface PortfolioData {
  profile: Profile;
  sections: Section[];
  settings: PortfolioSettings;
}
