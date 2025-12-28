import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLeaderboard } from '@/lib/storage';
import { formatTime, getTier, getTierColor } from '@/lib/gameData';
import { Clock, Dice1 } from 'lucide-react';

const Leaderboard = () => {
  const leaderboard = getLeaderboard();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-20 pb-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-gradient-mumbai mb-2">
              Leaderboard
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Top players who reached ETHMumbai the fastest. Can you beat them?
            </p>
          </div>

          {/* Tier Legend */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg text-xs">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />
              <span>Mega Maxi (Top 10%)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg text-xs">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
              <span>Mumbai Maxi (Top 30%)</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-card rounded-lg text-xs">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
              <span>Aspiring Maxi</span>
            </div>
          </div>

          {leaderboard.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🎲</div>
              <h2 className="text-xl font-bold mb-2">No entries yet!</h2>
              <p className="text-muted-foreground text-sm mb-4">
                Be the first to complete the game and claim the top spot!
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2 bg-gradient-mumbai text-foreground font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Play Now
              </a>
            </div>
          ) : (
            /* Leaderboard Table */
            <div className="max-w-3xl mx-auto">
              {/* Top 3 Podium */}
              {leaderboard.length >= 3 && (
                <div className="flex justify-center items-end gap-3 mb-8">
                  {/* 2nd Place */}
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="w-16 h-16 mx-auto mb-1 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-2xl">
                      🥈
                    </div>
                    <p className="font-bold text-sm truncate max-w-16">{leaderboard[1].username}</p>
                    <p className="text-[10px] text-muted-foreground">{formatTime(leaderboard[1].time)}</p>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center animate-fade-in -mt-6">
                    <div className="w-20 h-20 mx-auto mb-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center text-3xl animate-pulse-glow">
                      🥇
                    </div>
                    <p className="font-bold truncate max-w-20">{leaderboard[0].username}</p>
                    <p className="text-xs text-muted-foreground">{formatTime(leaderboard[0].time)}</p>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-16 h-16 mx-auto mb-1 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 flex items-center justify-center text-2xl">
                      🥉
                    </div>
                    <p className="font-bold text-sm truncate max-w-16">{leaderboard[2].username}</p>
                    <p className="text-[10px] text-muted-foreground">{formatTime(leaderboard[2].time)}</p>
                  </div>
                </div>
              )}

              {/* Full List */}
              <div className="bg-card rounded-xl overflow-hidden card-shadow">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 p-3 bg-muted/50 font-semibold text-xs">
                  <span>Rank</span>
                  <span>Player</span>
                  <span className="text-center"><Clock className="w-3 h-3 inline" /></span>
                  <span className="text-center"><Dice1 className="w-3 h-3 inline" /></span>
                  <span className="text-center">Tier</span>
                </div>

                <div className="divide-y divide-border">
                  {leaderboard.map((entry, index) => {
                    const tier = getTier(index + 1, leaderboard.length);
                    return (
                      <div
                        key={entry.id}
                        className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 p-3 items-center hover:bg-muted/30 transition-colors text-sm"
                      >
                        <span className="font-bold text-primary">#{index + 1}</span>
                        <span className="font-medium truncate">{entry.username}</span>
                        <span className="text-center text-xs text-muted-foreground">{formatTime(entry.time)}</span>
                        <span className="text-center text-xs text-muted-foreground">{entry.rolls}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-gradient-to-r ${getTierColor(tier)} text-white font-bold`}>
                          {tier.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;
