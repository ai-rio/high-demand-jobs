import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface Job {
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

const CATEGORY_RULES: [string, RegExp[]][] = [
  ['AI Research & Engineering', [/member of technical staff/i, /data scientist/i, /ai evaluation/i, /coding expert/i, /competitive programming/i, /machine learning/i, /prompt/i, /llm/i, /frontier ai/i]],
  ['Software Engineering', [/software (developer|engineer|architect)/i, /full.?stack/i, /backend/i, /frontend/i, /devops/i, /mobile developer/i, /ios developer/i, /android/i, /senior engineer/i, /junior software/i, /systems programmer/i, /rust engineer/i, /go lang/i, /typescript/i, /react.*developer/i, /python.*developer/i, /cloud.*engineer/i]],
  ['Language & Translation', [/language expert/i, /bilingual/i, /linguist/i, /translation/i, /transcrip/i, /interpreter/i, /english specialist/i, /mandarin/i, /cantonese/i, /chinese.*expert/i, /hebrew/i, /french/i, /japanese/i, /korean/i, /arabic/i, /portuguese/i, /welsh/i, /dhivehi/i, /azerbaijani/i, /sanskrit/i]],
  ['Finance & Accounting', [/financial/i, /accountant/i, /fpa/i, /tax/i, /credit/i, /underwriter/i, /cfa/i, /cfp/i, /advisor.*finance/i, /finance.*advisor/i, /investing/i, /audit/i]],
  ['Legal', [/attorney/i, /paralegal/i, /law clerk/i, /general counsel/i, /legal/i, /compliance.*specialist/i]],
  ['Healthcare & Science', [/computational (biology|chemistry|physics)/i, /biology/i, /chemistry/i, /physics/i, /nursing/i, /medical/i, /clinical/i, /pathology/i, /mammalian/i, /cell.*culture/i, /bioinformation/i, /bioinformatics/i, /pharma/i, /scientific/i, /chemistry.*expert/i, /physics.*expert/i]],
  ['Creative & Design', [/2d artist/i, /ui.?ux/i, /designer/i, /illustrator/i, /presentation designer/i, /motion designer/i, /video editor/i, /animator/i, /krita/i, /creative/i, /graphic design/i, /typography/i]],
  ['Game Development', [/game (developer|engineer|designer)/i, /cocos2d/i, /panda3d/i, /solar2d/i, /defold/i, /libgdx/i, /o3de/i, /unreal/i, /gamedev/i]],
  ['Business & Operations', [/growth manager/i, /marketing/i, /sales/i, /project manager/i, /consultant/i, /business/i, /operations/i, /product manager/i, /account manager/i, /customer support/i, /sales.*operations/i, /hr/i, /recruiter/i]],
  ['Specialized Technical', [/qgis/i, /cnc/i, /pcb/i, /autocad/i, /opencad/i, /freecad/i, /vectorworks/i, /cad.*engineer/i, /architect/i, /audio engineer/i, /post.?production/i, /lmms/i, /slack/i, /mechanical/i, /manufacturing/i, /quality.*assurance/i]],
];

function classifyCategory(title: string): string {
  for (const [category, patterns] of CATEGORY_RULES) {
    for (const pattern of patterns) {
      if (pattern.test(title)) {
        return category;
      }
    }
  }
  return 'Software Engineering';
}

function toSlug(title: string, index: number, seen: Map<string, number>): string {
  let slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (!slug) slug = `job-${index}`;
  const count = (seen.get(slug) || 0) + 1;
  seen.set(slug, count);
  if (count > 1) slug += `-${count}`;
  return slug;
}

function parseSalary(value: string): { min: number | null; max: number | null } {
  const multiplier = value.includes('M') ? 1000000 : value.includes('K') ? 1000 : 1;
  const parts = value.replace(/[$,MKk]/g, '').replace(/\/year|\/yr/g, '').trim();
  const nums = parts.split(' - ').map(Number).filter(n => !isNaN(n)).map(n => n * multiplier);
  if (nums.length === 0) return { min: null, max: null };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: nums[0], max: nums[1] };
}

