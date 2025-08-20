import { KeyboardArrowRight } from "@mui/icons-material";

export default function CallToActionInput() {
  return (
    <div className="flex flex-col text-center justify-center items-center text-white gap-4 mt-6">
      <div className="mt-2 font-medium lg:text-xl lg:max-w-xl gap-2 max-w-96 xl:max-w-2xl">
        Ready to watch? Enter your email to create or restart your membership.
      </div>
      <div className="font-medium lg:text-xl flex flex-wrap justify-center items-center gap-2">
        <input
          className="email-input bg-black/80 w-xs md:w-xs xl:w-lg border-1 border-gray-500 rounded-sm px-3 py-3"
          placeholder="Email address"
        ></input>
        <button className="get-started bg-red-600 hover:bg-red-700 duration-300 transition-colors cursor-pointer rounded-sm flex items-center gap-2 px-3 py-3">
          <span className="font-bold pb-1"> Get Started</span>{" "}
          <span className="text-3xl flex items-center">
            <KeyboardArrowRight />
          </span>
        </button>
      </div>
    </div>
  );
}
