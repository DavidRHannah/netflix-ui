import Netflix from "../../assets/netflix.svg?react";
import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { useLanguage } from "../../contexts/LanguageContext";

export default function NavBar() {
  const { t } = useLanguage();

  return (
    <nav className="navbar flex items-center justify-between p-4 h-20">
      <div className="logo-container p-0 lg:w-36 w-24 h-auto">
        <Netflix fill="red" stroke="red" strokeWidth={0} />
      </div>
      <div className="nav-buttons flex gap-3 items-center">
        <LanguageDropdown />
        <button className="sign-in bg-red-600 hover:bg-red-700 text-nowrap duration-300 transition-colors cursor-pointer text-sm font-semibold px-4 py-2 text-center text-white rounded-sm">
          {t("nav.signIn")}
        </button>
      </div>
    </nav>
  );
}
