export const removeFileExtension = (fileName: string): string | null =>
  fileName.split(".").shift() ?? null;
