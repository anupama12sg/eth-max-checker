import { formatTime } from '@/lib/gameData';

interface GameStatsProps {
  position: number;
  rolls: number;
  time: number;
  rollHistory: number[];
}

const GameStats = ({ position, rolls, time, rollHistory }: GameStatsProps) => {
  return (
    <div className="bg-card rounded-xl p-4 card-shadow">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">Position</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{position}</p>
        </div>
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">Rolls</p>
          <p className="text-2xl sm:text-3xl font-bold text-secondary">{rolls}</p>
        </div>
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">Time</p>
          <p className="text-2xl sm:text-3xl font-bold text-accent">{formatTime(time)}</p>
        </div>
      </div>

      {rollHistory.length > 0 && (
        <div>
          <p className="text-xs text-muted-foreground mb-2">Recent Rolls:</p>
          <div className="flex flex-wrap gap-1">
            {rollHistory.slice(-10).map((roll, idx) => (
              <span
                key={idx}
                className="w-6 h-6 flex items-center justify-center bg-muted rounded text-xs font-bold"
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
