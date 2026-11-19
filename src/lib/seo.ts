import { plain } from "@/components/RichText";
import { pathName } from "@/content/paths";
import type { Lesson, PathInfo } from "@/content/types";
import { site } from "@/lib/site";

const abs = (p: string) => `${site.url}${p}`;

export const authorLd = {
  "@type": "Person",
  "@id": `${site.author.url}/#person`,
  name: site.author.name,
  url: site.author.url,
  jobTitle: "Freelance AI consultant",
  knowsAbout: ["Python", "Artificial intelligence", "Machine learning", "Generative AI"],
  sameAs: [site.author.linkedin, site.author.url],
};

export const orgLd = {
  "@type": "EducationalOrganization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: abs("/apple-icon.png"),
  description: site.description,
  founder: { "@id": `${site.author.url}/#person` },
  sameAs: [site.author.url],
};

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        alternateName: ["Python Mates", "pythonmates.com"],
        url: site.url,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#organization` },
      },
      orgLd,
      authorLd,
    ],
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  };
}

export function courseLd(path: PathInfo, lessons: Lesson[]) {
  const minutes = lessons.reduce((n, l) => n + l.minutes, 0);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": abs(`/learn/${path.id}/#course`),
    name: `${pathName(path)} course`,
    description: path.summary,
    url: abs(`/learn/${path.id}/`),
    provider: { "@id": `${site.url}/#organization` },
    author: { "@id": `${site.author.url}/#person` },
    isAccessibleForFree: true,
    inLanguage: "en",
    educationalLevel: path.title,
    teaches: path.outline.map((o) => o.title),
    timeRequired: `PT${minutes}M`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${minutes}M`,
    },
    offers: { "@type": "Offer", price: 0, priceCurrency: "EUR", category: "Free" },
    hasPart: lessons.map((l) => ({
      "@type": "LearningResource",
      name: l.title,
      url: abs(`/learn/${l.path}/${l.slug}/`),
    })),
  };
}

export function lessonLd(lesson: Lesson, path: PathInfo) {
  const url = abs(`/learn/${lesson.path}/${lesson.slug}/`);
  const headings = lesson.blocks.filter((b) => b.t === "h2").map((b) => plain((b as { text: string }).text));
  return {
    "@context": "https://schema.org",
    "@type": ["LearningResource", "TechArticle"],
    "@id": `${url}#lesson`,
    name: lesson.title,
    headline: `${lesson.title} — Python tutorial`,
    description: lesson.description,
    abstract: plain(lesson.answer),
    url,
    mainEntityOfPage: url,
    image: `${url}opengraph-image`,
    learningResourceType: ["Tutorial", "Exercise", "Quiz"],
    educationalLevel: path.title,
    teaches: headings,
    keywords: ["Python", lesson.title, path.title, ...headings].join(", "),
    proficiencyLevel: path.id === "beginner" ? "Beginner" : "Expert",
    timeRequired: `PT${lesson.minutes}M`,
    inLanguage: "en",
    isAccessibleForFree: true,
    datePublished: lesson.updated,
    dateModified: lesson.updated,
    author: { "@id": `${site.author.url}/#person`, name: site.author.name, url: site.author.url },
    publisher: { "@id": `${site.url}/#organization`, name: site.name },
    about: { "@type": "ComputerLanguage", name: "Python", version: site.pythonVersion },
    isPartOf: { "@id": abs(`/learn/${path.id}/#course`), "@type": "Course", name: `${pathName(path)} course` },
    hasPart: {
      "@type": "Quiz",
      name: `${lesson.title} quiz`,
      hasPart: lesson.quiz.map((q) => ({
        "@type": "Question",
        name: plain(q.q),
        eduQuestionType: "Multiple choice",
        acceptedAnswer: { "@type": "Answer", text: `${plain(q.options[q.answer])}. ${plain(q.why)}` },
        suggestedAnswer: q.options
          .filter((_, i) => i !== q.answer)
          .map((o) => ({ "@type": "Answer", text: plain(o) })),
      })),
    },
  };
}
