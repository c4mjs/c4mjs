import "@fontsource/shadows-into-light";
import "@fontsource/montserrat-subrayada";
import "@fontsource/roboto-flex";

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
  defaultFontStyle: {
    fontFamily: "Roboto Flex",
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
