import type { AchievementSpec } from "@/types/achievement";
import { PROJECTS } from "./projects";

export const ACHIEVEMENTS: readonly AchievementSpec[] = [
  { slug: "torch-2022", date: "Jan 2023", location: "Ha Noi" },
  { slug: "shining-star-2019", date: "Jan 2020", location: "Ha Noi" },
] as const;

export const EDUCATION = {
  degree: "engineer",
  school: "Hanoi University of Industry",
  location: "Ha Noi",
  period: "Sept 2013 — Sept 2017",
} as const;

export const CONTACT = {
  email: "minh.doan.nrs@gmail.com",
  phone: "+84982766986",
  location: "Ha Noi, Viet Nam",
  links: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    facebook: "https://www.facebook.com/",
  },
} as const;

export const STATS = {
  yearsExperience: 7,
  yearsLeading: 5,
  teamSize: "4–8",
  projects: PROJECTS.length,
} as const;
