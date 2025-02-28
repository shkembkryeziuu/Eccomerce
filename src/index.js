import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

ReactDOM.render(
  <LanguageProvider>
    <App />
  </LanguageProvider>,
  document.getElementById("root")
);
