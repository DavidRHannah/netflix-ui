import Hero from "./components/Hero/Hero";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <div className="product-content w-full h-96 text-white">
        Product Content
      </div>
    </div>
  );
}

export default App;
