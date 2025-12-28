import { Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border py-2">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between text-xs">
          <p className="text-muted-foreground">
            Built in Mumbai Local for <span className="text-primary font-semibold">ETHMumbai 2026</span>
          </p>
          
          <a
            href="https://x.com/Anu31415"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
