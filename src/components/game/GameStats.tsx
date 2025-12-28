import { formatTime } from '@/lib/gameData';

interface GameStatsProps {
  position: number;
  rolls: number;
  time: number;
  rollHistory: number[];
}

const GameStats = ({ position, rolls, time, rollHistory }: GameStatsProps) => {
  return (
    <div className="bg-card/80 rounded-lg p-3 border border-border">
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-[10px] text-muted-foreground">Position</p>
          <p className="text-lg font-bold text-primary">{position}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Rolls</p>
          <p className="text-lg font-bold text-secondary">{rolls}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Time</p>
          <p className="text-lg font-bold text-accent">{formatTime(time)}</p>
        </div>
      </div>

      {rollHistory.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border">
          <div className="flex flex-wrap gap-1 justify-center">
            {rollHistory.slice(-8).map((roll, idx) => (
              <span
                key={idx}
                className="w-5 h-5 flex items-center justify-center bg-muted rounded text-[10px] font-bold"
              >
                {roll}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameStats;
