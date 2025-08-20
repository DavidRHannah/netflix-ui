import Popcorn from "../../assets/popcorn.svg?react";

export default function AdBanner() {
  return (
    <div className="flex justify-center hover:scale-105 relative transition-transform duration-300">
      <div className="ad-banner w-min relative flex gap-1 md:gap-4 items-center justify-center">
        <div className="popcorn-container absolute -left-14 -top-10 md:left-0 md:relative md:-top-2">
          <Popcorn className="popcorn scale-80 md:scale-100" />
        </div>
        <div className="banner-text-container w-min bg-[linear-gradient(91deg,rgba(39,23,51,0.6),rgba(21,26,63,0.6))] hover:bg-[linear-gradient(91deg,rgba(44,28,56,1.0),rgba(26,31,68,1.0))] transition-colors duration-300 px-8 py-2 rounded-2xl gap-4 flex-col md:flex-row flex md:justify-between items-center">
          <div className="banner-left-container flex flex-col flex-nowrap justify-center items-start">
            <span className="text-white text-nowrap font-semibold text-lg lg:text-xl xl:text-2xl">
              The Netflix you love for just $7.99.
            </span>
            <span className="text-white text-nowrap text-sm lg:text-base xl:text-lg">
              Get our most affordable, ad-supported plan.
            </span>
          </div>
          <div className="banner-right-container">
            <button className="border border-black bg-gray-700 rounded px-4 py-1.5 hover:bg-gray-600 duration-300 transition-colors cursor-pointer">
              <span className="text-white text-bold text-nowrap text-md xl:text-lg">
                Learn More
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
