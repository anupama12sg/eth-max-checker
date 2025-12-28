import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { formatTime, getTier, getTierColor } from '@/lib/gameData';
import ethMumbaiLogo from '@/assets/ethmumbai.jpg';
import { Download, Twitter } from 'lucide-react';

interface MaxiCardProps {
  username: string;
  time: number;
  rolls: number;
  rank: number;
  totalPlayers: number;
}

const MaxiCard = ({ username, time, rolls, rank, totalPlayers }: MaxiCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const tier = getTier(rank, totalPlayers);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 0.95 });
      const link = document.createElement('a');
      link.download = `ethmumbai-maxi-card-${username}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    }
  };

  const handleShareTwitter = () => {
    const text = `🎮 I just completed the ETHMumbai Maxi Checker!

🏆 Rank: #${rank}
⏱️ Time: ${formatTime(time)}
🎲 Rolls: ${rolls}
🥇 Tier: ${tier}

I'm officially an ETHMumbai Maxi! 

#ETHMumbai #Web3 #Ethereum`;
    
    const url = encodeURIComponent(window.location.origin);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Card */}
      <div
        ref={cardRef}
        className="w-full max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-card via-muted to-card border-2 border-primary/30 card-shadow"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <img src={ethMumbaiLogo} alt="ETHMumbai" className="h-12 w-12" />
          <div className="text-right">
            <p className="text-xs text-muted-foreground">ETHMumbai 2025</p>
            <p className="font-display text-lg text-gradient-mumbai">MAXI CARD</p>
          </div>
        </div>

        {/* Player Name */}
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl text-foreground">{username}</h2>
          <div className={`inline-block mt-2 px-4 py-1 rounded-full bg-gradient-to-r ${getTierColor(tier)}`}>
            <span className="text-sm font-bold text-white">{tier}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Rank</p>
            <p className="text-2xl font-bold text-primary">#{rank}</p>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="text-2xl font-bold text-secondary">{formatTime(time)}</p>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground">Rolls</p>
            <p className="text-2xl font-bold text-accent">{rolls}</p>
          </div>
        </div>

        {/* Badge */}
        <div className="text-center p-4 bg-gradient-mumbai rounded-xl">
          <p className="font-display text-xl text-primary-foreground">
            I'm an ETHMumbai Maxi! 🚀
          </p>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-xs text-muted-foreground">
          Play at ethmumbai-maxi.lovable.app
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          <Download className="w-5 h-5" />
          Download
        </button>
        <button
          onClick={handleShareTwitter}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-mumbai text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-opacity"
        >
          <Twitter className="w-5 h-5" />
          Share on X
        </button>
      </div>
    </div>
  );
};

export default MaxiCard;
