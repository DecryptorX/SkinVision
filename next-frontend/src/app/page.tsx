"use client";

import React from "react";
import { motion } from "framer-motion";
import { DotGlobeHero } from "@/components/ui/globe-hero";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <DotGlobeHero
      rotationSpeed={0.004}
      globeRadius={1.4}
      className="bg-gradient-to-br from-[#030303] via-[#030303]/95 to-indigo-950/10"
    >
      {/* Decorative glow blobs */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/50 via-transparent to-[#030303]/30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" />

      <div className="relative z-10 text-center space-y-10 max-w-5xl mx-auto px-6 pt-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-violet-500/20 border border-indigo-500/30 backdrop-blur-xl shadow-2xl"
        >
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
          <span className="relative z-10 text-sm font-bold text-indigo-300 tracking-wider uppercase">
            AI · Powered · Dermatology
          </span>
          <div className="w-2 h-2 bg-violet-400 rounded-full animate-ping" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9] text-white select-none"
        >
          <span className="block font-light text-white/60 mb-3 text-4xl md:text-5xl">
            Detect Skin Conditions
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-violet-400 to-rose-400 relative">
            Using AI
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80%" }}
              transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent rounded-full shadow-lg shadow-indigo-500/50"
            />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-2xl mx-auto text-xl text-white/60 leading-relaxed"
        >
          Upload a skin image and let our deep learning model analyze potential conditions in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4"
        >
          <Link href="/detect">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-indigo-500/25 overflow-hidden border border-indigo-400/20 transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.7 }}
              />
              <span className="relative z-10">Start Detection</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-white/10 rounded-xl font-semibold text-lg hover:border-indigo-500/40 transition-all duration-300 backdrop-blur-xl bg-white/5 hover:bg-white/10 shadow-lg"
            >
              <Zap className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-white">Learn More</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </DotGlobeHero>
  );
}
