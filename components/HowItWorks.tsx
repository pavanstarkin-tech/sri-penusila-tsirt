import React from "react";
import { Lightbulb, Shirt, Printer, Gift, ArrowRight, CheckCircle2 } from "lucide-react";
import { processSteps } from "@/data/services";

const stepIcons: Record<string, React.ReactNode> = {
  "01": <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />,
  "02": <Shirt className="w-5 h-5 sm:w-6 sm:h-6" />,
  "03": <Printer className="w-5 h-5 sm:w-6 sm:h-6" />,
  "04": <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
};

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* ============================================================ */}
      {/* DESKTOP CONNECTED TIMELINE (lg and above)                     */}
      {/* ============================================================ */}
      <div className="hidden lg:block relative py-4">
        {/* Horizontal background connector line */}
        <div className="absolute top-[48px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#E11D2E]/20 via-gray-200 to-[#E11D2E]/20 z-0" />
        
        <div className="grid grid-cols-4 gap-6 relative z-10">
          {processSteps.map((step, idx) => (
            <div
              key={step.step}
              className="flex flex-col items-center text-center group bg-white p-5 rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg hover:border-red-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Numbered Badge Circle */}
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-full bg-[#E11D2E] text-white flex items-center justify-center font-poppins font-extrabold text-base shadow-md group-hover:scale-110 transition-transform border-4 border-white ring-2 ring-red-100">
                  {step.step}
                </div>
              </div>

              {/* Icon */}
              <div className="p-2.5 rounded-xl bg-red-50 text-[#E11D2E] mb-3 group-hover:bg-[#E11D2E] group-hover:text-white transition-colors">
                {stepIcons[step.step] || <Lightbulb className="w-6 h-6" />}
              </div>

              {/* Title & Description */}
              <h3 className="font-poppins font-bold text-base text-[#0B0B0B] mb-1.5">
                {step.title}
              </h3>
              <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
                {step.description}
              </p>

              {/* Arrow indicator between steps */}
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-[40px] -right-3 text-[#E11D2E]/40 pointer-events-none z-20">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE & TABLET STEPPER (Clean 2-Column Grid with Badges)     */}
      {/* ============================================================ */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
        {processSteps.map((step) => (
          <div
            key={step.step}
            className="p-4 rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-3.5 relative overflow-hidden group hover:border-[#E11D2E] transition-colors"
          >
            {/* Step Number Accent Pill */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E11D2E] to-[#B91C1C] text-white flex items-center justify-center font-poppins font-extrabold text-sm shadow-xs shrink-0">
              {step.step}
            </div>

            {/* Content */}
            <div className="space-y-1 pr-2 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-poppins font-bold text-sm text-[#0B0B0B]">
                  {step.title}
                </h3>
                <div className="text-[#E11D2E] opacity-80">
                  {stepIcons[step.step]}
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
