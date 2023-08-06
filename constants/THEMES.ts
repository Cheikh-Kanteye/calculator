import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import { ThemeType } from "react-native-magnus";

export const darkTheme: ThemeType = {
  name: "dark",
  colors: {
    primary: "#6dce58",
    background: "#2a2a2a",
    btn: "#414141",
    largeBtn: "#171717",
    text: "#ffffff",
  },
};

export const lightTheme = {
  name: "light",
  colors: {
    primary: "#6dcf58",
    background: "#ffffff",
    btn: "#eaeaea",
    largeBtn: "#bababa",
    text: "#2a2a2a",
  },
};

export const { width, height } = Dimensions.get("window");

export const KeyboardHeight = height > 720 ? height * 0.61 : height * 0.7;

export const saveThemeName = async (themeName: string) => {
  AsyncStorage.setItem("@theme", themeName);
};

export const getThemeName = async () => {
  const themeName = await AsyncStorage.getItem("@theme");
  return themeName ?? "light";
};
