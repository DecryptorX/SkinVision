import { Link } from 'react-router-dom';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">SkinVision AI</span>
        </Link>
        
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">About</Link>
          <Link to="/detect" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Detection</Link>
          <Link to="/technology" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Technology</Link>
        </div>

        <div className="hidden md:flex">
          <Button asChild className="rounded-full shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/detect">Start Detection</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-border/50 bg-background/95 p-4 md:hidden backdrop-blur-xl absolute w-full flex flex-col gap-4 shadow-xl">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">About</Link>
          <Link to="/detect" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Detection</Link>
          <Link to="/technology" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-muted-foreground hover:text-foreground">Technology</Link>
          <Button asChild className="mt-2 w-full rounded-full">
            <Link to="/detect" onClick={() => setIsOpen(false)}>Start Detection</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
