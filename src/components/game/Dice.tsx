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
      case 'top-left': return 'top-1.5 left-1.5';
      case 'top-right': return 'top-1.5 right-1.5';
      case 'middle-left': return 'top-1/2 -translate-y-1/2 left-1.5';
      case 'middle-right': return 'top-1/2 -translate-y-1/2 right-1.5';
      case 'bottom-left': return 'bottom-1.5 left-1.5';
      case 'bottom-right': return 'bottom-1.5 right-1.5';
      case 'center': return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      default: return '';
    }
  };

  return (
    <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-mumbai rounded-lg dice-shadow">
      {dots[value]?.map((pos, i) => (
        <div
          key={i}
          className={`absolute w-2.5 h-2.5 sm:w-3 sm:h-3 bg-foreground rounded-full ${getPosition(pos)}`}
        />
      ))}
    </div>
  );
};

const Dice = ({ value, isRolling, onRoll, disabled }: DiceProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`${isRolling ? 'animate-dice-roll' : ''}`}>
        <DiceFace value={value} />
      </div>
      
      <button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={`
          px-4 py-2 rounded-lg font-bold text-sm
          bg-gradient-mumbai text-foreground
          transform transition-all duration-200
          hover:scale-105 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          glow-primary
        `}
      >
        {isRolling ? '...' : '🎲 Roll'}
      </button>
    </div>
  );
};

export default Dice;
