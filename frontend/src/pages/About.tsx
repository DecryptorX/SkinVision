import { Brain, Scan, Shield, Microscope } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function About() {
  const features = [
    {
      title: "What is SkinVision",
      description: "An advanced AI-powered web platform designed to analyze skin images and detect potential dermatological conditions using state-of-the-art computer vision models.",
      icon: <Brain className="h-8 w-8 text-indigo-400" />
    },
    {
      title: "Why AI Detection Matters",
      description: "Early detection of skin conditions is crucial. AI assists by providing immediate preliminary analysis, helping to triage and raise awareness of potential issues before they worsen.",
      icon: <Scan className="h-8 w-8 text-rose-400" />
    },
    {
      title: "How it Helps Users",
      description: "Users can quickly upload photos of concerning skin irregularities from the comfort of their home, receiving instant feedback on whether they should seek professional medical advice.",
      icon: <Shield className="h-8 w-8 text-violet-400" />
    },
    {
      title: "Not a Medical Diagnosis",
      description: "Disclaimer: This tool provides probabilistic analysis, not a definitive medical diagnosis. Always consult a certified dermatologist for professional medical advice and treatment.",
      icon: <Microscope className="h-8 w-8 text-amber-400" />
    }
  ];

  return (
    <div className="flex-1 w-full bg-background relative overflow-hidden flex flex-col items-center justify-center py-20">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary/5 to-background pointer-events-none" />
      
      <div className="container px-4 md:px-6 z-10 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">SkinVision AI</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-[700px] text-lg text-muted-foreground"
          >
            Empowering individuals with rapid, AI-driven dermatological preliminary analysis.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (i * 0.1) }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-white/5 hover:border-white/10 transition-colors shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 border border-white/10 shadow-inner">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
