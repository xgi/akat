export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatReleaseDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
