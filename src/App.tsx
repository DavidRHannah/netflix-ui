import AdBanner from "./components/AdBanner/AdBanner";
import Hero from "./components/Hero/Hero";
import ReasonsToJoin from "./components/ReasonsToJoin/ReasonsToJoin";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";

function App() {
  return (
    <div className="bg-black overflow-x-hidden">
      <Hero />
      <div className="product-content flex flex-col items-center w-full mt-2 ml-2 h-full">
        <AdBanner />
        <TrendingMovies />
        <ReasonsToJoin />
      </div>
    </div>
  );
}

export default App;
