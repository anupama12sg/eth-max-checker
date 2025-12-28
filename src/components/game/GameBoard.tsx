import { allSnakesAndLadders } from '@/lib/gameData';

interface GameBoardProps {
  playerPosition: number;
}

const GameBoard = ({ playerPosition }: GameBoardProps) => {
  // Create board array (10x10 = 100 squares)
  const createBoardLayout = () => {
    const rows: number[][] = [];
    for (let row = 9; row >= 0; row--) {
      const rowSquares: number[] = [];
      const isEvenRow = row % 2 === 0;
      
      for (let col = 0; col < 10; col++) {
        const squareNum = row * 10 + (isEvenRow ? col + 1 : 10 - col);
        rowSquares.push(squareNum);
      }
      
      // Reverse for serpentine layout
      if (row % 2 === 1) {
        rowSquares.reverse();
      }
      rows.push(rowSquares);
    }
    return rows;
  };

  const boardLayout = createBoardLayout();

  const getSquareType = (num: number): 'ladder' | 'snake' | null => {
    const item = allSnakesAndLadders.find(s => s.start === num);
    return item?.type || null;
  };

  const getSquareInfo = (num: number) => {
    return allSnakesAndLadders.find(s => s.start === num);
  };

  const getSquareColor = (num: number) => {
    const type = getSquareType(num);
    if (type === 'ladder') return 'bg-mumbai-green/20 border-mumbai-green';
    if (type === 'snake') return 'bg-mumbai-red/20 border-mumbai-red';
    
    // Checkerboard pattern
    const row = Math.floor((num - 1) / 10);
    const col = (num - 1) % 10;
    const isEven = (row + col) % 2 === 0;
    return isEven ? 'bg-muted/50 border-border' : 'bg-card border-border';
  };

  const getSquareIcon = (num: number) => {
    const info = getSquareInfo(num);
    if (!info) return null;
    
    if (info.type === 'ladder') {
      switch (info.transport) {
        case 'auto': return '🛺';
        case 'local': return '🚃';
        case 'vandeBharat': return '🚄';
      }
    }
    return '🐍';
  };

  return (
    <div className="w-full max-w-lg mx-auto p-2 bg-gradient-board rounded-2xl card-shadow">
      <div className="grid grid-cols-10 gap-0.5 sm:gap-1">
        {boardLayout.map((row, rowIdx) =>
          row.map((squareNum) => (
            <div
              key={squareNum}
              className={`
                board-square text-xs sm:text-sm rounded-md sm:rounded-lg border-2
                ${getSquareColor(squareNum)}
                ${squareNum === 100 ? 'bg-gradient-mumbai text-primary-foreground' : ''}
                ${playerPosition === squareNum ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''}
              `}
            >
              <div className="relative w-full h-full flex flex-col items-center justify-center p-0.5 sm:p-1">
                <span className="text-[10px] sm:text-xs opacity-70">{squareNum}</span>
                {getSquareIcon(squareNum) && (
                  <span className="text-sm sm:text-lg">{getSquareIcon(squareNum)}</span>
                )}
                {playerPosition === squareNum && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-accent rounded-full animate-pulse-glow flex items-center justify-center text-xs">
                      👤
                    </div>
                  </div>
                )}
                {squareNum === 100 && (
                  <span className="text-[8px] sm:text-[10px] font-bold">🏁</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span>🛺</span>
          <span className="text-muted-foreground">Auto</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🚃</span>
          <span className="text-muted-foreground">Local</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🚄</span>
          <span className="text-muted-foreground">Vande Bharat</span>
        </div>
        <div className="flex items-center gap-2">
          <span>🐍</span>
          <span className="text-muted-foreground">Wrong Train</span>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
