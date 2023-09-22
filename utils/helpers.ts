export const rawPhone = (phone: string): string => {
  return phone
    .replaceAll(/\s/gi, "")
    .replaceAll("-", "")
    .replace("(", "")
    .replace(")", "");
};

export const toCurrency = (
  n: number,
  currency = "RUB",
  maximumFractionDigits = 0
): string => {
  return Intl.NumberFormat("ru", {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(n);
};
