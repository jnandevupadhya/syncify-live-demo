import { useState } from "react";

interface Step3Props {
  onNext: () => void;
}

export const Step3 = ({ onNext }: Step3Props) => {
  const [isRunning, setIsRunning] = useState(false);
  const [tunnelUrl, setTunnelUrl] = useState("");

  const handleRunTunnel = async () => {
    setIsRunning(true);
    
    // Simulate running tunnel command and capturing URL
    // In real implementation, this would execute: lt --port 3000
    setTimeout(() => {
      const mockUrl = `https://quick-turtle-${Math.random().toString(36).substring(2, 8)}.loca.lt`;
      setTunnelUrl(mockUrl);
      setIsRunning(false);
      
      // Simulate a brief pause to show the URL, then proceed
      setTimeout(() => {
        onNext();
      }, 1500);
    }, 3000);
  };

  return (
    <div className="step-card text-center max-w-lg mx-auto slide-up-enter">
      <div className="text-6xl mb-6">🌐</div>
      <h2 className="text-3xl font-bold mb-4 text-foreground">
        Create Secure Tunnel
      </h2>
      <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
        Now we'll create a secure tunnel so your friends can connect to your extension
      </p>

      {!tunnelUrl ? (
        <>
          <button
            onClick={handleRunTunnel}
            disabled={isRunning}
            className={`installer-button ${isRunning ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isRunning ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2"></div>
                Starting Tunnel...
              </span>
            ) : (
              '🚇 Start Local Tunnel'
            )}
          </button>
          
          <p className="text-sm text-muted-foreground mt-4">
            This will run: <code className="bg-muted px-2 py-1 rounded">lt --port 3000</code>
          </p>
        </>
      ) : (
        <div className="animate-pulse-warm">
          <div className="bg-success/20 border border-success/30 rounded-2xl p-6 mb-4">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="font-semibold text-lg mb-2">Tunnel Created!</h3>
            <div className="bg-background rounded-lg p-3 font-mono text-sm break-all">
              {tunnelUrl}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            URL saved and extension updated automatically! 🎉
          </p>
        </div>
      )}
    </div>
  );
};