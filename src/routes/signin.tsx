import { createFileRoute } from "@tanstack/react-router";
import Footer from "../components/Footer/Footer";
import BackgroundWrapper from "../components/BackgroundWrapper/BackgroundWrapper";
import NavBar from "../components/NavBar/NavBar";
import SignInForm from "../components/SignInForm/SignInForm";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  return (
    <div className="bg-black">
      <BackgroundWrapper className="flex flex-col">
        <NavBar showLanguageDropdown={true} showSignIn={false} />
        <SignInForm />
      </BackgroundWrapper>
      <Footer />
      <div className="dead-space h-30"></div>
    </div>
  );
}
