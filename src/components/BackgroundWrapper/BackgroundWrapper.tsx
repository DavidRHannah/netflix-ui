import React from "react";
import Background from "/landing/background.jpg";

interface BackgroundI {
  className?: string;
  children?: React.ReactNode;
}

export default function BackgroundWrapper({
  children,
  className,
}: BackgroundI) {
  return (
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
        minHeight: "min(90vh, 70rem)",
      }}
      className={`hero-container bg-cover bg-center pb-32 relative w-full h-full py-2 px-4 md:px-32 lg:px-64 ${className}`}
    >
      {children}
    </div>
  );
}
