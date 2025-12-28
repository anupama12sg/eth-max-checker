import { useState } from 'react';

interface DiceProps {
  value: number;
  isRolling: boolean;
  onRoll: () => void;
  disabled: boolean;
}

const DiceFace = ({ value }: { value: number }) => {
  const dots: Record<number, string[]> = {
    1: ['center'],
    2: ['top-right', 'bottom-left'],
    3: ['top-right', 'center', 'bottom-left'],
    4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    5: ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    6: ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right'],
  };

  const getPosition = (pos: string) => {
    switch (pos) {
      case 'top-left': return 'top-2 left-2';
      case 'top-right': return 'top-2 right-2';
      case 'middle-left': return 'top-1/2 -translate-y-1/2 left-2';
      case 'middle-right': return 'top-1/2 -translate-y-1/2 right-2';
      case 'bottom-left': return 'bottom-2 left-2';
      case 'bottom-right': return 'bottom-2 right-2';
      case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default: return '';
    }
  };

  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-mumbai rounded-xl dice-shadow">
      {dots[value]?.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-3 h-3 sm:w-4 sm:h-4 bg-primary-foreground rounded-full ${getPosition(pos)}`}
        />
      ))}
    </div>
  );
};

const Dice = ({ value, isRolling, onRoll, disabled }: DiceProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className={`${isRolling ? 'animate-dice-roll' : ''}`}>
        <DiceFace value={value} />
      </div>
      
      <button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={`
          px-8 py-3 rounded-xl font-bold text-lg
          bg-gradient-mumbai text-primary-foreground
          transform transition-all duration-200
          hover:scale-105 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          glow-primary
        `}
      >
        {isRolling ? 'Rolling...' : '🎲 Roll Dice'}
      </button>
    </div>
  );
};

export default Dice;
