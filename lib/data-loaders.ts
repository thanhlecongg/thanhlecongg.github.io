import type { Profile, Publication, TeamMember, Course, ResearchData, TeachingRole, ResearchExperience, Education } from "./types";

// JSON imports are resolved at build time — safe for static export
import profileData from "@/data/profile.json";
import publicationsData from "@/data/publications.json";
import teamData from "@/data/team.json";
import coursesData from "@/data/courses.json";
import researchData from "@/data/research.json";
import teachingRolesData from "@/data/teaching-roles.json";
import experiencesData from "@/data/experiences.json";
import educationData from "@/data/education.json";

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

export function getTeachingRoles(): TeachingRole[] {
  return teachingRolesData as TeachingRole[];
}

export function getResearchExperiences(): ResearchExperience[] {
  return experiencesData as ResearchExperience[];
}

export function getEducation(): Education[] {
  return educationData as Education[];
}
