import { KeyboardArrowRight } from "@mui/icons-material";

export default function CallToAction() {
  return (
    <div className="mt-36 flex flex-col justify-center text-center items-center text-white">
      <div className="font-medium lg:text-xl lg:max-w-xl flex flex-col items-center gap-2 max-w-96 xl:max-w-2xl">
        <div className="text-4xl lg:text-5xl lg:font-bold xl:text-6xl font-extrabold text-center">
          Unlimited movies, TV shows, and more
        </div>
        <div className="lg:font-semibold">Starts at $7.99. Cancel anytime.</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-6">
        <div className="mt-2 font-medium lg:text-xl lg:max-w-xl gap-2 max-w-96 xl:max-w-2xl">
          Ready to watch? Enter your email to create or restart your membership.
        </div>
        <div className="font-medium lg:text-xl flex flex-wrap justify-center items-center gap-2">
          <input
            className="email-input bg-black/80 border-1 border-grey rounded-sm px-3 py-3"
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
    </div>
  );
}
