import LanguageDropdown from "../LanguageDropdown/LanguageDropdown";
import { useTranslation } from "react-i18next";
import Recaptcha from "../Recaptcha/Recaptcha";

interface FooterLink {
  text: string;
  href: string;
}

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = t("footer.links", {
    returnObjects: true,
  }) as FooterLink[][];

  return (
    <div className="footer-container flex flex-col mt-6 gap-4 w-full max-w-6xl mx-auto px-4">
      <div className="text-gray-300 self-start">{t("footer.contact")}</div>
      <div className="footer items-start max-w-6xl text-gray-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
        {footerLinks.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`group-${groupIndex + 1} flex flex-col gap-4`}
          >
            {group.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.href}
                className="text-sm underline hover:text-white transition-colors duration-200"
              >
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>
      <LanguageDropdown />
      <Recaptcha />
    </div>
  );
}
