import { useEffect, useState } from 'react';
import autoRickshaw from '@/assets/auto-rickshaw.png';
import localTrain from '@/assets/local-train.png';
import vandeBharat from '@/assets/vande-bharat.png';
import { getTransportName } from '@/lib/gameData';

interface TransportAnimationProps {
  transport: 'auto' | 'local' | 'vandeBharat' | 'wrongTrain';
  type: 'ladder' | 'snake';
  from: number;
  to: number;
  onComplete: () => void;
}

const TransportAnimation = ({ transport, type, from, to, onComplete }: TransportAnimationProps) => {
  const [stage, setStage] = useState<'start' | 'travel' | 'end'>('start');

  const getImage = () => {
    if (transport === 'wrongTrain') return localTrain;
    switch (transport) {
      case 'auto': return autoRickshaw;
      case 'local': return localTrain;
      case 'vandeBharat': return vandeBharat;
      default: return autoRickshaw;
    }
  };

  const isGoingUp = type === 'ladder';

  useEffect(() => {
    // Start travel animation after a brief delay
    const timer1 = setTimeout(() => setStage('travel'), 200);
    const timer2 = setTimeout(() => setStage('end'), 2200);
    const timer3 = setTimeout(onComplete, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md overflow-hidden">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={`absolute h-1 ${isGoingUp ? 'bg-mumbai-green/30' : 'bg-primary/30'} rounded-full`}
            style={{
              width: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: isGoingUp ? 'rotate(-45deg)' : 'rotate(45deg)',
              animation: `${isGoingUp ? 'slideUp' : 'slideDown'} ${1 + Math.random()}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* From/To indicators */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <div className="flex items-center gap-4 text-2xl font-bold">
          <span className="px-4 py-2 bg-primary/20 rounded-xl border-2 border-primary">
            {from}
          </span>
          <span className={`text-4xl ${isGoingUp ? 'text-mumbai-green' : 'text-primary'}`}>
            {isGoingUp ? '→' : '→'}
          </span>
          <span className={`px-4 py-2 rounded-xl border-2 ${isGoingUp ? 'bg-mumbai-green/20 border-mumbai-green' : 'bg-primary/20 border-primary'}`}>
            {to}
          </span>
        </div>
      </div>

      {/* Vehicle Animation Container */}
      <div className="relative w-full h-64 flex items-center justify-center">
        {/* Track/Path */}
        <div 
          className={`absolute w-[120%] h-2 ${isGoingUp ? 'bg-mumbai-green/40' : 'bg-primary/40'} rounded-full`}
          style={{
            transform: isGoingUp ? 'rotate(-15deg)' : 'rotate(15deg)',
          }}
        />

        {/* Vehicle */}
        <div
          className={`
            relative z-10
            ${stage === 'travel' ? (isGoingUp ? 'animate-vehicle-up' : 'animate-vehicle-down') : ''}
            ${stage === 'start' ? 'opacity-0' : ''}
          `}
        >
          <img
            src={getImage()}
            alt={getTransportName(transport)}
            className="w-40 h-40 sm:w-56 sm:h-56 object-contain drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 0 20px ${isGoingUp ? 'hsl(145, 70%, 45%)' : 'hsl(0, 85%, 50%)'})`
            }}
          />
        </div>
      </div>

      {/* Transport Name & Message */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 
          className={`font-display text-4xl sm:text-5xl mb-2 ${isGoingUp ? 'text-mumbai-green' : 'text-primary'}`}
          style={{
            textShadow: `0 0 20px ${isGoingUp ? 'hsl(145, 70%, 45%)' : 'hsl(0, 85%, 50%)'}`
          }}
        >
          {type === 'ladder' ? getTransportName(transport) : 'Wrong Train! 😱'}
        </h2>
        <p className="text-xl text-muted-foreground">
          {isGoingUp ? (
            <span className="text-mumbai-green">Climbing up {to - from} squares! 🎉</span>
          ) : (
            <span className="text-primary">Sliding down {from - to} squares! 😅</span>
          )}
        </p>
      </div>

      {/* Particles */}
      {stage === 'travel' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                i % 3 === 0 ? 'bg-primary' : i % 3 === 1 ? 'bg-secondary' : 'bg-accent'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: isGoingUp ? '100%' : '0%',
                animation: `confetti ${1 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TransportAnimation;
