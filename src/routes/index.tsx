import { createFileRoute } from "@tanstack/react-router";
import AdBanner from "../components/AdBanner/AdBanner";
import CallToActionInput from "../components/CallToAction/CallToActionInput";
import Faq from "../components/Faq/Faq";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import ReasonsToJoin from "../components/ReasonsToJoin/ReasonsToJoin";
import TrendingMovies from "../components/TrendingMovies/TrendingMovies";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="bg-black flex flex-col items-center overflow-x-hidden">
      <Hero />
      <div className="product-content flex flex-col items-center w-full mt-2 ml-2 h-full">
        <AdBanner />
        <TrendingMovies />
        <ReasonsToJoin />
        <Faq />
        <CallToActionInput />
      </div>
      <Footer />
      <div className="empty-space h-30"></div>
    </div>
  );
}
