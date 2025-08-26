import { createFileRoute, Navigate } from "@tanstack/react-router";
import BackgroundWrapper from "../components/BackgroundWrapper/BackgroundWrapper";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { z } from "zod";
import { type SignUpI } from "../components/SignUpForm/SignUpForm";
import { useAuth } from "../contexts/AuthContext";

const signupSearchSchema = z.object({
  prefilledEmail: z.string().optional(),
});

export const Route = createFileRoute("/signup")({
  component: SignUp,
  validateSearch: signupSearchSchema,
});

function SignUp() {
  const { isAuthenticated } = useAuth();
  const { prefilledEmail }: SignUpI = Route.useSearch();

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="bg-black">
      <BackgroundWrapper className="flex flex-col">
        <NavBar showLanguageDropdown={true} showSignIn={false} />
        <SignUpForm prefilledEmail={prefilledEmail} />
      </BackgroundWrapper>
      <Footer />
      <div className="empty-space h-30"></div>
    </div>
  );
}
