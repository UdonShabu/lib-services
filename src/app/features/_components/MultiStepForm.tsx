"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = ["s1", "s2", "s3"];

  return (
    <div className="grid place-items-center space-y-8 mt-5 w-3/4 mx-auto">
      <ul className="flex justify-center">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center justify-center ">
            <div
              className={cn(
                "border-2 rounded-full text-xl flex items-center justify-center size-10",
                i + 1 <= currentStep
                  ? "border-blue-400 bg-blue-400 text-white"
                  : "border-gray-300"
              )}
            >
              {i + 1}{" "}
            </div>
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "w-10 h-1 bg-gray-300",
                  i + 1 < currentStep ? "bg-blue-400 " : "bg-gray-300"
                )}
              />
            )}
          </li>
        ))}
      </ul>

      <form action="">
        <input
          type="text"
          className="border-2 rounded-md p-1 border-gray-300"
        />
      </form>

      <div className="flex justify-between w-2/4 ">
        <Button
          className="p-2 px-3 "
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep < 2}
        >
          Prev
        </Button>
        <Button
          className="p-2 px-3   "
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep > steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
