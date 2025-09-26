import { useEffect, useState } from "react";

export const Step4 = () => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; delay: number; emoji: string }>>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: ['🎉', '🎊', '✨', '🌟', '💫'][Math.floor(Math.random() * 5)]
    }));
    setConfettiPieces(pieces);
  }, []);

  return (
    <div className="step-card text-center max-w-lg mx-auto slide-up-enter relative overflow-hidden">
      {/* Confetti Animation */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute text-2xl confetti pointer-events-none"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            top: '-20px'
          }}
        >
          {piece.emoji}
        </div>
      ))}

      <div className="relative z-10">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <h2 className="text-4xl font-bold mb-4 text-success">
          ALL DONE!
        </h2>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          Your Spotify listen-along extension is ready to rock! 
        </p>

        <div className="bg-success/20 border border-success/30 rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center justify-center">
            🚀 What's Next?
          </h3>
          <ul className="text-muted-foreground space-y-2 text-left">
            <li className="flex items-start">
              <span className="text-lg mr-2">👥</span>
              <span>Share the extension file with your friends</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">🎵</span>
              <span>Start a listening party together</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">💬</span>
              <span>Enjoy synchronized music experiences</span>
            </li>
          </ul>
        </div>

        <button className="success-button">
          🎵 Launch Extension
        </button>
        
        <p className="text-sm text-muted-foreground mt-6">
          Thanks for using our installer! Have fun listening together! 💚
        </p>
      </div>
    </div>
  );
};