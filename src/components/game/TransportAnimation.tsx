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
  const [stage, setStage] = useState<'enter' | 'show' | 'exit'>('enter');

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
    const timer1 = setTimeout(() => setStage('show'), 100);
    const timer2 = setTimeout(() => setStage('exit'), 1500);
    const timer3 = setTimeout(onComplete, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm">
      <div className="text-center">
        {/* Transport Image */}
        <div
          className={`
            w-48 h-48 sm:w-64 sm:h-64 mx-auto mb-6
            transition-all duration-1000 ease-out
            ${stage === 'enter' ? (isGoingUp ? 'translate-y-32 opacity-0' : '-translate-y-32 opacity-0') : ''}
            ${stage === 'show' ? 'translate-y-0 opacity-100' : ''}
            ${stage === 'exit' ? (isGoingUp ? '-translate-y-32 opacity-0' : 'translate-y-32 opacity-0') : ''}
          `}
          style={{
            transform: !isGoingUp && stage !== 'enter' ? 'scaleX(-1)' : undefined,
          }}
        >
          <img
            src={getImage()}
            alt={getTransportName(transport)}
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Transport Name */}
        <div
          className={`
            transition-all duration-500 delay-300
            ${stage === 'show' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <h2 className={`font-display text-3xl sm:text-4xl mb-2 ${isGoingUp ? 'text-mumbai-green' : 'text-mumbai-red'}`}>
            {type === 'ladder' ? getTransportName(transport) : 'Wrong Train! 😱'}
          </h2>
          <p className="text-xl text-muted-foreground">
            {isGoingUp ? (
              <>Moving up from <span className="text-foreground font-bold">{from}</span> to <span className="text-foreground font-bold">{to}</span>! 🎉</>
            ) : (
              <>Sliding down from <span className="text-foreground font-bold">{from}</span> to <span className="text-foreground font-bold">{to}</span>! 😅</>
            )}
          </p>
        </div>

        {/* Direction Arrow */}
        <div
          className={`
            mt-6 text-6xl
            transition-all duration-500 delay-500
            ${stage === 'show' ? 'opacity-100' : 'opacity-0'}
          `}
        >
          {isGoingUp ? '⬆️' : '⬇️'}
        </div>
      </div>
    </div>
  );
};

export default TransportAnimation;
