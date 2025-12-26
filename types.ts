export enum GroupType {
  SUPPORT = 'Support Group',
  PSYCHOEDUCATION = 'Psychoeducation',
  SKILL_BUILDING = 'Skill Building'
}

export interface GroupOffering {
  id: string;
  title: string;
  description: string;
  longDescription?: string; // Detailed description for the individual page
  benefits?: string[]; // List of key takeaways
  type: GroupType;
  schedule: string;
  facilitator: string;
  image: string;
  active: boolean;
  focus: string; // Specific scope e.g., "Burnout", "Identity"
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  imageUrl: string;
  tags: string[];
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  methodologyText: string;
  contactEmail: string;
  contactPhone: string;
  organizationName: string; // DreamU Psychiatric Support Services
  logoUrl: string;
  globalScheduleStatus: string; // If present, this overrides the specific calendar view
}