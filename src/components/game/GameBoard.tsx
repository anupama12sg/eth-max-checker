import { allSnakesAndLadders } from '@/lib/gameData';
import { useMemo } from 'react';

interface GameBoardProps {
  playerPosition: number;
  isMoving?: boolean;
}

const GameBoard = ({ playerPosition, isMoving }: GameBoardProps) => {
  // Random blue accent squares (consistent across renders)
  const blueSquares = useMemo(() => {
    const squares = new Set<number>();
    for (let i = 0; i < 15; i++) {
      squares.add(Math.floor(Math.random() * 100) + 1);
    }
    return squares;
  }, []);

  // Create board array (10x10 = 100 squares)
  const createBoardLayout = () => {
    const rows: number[][] = [];
    for (let row = 9; row >= 0; row--) {
      const rowSquares: number[] = [];
      for (let col = 0; col < 10; col++) {
        const isEvenRow = (9 - row) % 2 === 0;
        const squareNum = row * 10 + (isEvenRow ? col + 1 : 10 - col);
        rowSquares.push(squareNum);
      }
      rows.push(rowSquares);
    }
    return rows;
  };

  const boardLayout = createBoardLayout();

  const getSquareInfo = (num: number) => {
    return allSnakesAndLadders.find(s => s.start === num);
  };

  const getSquareColor = (num: number) => {
    const info = getSquareInfo(num);
    if (info?.type === 'ladder') return 'bg-mumbai-green/30 border-mumbai-green/60';
    if (info?.type === 'snake') return 'bg-primary/30 border-primary/60';
    
    // Light blue accent squares
    if (blueSquares.has(num)) return 'bg-accent/20 border-accent/40';
    
    // Red and Yellow checkerboard pattern
    const row = Math.floor((num - 1) / 10);
    const col = (num - 1) % 10;
    const isEven = (row + col) % 2 === 0;
    return isEven 
      ? 'bg-primary/10 border-primary/30' 
      : 'bg-secondary/10 border-secondary/30';
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

  const getDestination = (num: number) => {
    const info = getSquareInfo(num);
    return info?.end;
  };

  return (
    <div className="w-full p-1.5 bg-gradient-board rounded-xl card-shadow border border-border">
      <div className="grid grid-cols-10 gap-0.5">
        {boardLayout.map((row) =>
          row.map((squareNum) => {
            const icon = getSquareIcon(squareNum);
            const destination = getDestination(squareNum);
            const isPlayerHere = playerPosition === squareNum;
            
            return (
              <div
                key={squareNum}
                className={`
                  board-square text-[8px] sm:text-[10px] rounded border
                  ${getSquareColor(squareNum)}
                  ${squareNum === 100 ? 'bg-gradient-mumbai border-secondary' : ''}
                  ${isPlayerHere ? 'ring-2 ring-secondary ring-offset-1 ring-offset-background z-20' : ''}
                `}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-center">
                  <span className="opacity-60 leading-none">{squareNum}</span>
                  
                  {icon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-sm sm:text-base">{icon}</span>
                      {destination && (
                        <span className="absolute -bottom-0.5 right-0 text-[6px] sm:text-[8px] font-bold bg-background/80 px-0.5 rounded">
                          →{destination}
                        </span>
                      )}
                    </div>
                  )}
                  
                  {isPlayerHere && (
                    <div className={`absolute inset-0 flex items-center justify-center z-10 ${isMoving ? 'animate-player-move' : ''}`}>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-secondary rounded-full animate-pulse-glow flex items-center justify-center text-[10px] border-2 border-background">
                        👤
                      </div>
                    </div>
                  )}
                  
                  {squareNum === 100 && (
                    <span className="text-[10px] sm:text-xs">🏁</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {/* Compact Legend */}
      <div className="mt-2 flex flex-wrap justify-center gap-2 text-[10px]">
        <span className="flex items-center gap-1"><span>🛺</span>Auto</span>
        <span className="flex items-center gap-1"><span>🚃</span>Local</span>
        <span className="flex items-center gap-1"><span>🚄</span>Express</span>
        <span className="flex items-center gap-1"><span>🐍</span>Wrong</span>
      </div>
    </div>
  );
};

export default GameBoard;
