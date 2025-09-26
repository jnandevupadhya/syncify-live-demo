interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator = ({ currentStep, totalSteps }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`progress-dot ${
              index < currentStep ? "active" : "inactive"
            }`}
          />
          {index < totalSteps - 1 && (
            <div
              className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                index < currentStep - 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};