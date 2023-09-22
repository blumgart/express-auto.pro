export const rawPhone = (phone: string): string => {
  return phone
    .replaceAll(/\s/gi, "")
    .replaceAll("-", "")
    .replace("(", "")
    .replace(")", "");
};
