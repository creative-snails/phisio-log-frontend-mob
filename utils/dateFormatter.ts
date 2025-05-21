export const formatDateStrict = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const formatDateToYMD = (date?: Date | null) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};
