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
      <div className="w-full max-w-md animate-scale-in">
        <div className="bg-card rounded-2xl p-8 card-shadow border border-border">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl sm:text-5xl text-gradient-mumbai mb-4">
              ETHMumbai Maxi Checker
            </h1>
            <p className="text-muted-foreground">
              Race to the ETHMumbai venue! Navigate Mumbai's transport to reach square 100.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Enter your name, Anon
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name..."
                maxLength={20}
                className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim()}
              className="w-full py-4 bg-gradient-mumbai text-primary-foreground font-bold text-lg rounded-xl transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed glow-primary"
            >
              Start Game 🎲
            </button>
          </form>

          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <h3 className="font-semibold text-sm mb-2">How to Play:</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
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
