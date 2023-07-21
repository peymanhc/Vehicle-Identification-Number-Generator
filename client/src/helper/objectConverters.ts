export const convertToArray = (object: any) => {
  return Object.entries(object).map(([name, value]) => ({ name, value }));
};
