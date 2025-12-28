import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import creatorAvatar from '@/assets/creator-avatar.png';
import { Twitter, Github, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl sm:text-6xl text-gradient-mumbai mb-4">
                Meet the Builder
              </h1>
              <p className="text-muted-foreground">
                The story behind ETHMumbai Maxi Checker
              </p>
            </div>

            {/* Creator Card */}
            <div className="bg-card rounded-2xl p-8 card-shadow mb-12 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-primary/30 animate-pulse-glow">
                    <img
                      src={creatorAvatar}
                      alt="Creator"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-mumbai rounded-full flex items-center justify-center text-xl">
                    🚀
                  </div>
                </div>

                {/* Bio */}
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold mb-2">Builder Anon</h2>
                  <p className="text-primary font-medium mb-4">Web3 Developer & Mumbai Enthusiast</p>
                  <p className="text-muted-foreground">
                    Passionate about building fun, engaging experiences for the Web3 community. 
                    This game was created to celebrate the spirit of ETHMumbai and the amazing 
                    journey of getting to the venue through Mumbai's iconic transportation system!
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center sm:justify-start gap-4 mt-6 pt-6 border-t border-border">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Twitter className="w-5 h-5" />
                  <span className="text-sm font-medium">Twitter</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-muted rounded-lg hover:bg-secondary hover:text-secondary-foreground transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span className="text-sm font-medium">GitHub</span>
                </a>
              </div>
            </div>

            {/* Vision Section */}
            <div className="bg-card rounded-2xl p-8 card-shadow mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-display text-2xl text-gradient-crypto mb-4">The Vision</h3>
              <p className="text-muted-foreground mb-4">
                ETHMumbai Maxi Checker is more than just a game—it's a celebration of the 
                Ethereum community in India and the unique experience of navigating Mumbai's 
                legendary transportation network.
              </p>
              <p className="text-muted-foreground mb-4">
                From the iconic yellow-green auto rickshaws weaving through traffic, to the 
                lifeline Mumbai Local trains carrying millions daily, to the modern Vande 
                Bharat Express representing India's technological progress—each element of 
                this game reflects the vibrant energy of Mumbai.
              </p>
              <p className="text-muted-foreground">
                The goal? Simple. Get to ETHMumbai as fast as possible. Along the way, 
                you'll experience the thrills and spills of Mumbai transport. Take the 
                right train and zoom ahead. Take the wrong one and... well, you'll find 
                yourself a few stations back! 😅
              </p>
            </div>

            {/* ETHMumbai Badge */}
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="inline-block px-8 py-4 bg-gradient-mumbai rounded-2xl card-shadow">
                <p className="font-display text-2xl text-primary-foreground">
                  Built for ETHMumbai 2025 🇮🇳
                </p>
              </div>
            </div>

            {/* Back to Game */}
            <div className="text-center mt-12">
              <a
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground font-bold rounded-xl hover:opacity-90 transition-opacity"
              >
                ← Back to Game
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
