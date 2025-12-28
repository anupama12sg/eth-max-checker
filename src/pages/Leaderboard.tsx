import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getLeaderboard } from '@/lib/storage';
import { formatTime, getTier, getTierColor } from '@/lib/gameData';
import { Trophy, Clock, Dice1 } from 'lucide-react';

const Leaderboard = () => {
  const leaderboard = getLeaderboard();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl sm:text-6xl text-gradient-mumbai mb-4">
              Leaderboard
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Top players who reached ETHMumbai the fastest. Can you beat them?
            </p>
          </div>

          {/* Tier Legend */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500" />
              <span className="text-sm">Mega Maxi (Top 10%)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500" />
              <span className="text-sm">Mumbai Maxi (Top 30%)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-lg">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500" />
              <span className="text-sm">Aspiring Maxi</span>
            </div>
          </div>

          {leaderboard.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎲</div>
              <h2 className="text-2xl font-bold mb-2">No entries yet!</h2>
              <p className="text-muted-foreground mb-6">
                Be the first to complete the game and claim the top spot!
              </p>
              <a
                href="/"
                className="inline-block px-8 py-3 bg-gradient-mumbai text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                Play Now
              </a>
            </div>
          ) : (
            /* Leaderboard Table */
            <div className="max-w-4xl mx-auto">
              {/* Top 3 Podium */}
              {leaderboard.length >= 3 && (
                <div className="flex justify-center items-end gap-4 mb-12">
                  {/* 2nd Place */}
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-3xl sm:text-4xl">
                      🥈
                    </div>
                    <p className="font-bold text-sm sm:text-base truncate max-w-20 sm:max-w-24">
                      {leaderboard[1].username}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatTime(leaderboard[1].time)}</p>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center animate-fade-in -mt-8">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center text-4xl sm:text-5xl animate-pulse-glow">
                      🥇
                    </div>
                    <p className="font-bold text-lg sm:text-xl truncate max-w-24 sm:max-w-32">
                      {leaderboard[0].username}
                    </p>
                    <p className="text-sm text-muted-foreground">{formatTime(leaderboard[0].time)}</p>
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 flex items-center justify-center text-3xl sm:text-4xl">
                      🥉
                    </div>
                    <p className="font-bold text-sm sm:text-base truncate max-w-20 sm:max-w-24">
                      {leaderboard[2].username}
                    </p>
                    <p className="text-xs text-muted-foreground">{formatTime(leaderboard[2].time)}</p>
                  </div>
                </div>
              )}

              {/* Full List */}
              <div className="bg-card rounded-2xl overflow-hidden card-shadow">
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-4 bg-muted/50 font-semibold text-sm">
                  <span>Rank</span>
                  <span>Player</span>
                  <span className="text-center">
                    <Clock className="w-4 h-4 inline" />
                  </span>
                  <span className="text-center">
                    <Dice1 className="w-4 h-4 inline" />
                  </span>
                  <span className="text-center">Tier</span>
                </div>

                <div className="divide-y divide-border">
                  {leaderboard.map((entry, index) => {
                    const tier = getTier(index + 1, leaderboard.length);
                    return (
                      <div
                        key={entry.id}
                        className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
                      >
                        <span className="font-bold text-primary">#{index + 1}</span>
                        <span className="font-medium truncate">{entry.username}</span>
                        <span className="text-center text-sm text-muted-foreground">
                          {formatTime(entry.time)}
                        </span>
                        <span className="text-center text-sm text-muted-foreground">
                          {entry.rolls}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${getTierColor(tier)} text-white font-bold`}
                        >
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
