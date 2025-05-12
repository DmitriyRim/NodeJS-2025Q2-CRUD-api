export const isValidUuid = (userId: string): boolean => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
    userId,
  );
};

export const parseRequestBody = (str: string) => {
  try {
    return JSON.parse(str)
  } catch {
    return {}
  }
}