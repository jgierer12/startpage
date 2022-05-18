export const truncate = (str, max = 70) => {
  if (str.length > max) {
    str = str.substring(0, max-3) + "...";
  }
  return str;
};
