export const formatDate = (
  date: Date,
  specificity: "year" | "month" | "day" | "none",
) => {
  if (specificity == "day")
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  else if (specificity == "month")
    return date.toLocaleDateString("en-us", {
      year: "numeric",
      month: "long",
    });
  else if (specificity == "year")
    return date.toLocaleDateString("en-us", {
      year: "numeric",
    });
  else if (specificity == "none") return "unknown";
};
