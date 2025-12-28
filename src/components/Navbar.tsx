import { Link, useLocation } from 'react-router-dom';
import ethMumbaiLogo from '@/assets/ethmumbai-logo.png';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src={ethMumbaiLogo} alt="ETHMumbai" className="h-10 w-10 object-contain" />
            <span className="font-display text-xl text-gradient-mumbai hidden sm:block">
              ETHMumbai Maxi
            </span>
          </Link>
          
          <div className="flex items-center gap-2 sm:gap-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Game
            </Link>
            <Link
              to="/leaderboard"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/leaderboard') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg font-medium transition-all ${
                isActive('/about') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
