import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
import Recaptcha from "../Recaptcha/Recaptcha";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function SignInForm() {
  const { t } = useLanguage();
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [email, password]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,}$/;
    return emailRegex.test(email) || phoneRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError(
        t("signin.emailError") ||
          "Please enter a valid email or mobile number.",
      );
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setEmailError(
        t("signin.emailError") ||
          "Please enter a valid email or mobile number.",
      );
      return;
    }

    if (!password.trim()) {
      return;
    }

    await login(email, password);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm flex flex-col self-center gap-4 p-8 rounded-lg w-full max-w-md">
      <h1 className="text-white text-3xl font-semibold mb-2">
        {t("signin.header") || "Sign In"}
      </h1>

      {/* Global Error Display */}
      {error && (
        <div className="flex items-center p-4 mb-4 text-red-800 border border-red-300 rounded bg-red-50/10">
          <Error className="mr-2" />
          <span>{error.message}</span>
        </div>
      )}

      {/* Email Input */}
      <div>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
          placeholder={t("signin.emailPlaceholder") || "Email or mobile number"}
          className={`w-full bg-gray-900/40 text-white placeholder-gray-400 p-4 rounded border transition-colors
              ${email ? (emailError ? "border-red-500" : "border-green-500") : "border-gray-600"}
              focus:border-white focus:outline-none`}
        />
        {emailError && (
          <div className="flex items-center mt-2 text-red-500 text-sm">
            <span>
              <Error />
            </span>
            {emailError}
          </div>
        )}
      </div>

      {/* Password Input */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t("signin.passwordPlaceholder") || "Password"}
          className="w-full bg-gray-900/40 text-white placeholder-gray-400 p-4 pr-12 rounded border border-gray-600 focus:border-white focus:outline-none transition-colors"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {password !== "" &&
            (showPassword ? (
              <VisibilityOff className="text-xl" />
            ) : (
              <Visibility className="text-xl" />
            ))}
        </button>
      </div>

      {/* Sign In Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full font-bold py-3 rounded transition-colors duration-200 relative ${
          !loading
            ? "bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white"
            : "bg-gray-600 cursor-not-allowed text-gray-400"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            {t("signin.signingIn") || "Signing In..."}
          </div>
        ) : (
          t("signin.submit") || "Sign In"
        )}
      </button>

      <div className="text-center text-gray-400 text-lg font-semibold">
        {t("signin.or") || "OR"}
      </div>

      <button
        type="button"
        disabled={loading}
        className="w-full bg-gray-600/40 hover:bg-gray-600/50 hover:cursor-pointer text-white font-bold py-2 rounded transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t("signin.useCode") || "Use a Sign-In Code"}
      </button>

      <div className="text-center">
        <button className="text-white hover:cursor-pointer text-base underline">
          {t("signin.forgotPassword") || "Forgot password?"}
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="remember"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 border border-gray-900 accent-white hover:cursor-pointer rounded focus:ring-white focus:ring transition-all duration-300"
        />
        <label
          htmlFor="remember"
          className="text-white text-sm cursor-pointer select-none"
        >
          {t("signin.rememberMe") || "Remember me"}
        </label>
      </div>

      <div className="text-gray-400 text-sm">
        {t("signin.newToNetflix") || "New to Netflix?"}
        <Link
          to="/signup"
          className="text-white hover:underline ml-1 font-medium"
        >
          {t("signin.signupCta") || "Sign up now."}
        </Link>
      </div>

      <Recaptcha />
    </div>
  );
}
