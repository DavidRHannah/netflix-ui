import FooterData from "./footer_data.json";

interface FooterDataI {
  text: string;
  href: string;
}

export default function Footer() {
  const footerData: FooterDataI[][] = FooterData.footerData;

  return (
    <div className="footer-container flex flex-col mt-6 gap-4 w-full max-w-6xl mx-auto px-4">
      <div className="text-gray-300 self-start">
        Questions? Call 1-866-952-4456
      </div>
      <div className="footer items-start max-w-6xl underline text-gray-300 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
        {footerData.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`group-${groupIndex + 1} flex flex-col gap-4`}
          >
            {group.map((link, linkIndex) => (
              <a
                key={linkIndex}
                href={link.href}
                className="text-sm hover:text-white transition-colors duration-200"
              >
                {link.text}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
