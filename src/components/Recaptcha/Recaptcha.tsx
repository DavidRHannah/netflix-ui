import { useLanguage } from "../../contexts/LanguageContext";

export default function Recaptcha() {
  const { t } = useLanguage();
  return (
    <div className="captcha text-gray-500 text-sm">
      {t("footer.recaptcha")}{" "}
      <a href="#" className="underline text-blue-500 hover:text-blue-800">
        {t("footer.learnMore")}
      </a>
      .
    </div>
  );
}
