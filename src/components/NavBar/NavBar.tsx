import { useState } from "react";
import Netflix from "../../assets/netflix.svg?react";
import { Translate, ArrowDropDown } from "@mui/icons-material";
import LanguagesJSON from "./languages.json";
import type { LanguageI } from "./types";

export default function NavBar() {
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
    <nav className="navbar flex items-center justify-between p-4 h-20">
      <div className="logo-container p-0 lg:w-36 w-24 h-auto">
        <Netflix fill="red" stroke="red" strokeWidth={0} />
      </div>
      <div className="nav-buttons flex gap-3 items-center">
        <div className="dropdown relative">
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
        <button className="sign-in bg-red-600 hover:bg-red-700 text-nowrap duration-300 transition-colors cursor-pointer text-sm font-semibold px-4 py-2 text-center text-white rounded-sm">
          Sign In
        </button>
      </div>
    </nav>
  );
}
