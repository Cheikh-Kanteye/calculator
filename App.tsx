import { Div, Text, ThemeProvider, useTheme } from "react-native-magnus";
import { ThemeSwitcher, Keyboard } from "./components";
import { StatusBar, StatusBarStyle } from "expo-status-bar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Navbar from "expo-navigation-bar";

import {
  KeyboardHeight,
  darkTheme,
  getThemeName,
  height,
  lightTheme,
  width,
} from "./constants/THEMES";
import { Platform } from "react-native";

export default function App() {
  const [themeName, setThemeName] = useState("light");
  const [operation, setOperation] = useState("24*12-435=");
  const [result, setResult] = useState("24.45");

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
      <Div bg="background" flex={1} pt={50}>
        <ThemeSwitcher />
        <Div
          h={height - KeyboardHeight}
          w={width - 90}
          alignSelf="flex-end"
          borderBottomWidth={2}
          justifyContent="flex-end"
          alignItems="flex-end"
          mb={20}
          pb={20}
          borderBottomColor="btn"
          mr={16}
        >
          <Text color="text" fontSize={20} mb={16} fontWeight="bold">
            {operation}
          </Text>
          <Text color="primary" fontSize={48} fontWeight="bold">
            {result}
          </Text>
        </Div>
        <Keyboard
          setOperation={setOperation}
          operation={operation}
          setResult={setResult}
        />
      </Div>
    </ThemeProvider>
  );
}
