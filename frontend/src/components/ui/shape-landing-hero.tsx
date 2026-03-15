import React from "react";
import { motion } from "framer-motion";

interface HeroGeometricProps {
  badge: React.ReactNode;
  title1: string;
  title2: string;
  children: React.ReactNode;
}

export function HeroGeometric({ badge, title1, title2, children }: HeroGeometricProps) {
  return (
    <div className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden bg-[#030303] text-foreground pt-16">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-indigo-500/20 blur-[120px]"
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-rose-500/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[20%] h-[30%] w-[30%] rounded-full bg-violet-500/20 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute bottom-[30%] left-[20%] h-[40%] w-[40%] rounded-full bg-amber-500/10 blur-[120px]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center rounded-full border border-border/50 bg-white/5 px-4 py-1.5 text-sm text-foreground backdrop-blur-md"
        >
          {badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 max-w-4xl leading-tight"
        >
          {title1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-rose-400">
            {title2}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex-col items-center justify-center flex"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
