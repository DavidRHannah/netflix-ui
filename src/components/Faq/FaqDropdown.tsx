import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface FAQDropdownProps {
  question: string;
  answer: string;
}

export default function FAQDropdown({ question, answer }: FAQDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-dropdown bg-gray-800 hover:bg-gray-700 transition-colors duration-200">
      <button
        onClick={toggleDropdown}
        className="top w-full flex justify-between items-center p-4 text-left focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-inset"
        aria-expanded={isOpen}
        aria-controls="faq-content"
      >
        <div className="faq-dropdown-text text-white text-lg md:text-xl font-medium pr-4">
          {question}
        </div>
        <div className="faq-dropdown-icon-container text-white flex-shrink-0">
          {isOpen ? (
            <RemoveIcon fontSize="large" />
          ) : (
            <AddIcon fontSize="large" />
          )}
        </div>
      </button>

      <div
        id="faq-content"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 text-white text-base md:text-lg leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}
