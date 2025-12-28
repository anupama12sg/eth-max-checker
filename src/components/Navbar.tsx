import { Link, useLocation } from 'react-router-dom';
import ethMumbaiLogo from '@/assets/ethmumbai.jpg';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={ethMumbaiLogo} alt="ETHMumbai" className="h-8 w-8 object-contain" />
            <span className="font-display text-lg text-gradient-mumbai hidden sm:block">
              ETHMumbai Maxi
            </span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-4">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                isActive('/') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Game
            </Link>
            <Link
              to="/leaderboard"
              className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
                isActive('/leaderboard') 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Leaderboard
            </Link>
            <Link
              to="/about"
              className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-all ${
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
