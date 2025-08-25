import { KeyboardArrowRight } from "@mui/icons-material";
import { useLanguage } from "../../contexts/LanguageContext";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export default function CallToActionInput() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [prefilledEmail, setEmail] = useState("");

  const handleGetStarted = () => {
    if (prefilledEmail.trim()) {
      navigate({
        to: "/signup",
        search: { prefilledEmail: prefilledEmail.trim() }
      });
    } else {
      navigate({ to: "/signup" });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleGetStarted();
    }
  };
  
  return (
    <div className="flex flex-col text-center justify-center items-center text-white gap-4 mt-6">
      <div className="mt-2 font-medium lg:text-xl lg:max-w-xl gap-2 max-w-96 xl:max-w-2xl">
        {t("cta.readyToWatch")}
      </div>
      <div className="font-medium lg:text-xl flex flex-wrap justify-center items-center gap-2">
        <input
          className="email-input bg-black/80 w-xs md:w-xs xl:w-lg border-1 border-gray-500 rounded-sm px-3 py-3"
          placeholder={t("cta.emailPlaceholder")}
          value={prefilledEmail}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyPress}
          type="email"
        />
        <button 
          className="get-started bg-red-600 hover:bg-red-700 duration-300 transition-colors cursor-pointer rounded-sm flex items-center gap-2 px-3 py-3"
          onClick={handleGetStarted}
        >
          <span className="font-bold pb-1">{t("cta.getStarted")}</span>{" "}
          <span className="text-3xl flex items-center">
            <KeyboardArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}
