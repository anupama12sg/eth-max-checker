import { useState } from 'react';

interface UsernameModalProps {
  onSubmit: (username: string) => void;
}

const UsernameModal = ({ onSubmit }: UsernameModalProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm animate-scale-in">
        <div className="bg-card rounded-xl p-6 card-shadow border border-border">
          <div className="text-center mb-6">
            <h1 className="font-display text-3xl sm:text-4xl text-gradient-mumbai mb-2">
              ETHMumbai Maxi Checker
            </h1>
            <p className="text-sm text-muted-foreground">
              Race to ETHMumbai! Navigate Mumbai's transport to reach square 100.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Enter your name, Anon
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name..."
                maxLength={20}
                className="w-full px-3 py-2 bg-muted border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim()}
              className="w-full py-3 bg-gradient-mumbai text-foreground font-bold rounded-lg transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
            >
              Start Game 🎲
            </button>
          </form>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-xs mb-1.5">How to Play:</h3>
            <ul className="text-[10px] text-muted-foreground space-y-0.5">
              <li>🛺 Auto Rickshaws boost you up a few squares</li>
              <li>🚃 Mumbai Locals take you further up</li>
              <li>🚄 Vande Bharat Express rockets you ahead!</li>
              <li>🐍 Wrong trains slide you back down</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsernameModal;
