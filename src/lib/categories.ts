export interface Job {
  id: string;
  title: string;
  slug: string;
  category: string;
  openings: number;
  type: string;
  location: string;
  referralBonus: number;
  salaryMin: number | null;
  salaryMax: number | null;
  hourlyMin: number | null;
  hourlyMax: number | null;
  skills: string[];
  description: string;
  affiliateUrl: string;
  featured: boolean;
}

export interface Category {
  id: string;
  label: string;
  count: number;
}

export const CATEGORY_LABELS: Record<string, string> = {
  'AI Research & Engineering': 'AI & Research',
  'Software Engineering': 'Software Engineering',
  'Language & Translation': 'Language & Translation',
  'Finance & Accounting': 'Finance & Accounting',
  'Legal': 'Legal',
  'Healthcare & Science': 'Healthcare & Science',
  'Creative & Design': 'Creative & Design',
  'Game Development': 'Game Dev',
  'Business & Operations': 'Business & Operations',
  'Specialized Technical': 'Specialized Technical',
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'AI Research & Engineering': 'Frontier AI, ML, data science, and research roles',
  'Software Engineering': 'Full-stack, backend, frontend, DevOps, and mobile',
  'Language & Translation': 'Chinese, Mandarin, Hebrew, French, Japanese, and more',
  'Finance & Accounting': 'Financial advisors, accountants, FP&A, tax specialists',
  'Legal': 'Attorneys, paralegals, law clerks, general counsel',
  'Healthcare & Science': 'Medical, biology, chemistry, physics, computational science',
  'Creative & Design': 'UI/UX, 2D art, video production, presentation design',
  'Game Development': 'Cocos2d-x, Panda3D, Solar2D, Defold, libGDX',
  'Business & Operations': 'Growth, marketing, sales, PM, consulting',
  'Specialized Technical': 'QGIS, CNC, PCB, AutoCAD, OpenSCAD, audio engineering',
};

export function getCategories(jobs: Job[]): Category[] {
  const counts = new Map<string, number>();
  for (const job of jobs) {
    counts.set(job.category, (counts.get(job.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({
      id,
      label: CATEGORY_LABELS[id] || id,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getCategorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
