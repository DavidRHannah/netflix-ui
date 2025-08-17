import Background from "/landing/background.jpg";
// import Logo from '/landing/logo-white.png';
import NavBar from "./components/NavBar/NavBar";
import CallToAction from "./components/CallToAction/CallToAction";

function App() {
  return (
    <div className="h-screen bg-black">
      <div
        style={{
          backgroundImage: `
            linear-gradient(
              180deg, 
              rgba(0, 0, 0, 0.85) 0%, 
              rgba(0, 0, 0, 0.7) 50%,
              rgba(0, 0, 0, 0.65) 100%
            ),
            url(${Background})
          `,
        }}
        className="hero-bg-container bg-cover"
      >
        <div
          className={`hero-container flex flex-col justify-start text-center gap-24 h-screen py-2 px-4 md:px-32 lg:px-64`}
        >
          <NavBar />
          <CallToAction />
        </div>
      </div>
    </div>
  );
}

export default App;
