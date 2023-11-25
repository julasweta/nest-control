// Файл transformers.ts
export const trimLowercaseWithoutSpaces = ({
  value,
}: {
  value: string;
}): string => {
  return value.trim().toLowerCase().replace(/\s/g, '');
};
