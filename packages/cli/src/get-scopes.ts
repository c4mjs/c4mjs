export const getScopes = (s: string) => {
  const scopeParts = s.split(".");
  return scopeParts
    .map((it, index) => scopeParts.slice(0, index + 1))
    .map((it) => it.join("."))
    .reverse();
};
