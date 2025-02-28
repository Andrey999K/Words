export const getDarkTheme = () => {
  const darkTheme = localStorage.getItem("dark");
  if (darkTheme === null) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return JSON.parse(darkTheme);
};