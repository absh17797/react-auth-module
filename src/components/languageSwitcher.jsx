import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, ButtonGroup } from "react-bootstrap";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");

  const languageMap = {
    en: { name: "English", flag: "🇺🇸" },
    fr: { name: "Français", flag: "🇫🇷" },
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng); // Update state to trigger re-render
  };

  // Listen for language change events to update state dynamically
  useEffect(() => {
    const handleLanguageChange = () => setCurrentLanguage(i18n.language);
    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <Dropdown as={ButtonGroup} className="d-flex justify-content-center mt-3">
      <Dropdown.Toggle variant="primary" id="language-dropdown">
        {languageMap[currentLanguage]?.flag} {languageMap[currentLanguage]?.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Object.keys(languageMap).map((lng) => (
          <Dropdown.Item key={lng} onClick={() => changeLanguage(lng)} active={currentLanguage === lng}>
            {languageMap[lng].flag} {languageMap[lng].name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
