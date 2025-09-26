import { useState } from "react";

interface Step2Props {
  onNext: () => void;
}

export const Step2 = ({ onNext }: Step2Props) => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    if (!clientId.trim() || !clientSecret.trim()) {
      alert("Please fill in both Client ID and Client Secret! 🙏");
      return;
    }

    setIsProcessing(true);

    // Simulate API call to exchange for refresh token
    // In real implementation, this would call your backend /api/token endpoint
    setTimeout(() => {
      setIsProcessing(false);
      onNext();
    }, 2000);
  };

  return (
    <div className="step-card max-w-2xl mx-auto slide-up-enter">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Connect to Spotify
        </h2>
        <p className="text-lg text-muted-foreground">
          We need your Spotify app credentials to enable the extension
        </p>
      </div>

      <div className="bg-accent/20 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-semibold mb-3 flex items-center">
          📋 Quick Guide
        </h3>
        <ol className="text-sm text-muted-foreground space-y-2">
          <li>1. Visit the <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Spotify Developer Dashboard</a></li>
          <li>2. Create a new app or use an existing one</li>
          <li>3. Copy your Client ID and Client Secret below</li>
        </ol>
      </div>

      <div className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">
            🔑 Client ID
          </label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="Your Spotify Client ID"
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            🔐 Client Secret
          </label>
          <input
            type="password"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            placeholder="Your Spotify Client Secret"
            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          disabled={isProcessing}
          className={`installer-button ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-2"></div>
              Connecting to Spotify...
            </span>
          ) : (
            '🎯 Connect & Save Credentials'
          )}
        </button>
        
        <p className="text-sm text-muted-foreground mt-4">
          We'll securely store your refresh token
        </p>
      </div>
    </div>
  );
};