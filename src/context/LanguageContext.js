import { createContext, useState, useContext } from "react";
import translations from "../locales/translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "al" : "en"));
  };

  const t = (key) => {
    const keys = key.split(".");
    let translation = translations[language];
    keys.forEach((k) => {
      translation = translation[k] || key;
    });
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
