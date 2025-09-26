import { useState } from "react";
import { ProgressIndicator } from "./ProgressIndicator";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { Step4 } from "./steps/Step4";

export const SpotifyInstaller = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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
        return <Step3 onNext={nextStep} />;
      case 4:
        return <Step4 />;
      default:
        return <Step1 onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Spotify Extension Installer
          </h1>
          <p className="text-xl text-muted-foreground">
            Get your listen-along extension ready in just 4 easy steps
          </p>
        </header>

        <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
        
        <main className="transition-all duration-400">
          {renderCurrentStep()}
        </main>

        <footer className="text-center mt-16 text-sm text-muted-foreground">
          <p>Step {currentStep} of {totalSteps} • Spotify Listen-Along Extension</p>
        </footer>
      </div>
    </div>
  );
};