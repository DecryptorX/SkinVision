import { Link } from 'react-router-dom';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 mb-4">
              <BrainCircuit className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">SkinVision AI</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              SkinVision AI — AI Powered Skin Condition Detection using deep learning models to analyze potential skin conditions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/detect" className="text-sm text-muted-foreground hover:text-primary transition-colors">Detection</Link></li>
              <li><Link to="/prediction" className="text-sm text-muted-foreground hover:text-primary transition-colors">Prediction Demo</Link></li>
              <li><Link to="/technology" className="text-sm text-muted-foreground hover:text-primary transition-colors">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-foreground">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SkinVision AI. All rights reserved.</p>
        <p className="text-xs text-muted-foreground font-medium">Not a medical diagnosis tool.</p>
      </div>
    </footer>
  );
}
