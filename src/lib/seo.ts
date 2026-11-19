import type { Lesson, PathInfo } from "@/content/types";
import { plain } from "@/components/RichText";
import { site } from "@/lib/site";

const abs = (p: string) => `${site.url}${p}`;

export const authorLd = {
  "@type": "Person",
  name: site.author.name,
  url: site.author.url,
  jobTitle: "Freelance AI consultant",
  sameAs: [site.author.linkedin, site.author.url],
};

export const orgLd = {
  "@type": "EducationalOrganization",
  name: site.name,
  url: site.url,
  founder: authorLd,
};

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
    publisher: orgLd,
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function courseLd(path: PathInfo, lessons: Lesson[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Python ${path.title} course`,
    description: path.summary,
    url: abs(`/learn/${path.id}/`),
    provider: orgLd,
    author: authorLd,
    isAccessibleForFree: true,
    inLanguage: "en",
    educationalLevel: path.title,
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT1H" },
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", category: "Free" },
    hasPart: lessons.map((l) => ({
      "@type": "LearningResource",
      name: l.title,
      url: abs(`/learn/${l.path}/${l.slug}/`),
    })),
  };
}

export function lessonLd(lesson: Lesson, path: PathInfo) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    headline: `${lesson.title} — Python tutorial`,
    description: lesson.description,
    abstract: plain(lesson.answer),
    url: abs(`/learn/${lesson.path}/${lesson.slug}/`),
    learningResourceType: ["Tutorial", "Exercise", "Quiz"],
    educationalLevel: path.title,
    timeRequired: `PT${lesson.minutes}M`,
    inLanguage: "en",
    isAccessibleForFree: true,
    dateModified: lesson.updated,
    author: authorLd,
    publisher: orgLd,
    about: { "@type": "ComputerLanguage", name: "Python", version: site.pythonVersion },
    isPartOf: { "@type": "Course", name: `Python ${path.title} course`, url: abs(`/learn/${path.id}/`) },
  };
}
