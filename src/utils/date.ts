import type { Langcode } from "./i18n";
export const formatDate = (
  date: Date,
  specificity: "year" | "month" | "day" | "none",
  lang: Langcode,
) => {
  if (specificity == "day")
    return date.toLocaleDateString(lang, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  else if (specificity == "month")
    return date.toLocaleDateString(lang, {
      year: "numeric",
      month: "long",
    });
  else if (specificity == "year")
    return date.toLocaleDateString(lang, {
      year: "numeric",
    });
  else if (specificity == "none") return "unknown";
};
