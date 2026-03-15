import { motion } from 'framer-motion';
import { Cpu, Database, Network, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Technology() {
  const techStack = [
    {
      title: "AI Model",
      description: "Custom-trained deep learning classification models (e.g., EfficientNet, ResNet) fine-tuned on diverse dermatological datasets to assure high confidence predictions.",
      icon: <Cpu className="w-10 h-10 text-rose-400" />,
      color: "from-rose-500/20 to-rose-500/0"
    },
    {
      title: "Backend API",
      description: "A robust Flask-based Python backend handles incoming images, preprocesses them, and runs inference through PyTorch before safely returning the results.",
      icon: <Database className="w-10 h-10 text-indigo-400" />,
      color: "from-indigo-500/20 to-indigo-500/0"
    },
    {
      title: "Networking",
      description: "Optimized distributed architecture allowing secure, low-latency image transfer to the inference servers, ensuring privacy and rapid feedback.",
      icon: <Network className="w-10 h-10 text-amber-400" />,
      color: "from-amber-500/20 to-amber-500/0"
    },
    {
      title: "Frontend UI",
      description: "Built with React, TypeScript, and Tailwind CSS. Employs Framer Motion for smooth animations and shadcn/ui for accessible, sophisticated glassmorphism elements.",
      icon: <Code className="w-10 h-10 text-emerald-400" />,
      color: "from-emerald-500/20 to-emerald-500/0"
    }
  ];

  return (
    <div className="flex-1 w-full bg-background relative overflow-hidden flex flex-col items-center pt-20 pb-32">
      <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      
      <div className="container px-4 md:px-6 z-10 mx-auto">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-smbackdrop-blur-md"
          >
            System Architecture
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
          >
            Powered by Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-400">Tech Stack</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-lg text-muted-foreground"
          >
            SkinVision AI leverages a powerful synergy of modern frontend technologies, robust networking, and advanced artificial intelligence to deliver seamless analysis.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
            >
              <Card className="h-full bg-card/40 backdrop-blur-md border border-white/10 overflow-hidden relative group hover:border-white/20 transition-all duration-300">
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                <CardHeader>
                  <div className="mb-4 inline-flex p-3 rounded-2xl bg-black/40 border border-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <CardTitle className="text-2xl">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-[15px]">
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
