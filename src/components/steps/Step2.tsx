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
    <div className="step-card max-w-6xl mx-auto slide-up-enter">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎵</div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Connect to Spotify
        </h2>
        <p className="text-lg text-muted-foreground mb-6">
          Follow these steps to get your Spotify app credentials
        </p>
        
        <div className="text-left mb-4">
          <ol className="text-sm text-muted-foreground space-y-2 max-w-2xl mx-auto">
            <li>1. Visit the <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Spotify Developer Dashboard</a></li>
            <li>2. Create a new app or select an existing one</li>
            <li>3. Navigate to your app settings to find the credentials</li>
            <li>4. Copy your Client ID and Client Secret from the screenshots below</li>
          </ol>
        </div>
      </div>

      <div className="bg-accent/10 rounded-3xl p-8 mb-8 border border-accent/20">
        <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center">
          📋 Visual Guide - Spotify Developer Dashboard
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="screenshot-container">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Step 1: App Dashboard</h4>
            <div className="screenshot-wrapper">
              <div className="screenshot-placeholder bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg border-2 border-green-500/30 aspect-video flex items-center justify-center text-green-600">
                <div className="text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="text-sm font-medium">Spotify App Dashboard</div>
                  <div className="text-xs opacity-70">Select your app here</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="screenshot-container">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Step 2: App Settings</h4>
            <div className="screenshot-wrapper">
              <div className="screenshot-placeholder bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg border-2 border-blue-500/30 aspect-video flex items-center justify-center text-blue-600">
                <div className="text-center">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm font-medium">Settings Page</div>
                  <div className="text-xs opacity-70">Click "Settings" button</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="screenshot-container">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Step 3: Client ID</h4>
            <div className="screenshot-wrapper">
              <div className="screenshot-placeholder bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg border-2 border-purple-500/30 aspect-video flex items-center justify-center text-purple-600">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔑</div>
                  <div className="text-sm font-medium">Client ID Section</div>
                  <div className="text-xs opacity-70">Copy this ID</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="screenshot-container">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Step 4: Client Secret</h4>
            <div className="screenshot-wrapper">
              <div className="screenshot-placeholder bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-lg border-2 border-red-500/30 aspect-video flex items-center justify-center text-red-600">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔐</div>
                  <div className="text-sm font-medium">Client Secret</div>
                  <div className="text-xs opacity-70">Reveal & copy secret</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Enter Your Credentials
        </h3>
        
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
              '🎯 Continue'
            )}
          </button>
          
          <p className="text-sm text-muted-foreground mt-4">
            We'll securely store your refresh token
          </p>
        </div>
      </div>
    </div>
  );
};