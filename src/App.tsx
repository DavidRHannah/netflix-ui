import AdBanner from "./components/AdBanner/AdBanner";
import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div className="bg-black">
      <Hero />
      <div className="product-content w-full h-96 mt-2">
        <AdBanner />
      </div>
    </div>
  );
}

export default App;
