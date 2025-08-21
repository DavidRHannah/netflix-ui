import { useState } from "react";
import LanguagesJSON from "./languages.json";
import { Translate, ArrowDropDown } from "@mui/icons-material";
import { useLanguage } from "../../contexts/LanguageContext";
import type { LanguageI } from "./types";

export default function LanguageDropdown() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const { currentLanguage, changeLanguage } = useLanguage();

  const languages = LanguagesJSON;

  function handleDropdownClick() {
    setDropdownActive(!dropdownActive);
  }

  async function handleLanguageSelect(selectedLanguage: LanguageI) {
    await changeLanguage(selectedLanguage);
    setDropdownActive(false);
  }

  return (
    <div className="dropdown relative w-fit">
      <button
        onClick={handleDropdownClick}
        className="language-dropdown cursor-pointer bg-black/90 font-base border-1 flex justify-center items-center gap-1 border-white px-2 py-1 text-white opacity-70 rounded-sm"
      >
        <Translate className="!text-base" />
        <span className="hidden sm:block">{currentLanguage.name}</span>
        <ArrowDropDown />
      </button>
      {dropdownActive && (
        <div className="dropdown-options w-full absolute bg-black/90 font-base border-1 flex flex-col justify-center items-center gap-1 border-white p-0 text-white opacity-50 rounded-sm">
          {languages.map((lang) => (
            <button
              key={lang.abbr}
              onClick={() => handleLanguageSelect(lang)}
              className="hover:bg-white/10 opacity-90 cursor-pointer text-white px-0 pl-2 py-1 w-full text-left"
            >
              <span className="hidden sm:block">{lang.name}</span>
              <span className="block sm:hidden first-letter:uppercase">{lang.abbr}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}