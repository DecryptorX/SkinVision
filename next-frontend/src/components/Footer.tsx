import Link from 'next/link';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#030303]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80 mb-4">
              <BrainCircuit className="h-6 w-6 text-indigo-400" />
              <span className="text-lg font-bold tracking-tight text-white">SkinVision AI</span>
            </Link>
            <p className="text-sm text-white/60 max-w-xs">
              SkinVision AI — AI Powered Skin Condition Detection using deep learning models to analyze potential skin conditions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white">Navigation</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-white/60 hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-sm text-white/60 hover:text-indigo-400 transition-colors">About</Link></li>
              <li><Link href="/detect" className="text-sm text-white/60 hover:text-indigo-400 transition-colors">Detection</Link></li>
              <li><Link href="/prediction" className="text-sm text-white/60 hover:text-indigo-400 transition-colors">Prediction Demo</Link></li>
              <li><Link href="/technology" className="text-sm text-white/60 hover:text-indigo-400 transition-colors">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4 text-white">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-indigo-400 transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-indigo-400 transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-indigo-400 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between">
        <p className="text-xs text-white/60">&copy; {new Date().getFullYear()} SkinVision AI. All rights reserved.</p>
        <p className="text-xs text-white/60 font-medium">Not a medical diagnosis tool.</p>
      </div>
    </footer>
  );
}
