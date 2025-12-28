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
  const [isMoving, setIsMoving] = useState(false);
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
    setIsMoving(true);

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

      setTimeout(() => setIsMoving(false), 400);

      // Check for snake or ladder
      const snakeOrLadder = checkSnakeOrLadder(newPosition);
      if (snakeOrLadder) {
        setTimeout(() => {
          setAnimation({
            type: 'transport',
            data: {
              transport: snakeOrLadder.transport,
              type: snakeOrLadder.type,
              from: snakeOrLadder.start,
              to: snakeOrLadder.end,
            },
          });
        }, 300);
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

      setIsMoving(true);
      setGameState((prev) => ({
        ...prev,
        position: newPosition,
      }));

      setTimeout(() => setIsMoving(false), 400);
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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Navbar />

      <main className="flex-1 pt-16 pb-2 overflow-hidden">
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

        <div className="container mx-auto px-2 h-full flex flex-col">
          {gameState.isGameOver ? (
            /* Game Over Screen */
            <div className="flex-1 flex items-center justify-center overflow-auto py-4">
              <div className="w-full max-w-lg">
                <MaxiCard
                  username={username!}
                  time={gameState.time}
                  rolls={gameState.rolls}
                  rank={playerRank}
                  totalPlayers={leaderboard.length}
                />

                <div className="mt-6 flex justify-center gap-3">
                  <button
                    onClick={handlePlayAgain}
                    className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:opacity-90 transition-opacity text-sm"
                  >
                    Play Again 🎲
                  </button>
                  <Link
                    to="/leaderboard"
                    className="px-6 py-2 bg-secondary text-secondary-foreground font-bold rounded-lg text-center hover:opacity-90 transition-opacity text-sm"
                  >
                    Leaderboard 🏆
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Game Screen - Single Screen Layout */
            <div className="flex-1 flex flex-col lg:flex-row gap-3 items-center justify-center">
              {/* Game Board */}
              <div className="flex-shrink-0 w-full max-w-[min(100%,420px)] lg:max-w-[450px]">
                <GameBoard playerPosition={gameState.position} isMoving={isMoving} />
              </div>

              {/* Controls Panel - Side on desktop, below on mobile */}
              <div className="w-full lg:w-64 flex flex-col gap-3">
                {/* Title - Mobile only shows small version */}
                <div className="text-center lg:text-left">
                  <h1 className="font-display text-xl sm:text-2xl lg:text-3xl text-gradient-mumbai">
                    ETHMumbai Maxi
                  </h1>
                  {username && (
                    <p className="text-xs text-muted-foreground">
                      Playing as <span className="text-foreground font-semibold">{username}</span>
                    </p>
                  )}
                </div>

                {/* Stats */}
                <GameStats
                  position={gameState.position}
                  rolls={gameState.rolls}
                  time={gameState.time}
                  rollHistory={gameState.rollHistory}
                />

                {/* Dice and Roll Button */}
                <div className="flex justify-center lg:justify-start">
                  <Dice
                    value={diceValue}
                    isRolling={isRolling}
                    onRoll={handleRoll}
                    disabled={!username || gameState.isGameOver}
                  />
                </div>

                {/* Progress Bar */}
                <div className="bg-card/80 rounded-lg p-3 border border-border">
                  <p className="text-[10px] text-muted-foreground mb-1">Progress</p>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-mumbai transition-all duration-500"
                      style={{ width: `${gameState.position}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-right mt-0.5 text-muted-foreground">
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
