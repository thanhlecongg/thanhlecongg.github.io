import type { Profile, Publication, Course, ResearchData, ResearchExperience, Education, Award, ServiceItem } from "./types";

// JSON imports are resolved at build time — safe for static export
import profileData from "@/data/profile.json";
import publicationsData from "@/data/publications.json";
import sutdCoursesData from "@/data/courses.json";
import preSutdCoursesData from "@/data/pre-sutd-courses.json";
import researchData from "@/data/research.json";
import experiencesData from "@/data/experiences.json";
import educationData from "@/data/education.json";
import awardsData from "@/data/awards.json";
import serviceData from "@/data/service.json";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getPublications(): Publication[] {
  return publicationsData as Publication[];
}

export function getSutdCourses(): Course[] {
  return sutdCoursesData as Course[];
}

export function getPreSutdCourses(): Course[] {
  return preSutdCoursesData as Course[];
}

export function getResearchData(): ResearchData {
  return researchData as ResearchData;
}

export function getResearchExperiences(): ResearchExperience[] {
  return experiencesData as ResearchExperience[];
}

export function getEducation(): Education[] {
  return educationData as Education[];
}

export function getAwards(): Award[] {
  return awardsData as Award[];
}

export function getService(): ServiceItem[] {
  return serviceData as ServiceItem[];
}
