import { LeaderboardEntry } from './gameData';

const LEADERBOARD_KEY = 'ethmumbai_maxi_leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveToLeaderboard = (entry: Omit<LeaderboardEntry, 'id' | 'completedAt'>): LeaderboardEntry => {
  const leaderboard = getLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: crypto.randomUUID(),
    completedAt: Date.now(),
  };
  
  leaderboard.push(newEntry);
  
  // Sort by time first, then by rolls
  leaderboard.sort((a, b) => {
    if (a.time !== b.time) return a.time - b.time;
    return a.rolls - b.rolls;
  });
  
  // Keep top 100 entries
  const trimmed = leaderboard.slice(0, 100);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  
  return newEntry;
};

export const getPlayerRank = (entryId: string): number => {
  const leaderboard = getLeaderboard();
  const index = leaderboard.findIndex(e => e.id === entryId);
  return index === -1 ? leaderboard.length : index + 1;
};

export const clearLeaderboard = () => {
  localStorage.removeItem(LEADERBOARD_KEY);
};
