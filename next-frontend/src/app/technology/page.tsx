"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Cpu, Database, Network, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Technology() {
  const techStack = [
    {
      title: "AI Model",
      description: "Deep learning CNN model trained on massive dermatology image datasets capable of accurately classifying over 20+ distinct skin conditions.",
      icon: <Cpu className="w-10 h-10 text-rose-400" />,
      color: "from-rose-500/20 to-rose-500/0"
    },
    {
      title: "Backend Core",
      description: "Lightweight and fully independent Flask Python API securely handling model inference and returning JSON formatted confidence metrics.",
      icon: <Database className="w-10 h-10 text-indigo-400" />,
      color: "from-indigo-500/20 to-indigo-500/0"
    },
    {
      title: "Image Processing",
      description: "Immediate client-side rendering utilizing safe memory buffers paired with robust Python Pillow normalization workflows prior to ML analysis.",
      icon: <Network className="w-10 h-10 text-amber-400" />,
      color: "from-amber-500/20 to-amber-500/0"
    },
    {
      title: "Frontend Interface",
      description: "Immersive Next.js 'App Router' application enhanced exclusively by Tailwind CSS and hardware-accelerated Framer Motion interactions.",
      icon: <Code className="w-10 h-10 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-500/0"
    }
  ];

  return (
    <div className="flex-1 w-full bg-[#030303] flex flex-col items-center">
      <div className="w-full">
        <ContainerScroll
          titleComponent={
            <>
              <div className="mb-6 inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
                System Architecture
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Powered by a Modern <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">Tech Stack</span>
              </h1>
            </>
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/tech-screenshot.png?v=${Date.now()}`}
            alt="SkinVision AI Technology Stack Screenshot"
            className="mx-auto rounded-2xl object-cover w-full h-full object-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="container px-4 md:px-6 z-10 mx-auto pb-32">
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden relative group hover:border-white/20 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-2xl bg-black/50 border border-white/5 shadow-inner transition-transform duration-300 group-hover:-translate-y-1">
                    {tech.icon}
                  </div>
                  <CardTitle className="text-2xl text-white">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/60 leading-relaxed text-[15px]">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
