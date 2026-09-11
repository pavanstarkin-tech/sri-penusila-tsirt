import React from "react";

interface SectionHeadingProps {
  label: string;
  title: string;
  highlightText?: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  highlightText,
  description,
  align = "center",
  theme = "light",
  className = ""
}: SectionHeadingProps) {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  return (
    <div
      className={`mb-8 sm:mb-12 ${
        isCenter ? "text-center mx-auto max-w-2xl" : "text-left"
      } ${className}`}
    >
      {/* Red short line + uppercase red label */}
      <div
        className={`section-label mb-2 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        {label}
      </div>

      {/* Main Heading */}
      <h2
        className={`font-poppins font-extrabold text-2xl sm:text-3xl lg:text-[34px] leading-tight tracking-tight ${
          isDark ? "text-white" : "text-[#0B0B0B]"
        }`}
      >
        {title}{" "}
        {highlightText && (
          <span className="text-[#E11D2E]">{highlightText}</span>
        )}
      </h2>

      {/* Supporting description */}
      {description && (
        <p
          className={`font-montserrat text-xs sm:text-sm mt-2.5 leading-relaxed ${
            isDark ? "text-gray-300" : "text-[#555555]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
