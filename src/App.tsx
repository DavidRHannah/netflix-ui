import AdBanner from "./components/AdBanner/AdBanner";
import Hero from "./components/Hero/Hero";
import TrendingMovies from "./components/TrendingMovies/TrendingMovies";

function App() {
  return (
    <div className="bg-black overflow-x-hidden">
      <Hero />
      <div className="product-content w-full h-96 mt-2 mx-3">
        <AdBanner />
        <TrendingMovies />
      </div>
    </div>
  );
}

export default App;
