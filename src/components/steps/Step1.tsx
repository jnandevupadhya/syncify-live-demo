import { useState } from "react";

interface Step1Props {
  onNext: () => void;
}

export const Step1 = ({ onNext }: Step1Props) => {
  const [isRunning, setIsRunning] = useState(false);

  const handleRunSetup = async () => {
    setIsRunning(true);
    
    // Simulate running setup.bat
    // Note: In a real implementation, this would need a backend service
    // as browsers cannot directly execute local files for security reasons
    
    setTimeout(() => {
      setIsRunning(false);
      onNext();
    }, 2000);
  };

  return (
    <div className="step-card text-center max-w-md mx-auto slide-up-enter">
      <div className="text-6xl mb-6">🚀</div>
      <h2 className="text-3xl font-bold mb-4 text-foreground">
        Welcome to Spotify Extension Setup!
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Let's get your Spotify listen-along extension up and running. 
        First, we need to set up the basic environment.
      </p>
      
      <button
        onClick={handleRunSetup}
        disabled={isRunning}
        className={`installer-button ${isRunning ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isRunning ? (
          <span className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2"></div>
            Running Setup...
          </span>
        ) : (
          '🔧 Run Setup.bat'
        )}
      </button>
      
      <p className="text-sm text-muted-foreground mt-4">
        This will prepare your local environment
      </p>
    </div>
  );
};