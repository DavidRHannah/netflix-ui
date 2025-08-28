import NavBar from "../NavBar/NavBar";
import CallToAction from "../CallToAction/CallToAction";
import Curve from "../Curve/Curve";
import BackgroundWrapper from "../BackgroundWrapper/BackgroundWrapper";

export default function Hero() {
  return (
    <BackgroundWrapper>
      <NavBar showLanguageDropdown={true} showSignIn={true} />
      <CallToAction />
      <Curve />
    </BackgroundWrapper>
  );
}
