import { MD3DarkTheme } from "react-native-paper";
import { DarkTheme as TemaOscuroNavegacion } from "@react-navigation/native";

export const temaPaper = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#5b9bff",
    onPrimary: "#06142e",
    primaryContainer: "#1f3d78",
    onPrimaryContainer: "#dbe7ff",
    secondaryContainer: "#1d3a6b",
    onSecondaryContainer: "#dbe7ff",
    background: "#0a1428",
    surface: "#122244",
    surfaceVariant: "#1a2f5c",
    onSurface: "#eaf0ff",
    onSurfaceVariant: "#aebbe0",
    outline: "#4a5f96",
    elevation: {
      ...MD3DarkTheme.colors.elevation,
      level1: "#122244",
      level2: "#152849",
      level3: "#182d4f",
      level4: "#1a3053",
      level5: "#1c3357",
    },
  },
};

export const temaNavegacion = {
  ...TemaOscuroNavegacion,
  colors: {
    ...TemaOscuroNavegacion.colors,
    primary: "#5b9bff",
    background: "#0a1428",
    card: "#0e1b38",
    text: "#eaf0ff",
    border: "#1c2f5a",
    notification: "#5b9bff",
  },
};