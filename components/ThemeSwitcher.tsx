import { useContext, useState } from "react";
import { StatusBar, Switch } from "react-native";
import { ThemeContext, Toggle, useTheme } from "react-native-magnus";
import { Entypo } from "@expo/vector-icons";
import { darkTheme, lightTheme, saveThemeName } from "../constants/THEMES";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const onToggle = () => {
    saveThemeName(theme.name === "dark" ? lightTheme.name! : darkTheme.name!);
    setTheme(theme.name === "dark" ? lightTheme : darkTheme);
  };

  return (
    <Entypo
      onPress={onToggle}
      style={{ marginLeft: 10 }}
      name={theme.name == "dark" ? "light-up" : "light-down"}
      color={theme.colors?.text}
      size={28}
    />
  );
};

export default ThemeSwitcher;
