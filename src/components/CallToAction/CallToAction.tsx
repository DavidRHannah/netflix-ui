import CallToActionInput from "./CallToActionInput";

export default function CallToAction() {
  return (
    <div className="mt-36 flex flex-col justify-center text-center items-center text-white">
      <div className="font-medium lg:text-xl lg:max-w-xl flex flex-col items-center gap-2 max-w-96 xl:max-w-2xl">
        <div className="text-4xl lg:text-5xl lg:font-bold xl:text-6xl font-extrabold text-center">
          Unlimited movies, TV shows, and more
        </div>
        <div className="lg:font-semibold">Starts at $7.99. Cancel anytime.</div>
      </div>
      <CallToActionInput />
    </div>
  );
}
