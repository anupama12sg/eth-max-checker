import { useEffect, useState } from 'react';

interface CelebrationAnimationProps {
  onComplete: () => void;
}

const CelebrationAnimation = ({ onComplete }: CelebrationAnimationProps) => {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

  useEffect(() => {
    // Generate confetti
    const colors = ['#ff6b35', '#3b82f6', '#fbbf24', '#10b981', '#8b5cf6', '#ef4444'];
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setConfetti(pieces);

    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 animate-confetti"
          style={{
            left: `${piece.left}%`,
            top: '-20px',
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%',
          }}
        />
      ))}

      {/* Main celebration content */}
      <div className="text-center animate-bounce-in">
        <div className="text-8xl mb-4 animate-celebration">🏆</div>
        <h1 className="font-display text-4xl sm:text-6xl text-gradient-mumbai mb-4">
          YOU DID IT!
        </h1>
        <p className="text-xl sm:text-2xl text-foreground mb-2">
          Welcome to ETHMumbai! 🎊
        </p>
        <p className="text-muted-foreground">
          You're officially a Mumbai Maxi!
        </p>
      </div>
    </div>
  );
};

export default CelebrationAnimation;
