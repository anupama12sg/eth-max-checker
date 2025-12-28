import { useState, useEffect, useCallback } from 'react';
import { allSnakesAndLadders } from '@/lib/gameData';
import { saveToLeaderboard, getPlayerRank, getLeaderboard } from '@/lib/storage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameBoard from '@/components/game/GameBoard';
import Dice from '@/components/game/Dice';
import GameStats from '@/components/game/GameStats';
import UsernameModal from '@/components/game/UsernameModal';
import TransportAnimation from '@/components/game/TransportAnimation';
import CelebrationAnimation from '@/components/game/CelebrationAnimation';
import MaxiCard from '@/components/game/MaxiCard';
import { Link } from 'react-router-dom';

interface GameState {
  position: number;
  rolls: number;
  time: number;
  rollHistory: number[];
  isGameOver: boolean;
  entryId: string | null;
}

const Index = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    position: 1,
    rolls: 0,
    time: 0,
    rollHistory: [],
    isGameOver: false,
    entryId: null,
  });
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [animation, setAnimation] = useState<{
    type: 'transport' | 'celebration' | null;
    data?: any;
  }>({ type: null });

  // Timer effect
  useEffect(() => {
    if (!timerStarted || gameState.isGameOver) return;

    const interval = setInterval(() => {
      setGameState((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, gameState.isGameOver]);

  const checkSnakeOrLadder = useCallback((position: number) => {
    return allSnakesAndLadders.find((s) => s.start === position);
  }, []);

  const handleRoll = useCallback(() => {
    if (isRolling || gameState.isGameOver) return;

    // Start timer on first roll
    if (!timerStarted) {
      setTimerStarted(true);
    }

    setIsRolling(true);

    // Simulate dice roll
    const rollResult = Math.floor(Math.random() * 6) + 1;
    setDiceValue(rollResult);

    setTimeout(() => {
      setIsRolling(false);

      let newPosition = gameState.position + rollResult;

      // Can't go past 100
      if (newPosition > 100) {
        newPosition = gameState.position;
      }

      // Update game state with roll
      setGameState((prev) => ({
        ...prev,
        position: newPosition,
        rolls: prev.rolls + 1,
        rollHistory: [...prev.rollHistory, rollResult],
      }));

      // Check for snake or ladder
      const snakeOrLadder = checkSnakeOrLadder(newPosition);
      if (snakeOrLadder) {
        setAnimation({
          type: 'transport',
          data: {
            transport: snakeOrLadder.transport,
            type: snakeOrLadder.type,
            from: snakeOrLadder.start,
            to: snakeOrLadder.end,
          },
        });
      } else if (newPosition === 100) {
        // Game over - celebrate!
        handleGameComplete(newPosition);
      }
    }, 600);
  }, [gameState, isRolling, timerStarted, checkSnakeOrLadder]);

  const handleTransportComplete = useCallback(() => {
    const snakeOrLadder = checkSnakeOrLadder(gameState.position);
    if (snakeOrLadder) {
      const newPosition = snakeOrLadder.end;

      setGameState((prev) => ({
        ...prev,
        position: newPosition,
      }));

      setAnimation({ type: null });

      // Check if this move completes the game
      if (newPosition === 100) {
        setTimeout(() => handleGameComplete(newPosition), 100);
      }
    }
  }, [gameState.position, checkSnakeOrLadder]);

  const handleGameComplete = (finalPosition: number) => {
    setAnimation({ type: 'celebration' });

    // Save to leaderboard
    const entry = saveToLeaderboard({
      username: username!,
      time: gameState.time,
      rolls: gameState.rolls + 1, // Include the final roll
    });

    setGameState((prev) => ({
      ...prev,
      isGameOver: true,
      entryId: entry.id,
    }));
  };

  const handleCelebrationComplete = () => {
    setAnimation({ type: null });
  };

  const handlePlayAgain = () => {
    setGameState({
      position: 1,
      rolls: 0,
      time: 0,
      rollHistory: [],
      isGameOver: false,
      entryId: null,
    });
    setDiceValue(1);
    setTimerStarted(false);
  };

  const leaderboard = getLeaderboard();
  const playerRank = gameState.entryId ? getPlayerRank(gameState.entryId) : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-20 pb-8">
        {!username && <UsernameModal onSubmit={setUsername} />}

        {animation.type === 'transport' && (
          <TransportAnimation
            transport={animation.data.transport}
            type={animation.data.type}
            from={animation.data.from}
            to={animation.data.to}
            onComplete={handleTransportComplete}
          />
        )}

        {animation.type === 'celebration' && (
          <CelebrationAnimation onComplete={handleCelebrationComplete} />
        )}

        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="font-display text-3xl sm:text-5xl text-gradient-mumbai mb-2">
              ETHMumbai Maxi Checker
            </h1>
            {username && (
              <p className="text-muted-foreground">
                Playing as <span className="text-foreground font-semibold">{username}</span>
              </p>
            )}
          </div>

          {gameState.isGameOver ? (
            /* Game Over Screen */
            <div className="max-w-2xl mx-auto animate-fade-in">
              <MaxiCard
                username={username!}
                time={gameState.time}
                rolls={gameState.rolls}
                rank={playerRank}
                totalPlayers={leaderboard.length}
              />

              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={handlePlayAgain}
                  className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  Play Again 🎲
                </button>
                <Link
                  to="/leaderboard"
                  className="px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl text-center hover:opacity-90 transition-opacity"
                >
                  View Leaderboard 🏆
                </Link>
              </div>
            </div>
          ) : (
            /* Game Screen */
            <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
              {/* Game Board */}
              <GameBoard playerPosition={gameState.position} />

              {/* Controls */}
              <div className="lg:w-80 space-y-6">
                <GameStats
                  position={gameState.position}
                  rolls={gameState.rolls}
                  time={gameState.time}
                  rollHistory={gameState.rollHistory}
                />

                <div className="flex justify-center">
                  <Dice
                    value={diceValue}
                    isRolling={isRolling}
                    onRoll={handleRoll}
                    disabled={!username || gameState.isGameOver}
                  />
                </div>

                {/* Progress */}
                <div className="bg-card rounded-xl p-4 card-shadow">
                  <p className="text-sm text-muted-foreground mb-2">Progress to ETHMumbai</p>
                  <div className="h-4 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-mumbai transition-all duration-500"
                      style={{ width: `${gameState.position}%` }}
                    />
                  </div>
                  <p className="text-xs text-right mt-1 text-muted-foreground">
                    {gameState.position}/100
                  </p>
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

export default Index;
