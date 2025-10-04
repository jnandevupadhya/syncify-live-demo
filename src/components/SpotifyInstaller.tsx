import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step4 } from "./steps/Step4";

export const SpotifyInstaller = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={nextStep} />;
      case 2:
        return <Step2 onNext={nextStep} />;
      case 3:
        return <Step4 />;
      default:
        return <Step1 onNext={nextStep} />;
    }
  };

  return (
    <section data-scrollbar>
      <div
        className={`min-h-screen px-4 ${currentStep != 3 ? "py-12 " : "py-4"}`}
      >
        <div
          className={`${currentStep === 3 ? "w-full" : "max-w-4xl mx-auto"}`}
        >
          <header
            className={`text-center transition-transform ${
              currentStep != 3 ? "mb-12" : "mb-3"
            }`}
          >
            <h1
              className={`text-5xl font-bold  bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-1000 leading-snug ${
                currentStep != 3
                  ? "mb-4 max-h-[100px] opacity-100"
                  : "mb-0 h-10 opacity-0"
              }`}
            >
              SpotiSync Room Setup
            </h1>

            <p
              className={`text-xl text-muted-foreground transition-all duration-300 ${
                currentStep == 3 ? "opacity-0 h-0" : "opacity-100"
              }`}
            >
              Start listening with your group in just 3 steps!
            </p>
          </header>

          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />

          <main className="transition-all duration-400">
            {currentStep === 3 ? (
              <div className="w-full">{renderCurrentStep()}</div>
            ) : (
              renderCurrentStep()
            )}
          </main>

          <footer
            className={`text-center text-sm text-muted-foreground transition-all duration-300 origin-bottom ${
              currentStep != 3
                ? "mt-16 max-h-[100px] opacity-100"
                : "h-0 opacity-0"
            }`}
          >
            <p>
              Step {currentStep} of {totalSteps} • Spotify Listen-Along
              Extension
            </p>
          </footer>
        </div>
      </div>
    </section>
  );
};
