import { useContext } from "react";
import { Switch } from "antd";
import { ThemeContext } from "../App.tsx";

export const SwitchTheme = () => {
  const theme = useContext(ThemeContext);

  const handleChange = (checked: boolean): void => {
    if (theme?.setDarkTheme) {
      theme.setDarkTheme(checked);
      localStorage.setItem("dark", JSON.stringify(checked));
      const body = document.querySelector("body")!;
      body.classList.toggle("dark-theme");
    }
  };

  return (
    <Switch checked={theme?.darkTheme} onChange={handleChange} />
  );
};