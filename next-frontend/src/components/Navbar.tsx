"use client";
import Link from 'next/link';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#030303]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <BrainCircuit className="h-6 w-6 text-indigo-400" />
          <span className="text-lg font-bold tracking-tight text-white">SkinVision AI</span>
        </Link>
        
        <div className="hidden md:flex md:items-center md:gap-8">
          <Link href="/" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Home</Link>
          <Link href="/about" className="text-sm font-medium text-white/60 transition-colors hover:text-white">About</Link>
          <Link href="/detect" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Detection</Link>
          <Link href="/technology" className="text-sm font-medium text-white/60 transition-colors hover:text-white">Technology</Link>
        </div>

        <div className="hidden md:flex">
          <Link href="/detect">
            <Button className="rounded-full shadow-lg shadow-indigo-500/20 bg-indigo-500 text-white hover:bg-indigo-600 transition-all">
              Start Detection
            </Button>
          </Link>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[#030303]/95 p-4 md:hidden backdrop-blur-xl absolute w-full flex flex-col gap-4 shadow-xl">
          <Link href="/" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-white/60 hover:text-white">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-white/60 hover:text-white">About</Link>
          <Link href="/detect" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-white/60 hover:text-white">Detection</Link>
          <Link href="/technology" onClick={() => setIsOpen(false)} className="block text-sm font-medium text-white/60 hover:text-white">Technology</Link>
          <Link href="/detect" onClick={() => setIsOpen(false)}>
            <Button className="mt-2 w-full rounded-full bg-indigo-500 hover:bg-indigo-600 text-white">
              Start Detection
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
