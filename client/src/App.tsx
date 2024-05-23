import React from "react";
import "./App.css";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";
import getTheme from "./utils/theme";
import ColorModeContext from "./contexts/themeContext";
import AppRouter from "./Routes";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { store } from "./store";
const persistor = persistStore(store);

function App() {
  const localMode = localStorage.getItem("mode") as "light" | "dark";

  const [mode, setMode] = React.useState<"light" | "dark">(
    localMode || "light"
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("mode", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = React.useMemo(
    () => responsiveFontSizes(createTheme(getTheme(mode))),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <CssBaseline />
            <AppRouter />
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
