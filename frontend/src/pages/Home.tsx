import { Link } from 'react-router-dom';
import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { BrainCircuit } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      <HeroGeometric
        badge={
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-primary" />
            <span className="font-semibold text-primary">SkinVision AI</span>
          </div>
        }
        title1="Detect Skin Conditions"
        title2="Using Artificial Intelligence"
      >
        <p className="max-w-2xl text-lg text-muted-foreground/80 md:text-xl mb-12">
          Upload an image and let AI analyze potential skin conditions using deep learning models. Fast, private, and powered by state-of-the-art vision models.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link to="/detect">
            <InteractiveHoverButton text="Start Detection" className="w-48 py-3 text-lg" />
          </Link>
          <Link to="/about">
            <InteractiveHoverButton text="Learn More" className="w-48 py-3 text-lg bg-background/20 border-border hover:bg-white/10 text-foreground" />
          </Link>
        </div>
      </HeroGeometric>
    </div>
  );
}
