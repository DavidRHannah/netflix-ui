import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff, Error } from "@mui/icons-material";
import Recaptcha from "../Recaptcha/Recaptcha";
import { Link } from '@tanstack/react-router';
import { useLanguage } from "../../contexts/LanguageContext";

export interface SignUpI {
  prefilledEmail: string;
}

export default function SignUpForm({prefilledEmail}: SignUpI) {
  const { t } = useLanguage();
  const [email, setEmail] = useState(prefilledEmail || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(()=>{
    if (prefilledEmail === "")
      return;
    if (!validateEmail(prefilledEmail))
      setEmailError(t('signup.emailError') || "Please enter a valid email address.");
    else
      setEmailError("");
  }, [prefilledEmail, t])

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (value && !validateEmail(value)) {
      setEmailError(t("signup.emailError") || "Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value && !validatePassword(value)) {
      setPasswordError(t("signup.passwordError") || "Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }

    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError(t("signup.confirmPasswordError") || "Passwords do not match.");
    } else if (confirmPassword) {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value && value !== password) {
      setConfirmPasswordError(t("signup.confirmPasswordError") || "Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);

    if (value && !validateName(value)) {
      setNameError(t("signup.nameError") || "Please enter a valid first name.");
    } else {
      setNameError("");
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
  };

  const handleSubmit = () => {
    let hasError = false;

    if (!validateEmail(email)) {
      setEmailError(t("signup.emailError") || "Please enter a valid email address.");
      hasError = true;
    }

    if (!validatePassword(password)) {
      setPasswordError(t("signup.passwordError") || "Password must be at least 8 characters long.");
      hasError = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(t("signup.confirmPasswordError") || "Passwords do not match.");
      hasError = true;
    }

    if (!validateName(firstName)) {
      setNameError(t("signup.nameError") || "Please enter a valid first name.");
      hasError = true;
    }

    if (!agreeToTerms) {
      hasError = true;
    }

    if (hasError) return;

    console.log("Sign up attempt:", { 
      email, 
      password, 
      firstName, 
      lastName, 
      agreeToTerms 
    });
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm flex flex-col self-center gap-4 p-8 rounded-lg w-full max-w-md">
      <h1 className="text-white text-3xl font-semibold mb-2">
        {t("signup.header") || "Sign Up"}
      </h1>
      
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder={t("signup.firstNamePlaceholder") || "First Name"}
            className={`w-full bg-gray-900/40 text-white placeholder-gray-400 p-4 rounded border transition-colors
                ${firstName ? (nameError ? "border-red-500" : "border-green-500") : "border-gray-600"}
                focus:border-white focus:outline-none`}
          />
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder={t("signup.lastNamePlaceholder") || "Last Name"}
            className="w-full bg-gray-900/40 text-white placeholder-gray-400 p-4 rounded border border-gray-600 focus:border-white focus:outline-none transition-colors"
          />
        </div>
      </div>
      {nameError && (
        <div className="flex items-center mt-1 text-red-500 text-sm">
          <span>
            <Error />
          </span>
          {nameError}
        </div>
      )}

      <div>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder={t("signup.emailPlaceholder") || "Email address"}
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

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          placeholder={t("signup.passwordPlaceholder") || "Create password"}
          className={`w-full bg-gray-900/40 text-white placeholder-gray-400 p-4 pr-12 rounded border transition-colors
              ${password ? (passwordError ? "border-red-500" : "border-green-500") : "border-gray-600"}
              focus:border-white focus:outline-none`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {password !== "" && ((showPassword) ? (
            <VisibilityOff className="text-xl" />
          ) : (
            <Visibility className="text-xl" />
          ))}
        </button>
        {passwordError && (
          <div className="flex items-center mt-2 text-red-500 text-sm">
            <span>
              <Error />
            </span>
            {passwordError}
          </div>
        )}
      </div>

      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder={t("signup.confirmPasswordPlaceholder") || "Confirm password"}
          className={`w-full bg-gray-900/40 text-white placeholder-gray-400 p-4 pr-12 rounded border transition-colors
              ${confirmPassword ? (confirmPasswordError ? "border-red-500" : "border-green-500") : "border-gray-600"}
              focus:border-white focus:outline-none`}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
        >
          {confirmPassword !== "" && ((showConfirmPassword) ? (
            <VisibilityOff className="text-xl" />
          ) : (
            <Visibility className="text-xl" />
          ))}
        </button>
        {confirmPasswordError && (
          <div className="flex items-center mt-2 text-red-500 text-sm">
            <span>
              <Error />
            </span>
            {confirmPasswordError}
          </div>
        )}
      </div>

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
          className="w-4 h-4 mt-1 border border-gray-900 accent-white hover:cursor-pointer rounded focus:ring-white focus:ring transition-all duration-300"
        />
        <label
          htmlFor="terms"
          className="text-white text-sm cursor-pointer select-none leading-relaxed"
        >
          {t("signup.agreeToTerms") || "I agree to the"}{" "}
          <button className="text-blue-400 hover:underline">
            {t("signup.termsOfService") || "Terms of Service"}
          </button>{" "}
          {t("signup.and") || "and"}{" "}
          <button className="text-blue-400 hover:underline">
            {t("signup.privacyPolicy") || "Privacy Policy"}
          </button>
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!agreeToTerms}
        className={`w-full font-bold py-3 rounded transition-colors duration-200 ${
          agreeToTerms 
            ? "bg-red-600 hover:bg-red-700 hover:cursor-pointer text-white" 
            : "bg-gray-600 cursor-not-allowed text-gray-400"
        }`}
      >
        {t("signup.submit") || "Create Account"}
      </button>

      <div className="text-gray-400 text-sm text-center">
        {t("signup.alreadyHaveAccount") || "Already have an account?"}
        <Link 
          to='/signin' 
          className="text-white hover:underline ml-1 font-medium"
        >
          {t("signup.signinCta") || "Sign in now."}
        </Link>
      </div>

      <Recaptcha />
    </div>
  );
}