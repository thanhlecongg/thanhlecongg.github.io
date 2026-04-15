import type { Profile, Publication, TeamMember, Course, ResearchData } from "./types";

// JSON imports are resolved at build time — safe for static export
import profileData from "@/data/profile.json";
import publicationsData from "@/data/publications.json";
import teamData from "@/data/team.json";
import coursesData from "@/data/courses.json";
import researchData from "@/data/research.json";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getPublications(): Publication[] {
  return publicationsData as Publication[];
}

export function getTeamMembers(): TeamMember[] {
  return teamData as TeamMember[];
}

export function getCourses(): Course[] {
  return coursesData as Course[];
}

export function getResearchData(): ResearchData {
  return researchData as ResearchData;
}
