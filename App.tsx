import { Div, Text, ThemeProvider, useTheme } from "react-native-magnus";
import ThemeSwitcher from "./components/ThemeSwitcher";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Navbar from "expo-navigation-bar";

import { darkTheme, getThemeName, lightTheme } from "./constants/THEMES";
import { Platform } from "react-native";

export default function App() {
  const [themeName, setThemeName] = useState("light");

  useEffect(() => {
    async function getTheme() {
      getThemeName()
        .then((theme) => {
          setThemeName(theme);
        })
        .catch((err) => console.error(err));
    }
    getTheme();
    if (Platform.OS == "android") {
      Navbar.setPositionAsync("absolute");
      Navbar.setBehaviorAsync("overlay-swipe");
      Navbar.setVisibilityAsync("hidden");
      Navbar.setBackgroundColorAsync("transparent");
    }
  }, []);

  return (
    <ThemeProvider theme={themeName === "light" ? lightTheme : darkTheme}>
      <StatusBar style={themeName === "dark" ? "light" : "dark"} />
      <Div bg="background" flex={1} p={20} pt={50}>
        <Div flexDir="row" alignItems="center">
          <ThemeSwitcher />
        </Div>
      </Div>
    </ThemeProvider>
  );
}
