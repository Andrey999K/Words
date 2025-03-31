import { theme } from "antd";

const { defaultAlgorithm, darkAlgorithm } = theme;

export const antdThemeConfig = (isDarkTheme: boolean) => ({
  algorithm: isDarkTheme ? darkAlgorithm : defaultAlgorithm,
  cssVar: true,
  token: {
    colorPrimary: "#267e10",
  },
});
