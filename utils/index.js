export const sortByDate = (a, b) => {
  return new Date(b.formatter.date) - new Date(a.formatter.date);
};
