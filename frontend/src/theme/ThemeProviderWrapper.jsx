import React, { useMemo, useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// 🔹 Create a context to share theme mode and toggler
const ColorModeContext = createContext({
  mode: "light",
  toggleMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export default function ThemeProviderWrapper({ children }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const stored = typeof window !== "undefined" ? localStorage.getItem("mui-theme") : null;
  const [mode, setMode] = useState(stored || (prefersDark ? "dark" : "light"));

  useEffect(() => {
    localStorage.setItem("mui-theme", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            light: "#757ce8",
            main: "#3f51b5",
            dark: "#6573c3",
            contrastText: "#fff",
          },
          secondary: {
            light: "#2a3eb1",
            main: "#3d5afe",
            dark: "#637bfe",
            contrastText: "#000",
          },
        },
        components: {
          MuiAppBar: { defaultProps: { elevation: 1 } },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}
