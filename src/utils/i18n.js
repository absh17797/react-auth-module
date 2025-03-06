import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpApi) // Load translation files dynamically
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next) // Bind i18next to React
  .init({
    fallbackLng: "en",
    debug: true, // Enable console logs for debugging
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}.json", // Ensure the correct path
    },
    react: {
      useSuspense: false, // Disable suspense mode
    },
  });

console.log("Loaded languages:", i18n.languages); // Debugging

export default i18n;
