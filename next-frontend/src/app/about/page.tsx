"use client";
import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Brain, Scan, Shield, Microscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const features = [
    {
      title: "What is SkinVision",
      description: "An advanced AI-powered web platform designed to analyze skin images and detect potential dermatological conditions using state-of-the-art computer vision models.",
      icon: <Brain className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Why AI Skin Detection Matters",
      description: "Early detection of skin conditions is crucial. AI assists by providing immediate preliminary analysis, helping to triage and raise awareness of potential issues before they worsen.",
      icon: <Scan className="h-8 w-8 text-rose-400" />
    },
    {
      title: "Benefits of Early Detection",
      description: "Users can quickly upload photos of concerning skin irregularities from the comfort of their home, receiving instant feedback on whether they should seek professional medical advice.",
      icon: <Shield className="h-8 w-8 text-violet-400" />
    },
    {
      title: "Medical Disclaimer",
      description: "This tool provides probabilistic analysis, not a definitive medical diagnosis. Always consult a certified dermatologist for professional medical advice and treatment.",
      icon: <Microscope className="h-8 w-8 text-amber-400" />
    }
  ];

  return (
    <div className="flex-1 w-full bg-[#030303] flex flex-col items-center">
      <div className="w-full">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl md:text-6xl font-semibold text-white mb-4">
                About the Project
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-white/60 mb-8 px-4">
                Learn how SkinVision utilizes cutting-edge AI to provide instant dermatological preliminary analysis.
              </p>
            </>
          }
        >
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2680&auto=format&fit=crop"
            alt="Dermatology Analysis Dashboard"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </ContainerScroll>
      </div>

      <div className="container px-4 md:px-6 z-10 mx-auto pb-32">
        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <Card className="h-full bg-white/5 backdrop-blur-md border-white/10 hover:border-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-black/40 border border-white/10 shadow-inner">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base text-white/60 leading-relaxed">
                    {feature.description}
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
