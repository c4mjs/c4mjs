import "@fontsource/shadows-into-light";
import "@fontsource/montserrat-subrayada";
import "@fontsource/roboto-flex";
import "@fontsource/open-sans";

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { createTheme, initializeIcons, ThemeProvider } from "@fluentui/react";
import { HashRouter as Router } from "react-router-dom";
import { config } from "./config";

initializeIcons();

if (config.isDev) localStorage.debug = "c4mjs:*";

const myTheme = createTheme({
  palette: {
    themePrimary: "#349698",
    themeLighterAlt: "#f4fbfb",
    themeLighter: "#d5eeef",
    themeLight: "#b4e0e0",
    themeTertiary: "#75c1c2",
    themeSecondary: "#45a4a5",
    themeDarkAlt: "#2f888a",
    themeDark: "#287374",
    themeDarker: "#1d5556",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