function parseHourly(value: string): { min: number | null; max: number | null } {
  const parts = value.replace(/[$,]/g, '').replace(/\/hour/g, '').trim();
  const nums = parts.split(' - ').map(Number).filter(n => !isNaN(n));
  if (nums.length === 0) return { min: null, max: null };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: nums[0], max: nums[1] };
}

function parse(): void {
  const content = readFileSync(resolve(__dirname, 'high-demand-jobs.md'), 'utf-8');
  const lines = content.split('\n');

  const jobs: Job[] = [];
  const seenSlugs = new Map<string, number>();
  let currentTitle = '';
  let currentFields: Record<string, string> = {};
  let currentDescription: string[] = [];
  let parsingDescription = false;
  let inDescriptionSection = false;
  let descStartIndex = 0;

  function flushJob() {
    if (!currentTitle) return;
    const title = currentTitle.replace(/^\d+\.\s*/, '').trim();
    const bonusRaw = (currentFields['Referral Bonus'] || '$0').replace(/[$,]/g, '');
    const hourlyRaw = currentFields['Hourly Rate'] || '';
    const salaryRaw = currentFields['Salary'] || '';
    const skillsRaw = currentFields['Skills'] || '';
    const openingsRaw = currentFields['Openings'] || '0';
    const typeRaw = currentFields['Type'] || 'N/A';
    const applyUrl = currentFields['Apply'] || '';

    const fullDescription = currentDescription.join('\n').trim();
    const description = fullDescription.replace(/^### Description\s*\n*/i, '').trim();

    const id = `job-${jobs.length + 1}`;
    const slug = toSlug(title, jobs.length + 1, seenSlugs);
    const category = classifyCategory(title);
    const salary = parseSalary(salaryRaw);
    const hourly = parseHourly(hourlyRaw);

    let locations = ['Remote'];
    const typeMatch = typeRaw.match(/\| (.+)/);
    if (typeMatch) {
      locations = typeMatch[1].split(',').map(s => s.trim());
    }

    jobs.push({
      id,
      title,
      slug,
      category,
      openings: openingsRaw === 'N/A' ? 0 : parseInt(openingsRaw, 10) || 0,
      type: typeRaw.replace(/\|.*/, '').trim(),
      location: locations[0] || 'Remote',
      referralBonus: parseInt(bonusRaw, 10) || 0,
      salaryMin: salary.min,
      salaryMax: salary.max,
      hourlyMin: hourly.min,
      hourlyMax: hourly.max,
      skills: skillsRaw === 'N/A' ? [] : skillsRaw.split(',').map(s => s.trim()).filter(Boolean),
      description,
      affiliateUrl: applyUrl,
      featured: applyUrl.includes('referralCode=') && Math.random() < 0.05,
    });
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    const jobHeader = line.match(/^##\s+\d+\.\s+(.+)/);
    if (jobHeader) {
      if (currentTitle) {
        flushJob();
      }
      currentTitle = jobHeader[1].trim();
      currentFields = {};
      currentDescription = [];
      parsingDescription = false;
      inDescriptionSection = false;
      descStartIndex = 0;
      continue;
    }

    if (!currentTitle) continue;

    const fieldMatch = line.match(/^-\s+\*\*([^*]+)\*\*\s*(.*)/);
    if (fieldMatch) {
      const key = fieldMatch[1].replace(/:$/, '').trim();
      const value = fieldMatch[2].trim();
      if (key) currentFields[key] = value;
      continue;
    }

    if (line.trim() === '### Description') {
      inDescriptionSection = true;
      parsingDescription = true;
      descStartIndex = i;
      currentDescription.push(line);
      continue;
    }

    if (inDescriptionSection) {
      currentDescription.push(line);
    }
  }

  if (currentTitle) flushJob();

  const dataDir = resolve(__dirname, 'src', 'data');
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(resolve(dataDir, 'jobs.json'), JSON.stringify(jobs, null, 2), 'utf-8');

  console.log(`Parsed ${jobs.length} jobs`);
  const cats = new Map<string, number>();
  for (const job of jobs) {
    cats.set(job.category, (cats.get(job.category) || 0) + 1);
  }
  for (const [cat, count] of cats) {
    console.log(`  ${cat}: ${count}`);
  }

  writeFileSync(resolve(__dirname, 'parse-jobs.ts.log'), `${jobs.length} jobs parsed\n`, 'utf-8');
}

parse();
