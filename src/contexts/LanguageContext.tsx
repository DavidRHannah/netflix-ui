import React, { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";
import type { LanguageI } from "../components/LanguageDropdown/types";

interface LanguageContextType {
  currentLanguage: LanguageI;
  changeLanguage: (language: LanguageI) => Promise<void>;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const languageMap: Record<string, LanguageI> = {
  en: { name: "English", abbr: "en" },
  es: { name: "Español", abbr: "es" },
  fr: { name: "Français", abbr: "fr" },
  de: { name: "Deutsche", abbr: "de" },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const { i18n, t } = useTranslation();

  const getCurrentLanguage = (): LanguageI => {
    return languageMap[i18n.language] || languageMap.en;
  };

  const changeLanguage = async (language: LanguageI): Promise<void> => {
    await i18n.changeLanguage(language.abbr);
  };

  const value: LanguageContextType = {
    currentLanguage: getCurrentLanguage(),
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
