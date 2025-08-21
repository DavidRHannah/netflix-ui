import FAQDropdown from "./FaqDropdown";
import FaqData from "./faq_data.json";

interface FaqEntryI {
  question: string;
  answer: string;
}

export default function Faq() {
  const faqEntries: FaqEntryI[] = FaqData.faqData;

  return (
    <div className="reasons-to-join mt-12 relative items-center flex flex-col w-full max-w-6xl">
      <div className="faq-text text-white font-semibold text-2xl md:text-3xl self-start mb-6">
        Frequently Asked Questions
      </div>
      <div className="faq-container w-full grid grid-cols-1 gap-2 text-white">
        {faqEntries.map((faq, index) => (
          <FAQDropdown
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </div>
  );
}
