export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "TypeScript", "Next.js", "MUI", "Jest / Vitest"],
  },
  {
    title: "Backend / DB",
    skills: ["Python", "MySQL", "PostgreSQL"],
  },
  {
    title: "ML / Research",
    skills: ["PyTorch", "OpenCV"],
  },
  {
    title: "Tools",
    skills: ["AWS", "Git / GitHub"],
  },
];
