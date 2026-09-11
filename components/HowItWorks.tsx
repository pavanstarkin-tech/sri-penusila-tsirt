import React from "react";
import { Lightbulb, Shirt, Printer, Gift, ArrowRight } from "lucide-react";
import { processSteps } from "@/data/services";

const stepIcons: Record<string, React.ReactNode> = {
  "01": <Lightbulb className="w-6 h-6" />,
  "02": <Shirt className="w-6 h-6" />,
  "03": <Printer className="w-6 h-6" />,
  "04": <Gift className="w-6 h-6" />
};

export default function HowItWorks() {
  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {processSteps.map((step, idx) => (
          <div
            key={step.step}
            className="flex flex-col items-center text-center relative group p-4 rounded-2xl transition-colors hover:bg-gray-50"
          >
            {/* Numbered Badge Circle */}
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-full bg-[#E11D2E] text-white flex items-center justify-center font-poppins font-extrabold text-base shadow-md group-hover:scale-110 transition-transform">
                {step.step}
              </div>
            </div>

            {/* Icon & Title */}
            <div className="text-gray-800 mb-2">
              {stepIcons[step.step] || <Lightbulb className="w-6 h-6" />}
            </div>

            <h3 className="font-poppins font-bold text-base text-[#0B0B0B] mb-1.5">
              {step.title}
            </h3>

            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              {step.description}
            </p>

            {/* Desktop Connector Arrow */}
            {idx < processSteps.length - 1 && (
              <div className="hidden lg:block absolute top-7 -right-3 text-gray-300 pointer-events-none">
                <ArrowRight className="w-5 h-5 text-gray-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
