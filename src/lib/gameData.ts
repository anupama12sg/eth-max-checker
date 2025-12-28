// Snakes and Ladders Game Data
export interface SnakeOrLadder {
  start: number;
  end: number;
  type: 'ladder' | 'snake';
  transport: 'auto' | 'local' | 'vandeBharat' | 'wrongTrain';
}

// Ladders (going up) - Mumbai transport theme
export const ladders: SnakeOrLadder[] = [
  // Short ladders (3-4 squares): Auto-rickshaw
  { start: 3, end: 22, type: 'ladder', transport: 'auto' },
  { start: 8, end: 26, type: 'ladder', transport: 'auto' },
  { start: 20, end: 29, type: 'ladder', transport: 'auto' },
  
  // Medium ladders (5-7 squares): Mumbai Local Train
  { start: 11, end: 40, type: 'ladder', transport: 'local' },
  { start: 36, end: 55, type: 'ladder', transport: 'local' },
  { start: 51, end: 67, type: 'ladder', transport: 'local' },
  
  // Long ladders (8+ squares): Vande Bharat Express
  { start: 6, end: 25, type: 'ladder', transport: 'vandeBharat' },
  { start: 28, end: 84, type: 'ladder', transport: 'vandeBharat' },
  { start: 71, end: 92, type: 'ladder', transport: 'vandeBharat' },
];

// Snakes (going down) - Wrong train lines
export const snakes: SnakeOrLadder[] = [
  { start: 17, end: 4, type: 'snake', transport: 'wrongTrain' },
  { start: 33, end: 9, type: 'snake', transport: 'wrongTrain' },
  { start: 47, end: 19, type: 'snake', transport: 'wrongTrain' },
  { start: 54, end: 31, type: 'snake', transport: 'wrongTrain' },
  { start: 62, end: 37, type: 'snake', transport: 'wrongTrain' },
  { start: 87, end: 56, type: 'snake', transport: 'wrongTrain' },
  { start: 95, end: 72, type: 'snake', transport: 'wrongTrain' },
  { start: 99, end: 78, type: 'snake', transport: 'wrongTrain' },
];

export const allSnakesAndLadders = [...ladders, ...snakes];

export const getTransportName = (transport: string): string => {
  switch (transport) {
    case 'auto': return 'Auto Rickshaw';
    case 'local': return 'Mumbai Local';
    case 'vandeBharat': return 'Vande Bharat Express';
    case 'wrongTrain': return 'Wrong Train!';
    default: return '';
  }
};

export const getTransportEmoji = (transport: string): string => {
  switch (transport) {
    case 'auto': return '🛺';
    case 'local': return '🚃';
    case 'vandeBharat': return '🚄';
    case 'wrongTrain': return '🚂';
    default: return '';
  }
};

// Leaderboard Types
export interface LeaderboardEntry {
  id: string;
  username: string;
  time: number; // in seconds
  rolls: number;
  completedAt: number;
}

export type MaxiTier = 'Mega Maxi' | 'Mumbai Maxi' | 'Aspiring Maxi';

export const getTier = (rank: number, totalPlayers: number): MaxiTier => {
  const percentile = (rank / totalPlayers) * 100;
  if (percentile <= 10) return 'Mega Maxi';
  if (percentile <= 30) return 'Mumbai Maxi';
  return 'Aspiring Maxi';
};

export const getTierColor = (tier: MaxiTier): string => {
  switch (tier) {
    case 'Mega Maxi': return 'from-amber-400 to-yellow-500';
    case 'Mumbai Maxi': return 'from-blue-400 to-indigo-500';
    case 'Aspiring Maxi': return 'from-green-400 to-emerald-500';
  }
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
