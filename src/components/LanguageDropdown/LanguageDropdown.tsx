import { useState } from "react";
import LanguagesJSON from "./languages.json";
import { Translate, ArrowDropDown } from "@mui/icons-material";
import type { LanguageI } from "../LanguageDropdown/types";

export default function LanguageDropdown() {
  const [language, setLanguage] = useState("English");
  const [dropdownActive, setDropdownActive] = useState(false);

  const languages = LanguagesJSON;

  function handleDropdownClick() {
    setDropdownActive(!dropdownActive);
  }

  function handleLanguageSelect(selectedLanguage: LanguageI) {
    setLanguage(selectedLanguage.name);
    setDropdownActive(false);
  }

  return (
    <div className="dropdown relative w-fit">
      <button
        onClick={handleDropdownClick}
        className="language-dropdown cursor-pointer bg-black/90 font-base border-1 flex justify-center items-center gap-1 border-white px-2 py-1 text-white opacity-70 rounded-sm"
      >
        <Translate className="!text-base" /> <span>{language}</span>{" "}
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
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
