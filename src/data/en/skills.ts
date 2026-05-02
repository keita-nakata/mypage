export interface SkillCategory {
  title: string;
  data: { name: string; value: number }[];
  backgroundColor?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    data: [
      { name: "Python", value: 2 },
      { name: "JS/TS/GAS", value: 2 },
      { name: "C/C++", value: 2 },
      { name: "PHP/Ruby/C#", value: 1 },
    ],
  },
  {
    title: "Frameworks / DB",
    data: [
      { name: "React", value: 2 },
      { name: "MySQL", value: 2 },
      { name: "PostgreSQL", value: 1 },
    ],
    backgroundColor: "rgba(0, 0, 255, 0.1)",
  },
  {
    title: "Others",
    data: [
      { name: "MUI", value: 2 },
      { name: "PyTorch/OpenCV", value: 2 },
      { name: "AWS", value: 1 },
      { name: "Supabase", value: 1 },
      { name: "Raspberry Pi", value: 1 },
    ],
    backgroundColor: "rgba(0, 255, 0, 0.1)",
  },
];

export const proficiencyLabels = ["", "Beginner", "Intermediate", "Advanced"];
