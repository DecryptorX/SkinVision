
"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, AlertTriangle, ArrowLeft, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LocationMap } from '@/components/ui/expand-map';

interface PredictionData {
  condition: string;
  confidence: number;
  risk: string;
  suggestion: string;
}

export default function Prediction() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve data passed from Detection page via sessionStorage (client-side only mapping)
    const storedPreview = sessionStorage.getItem('imagePreview');
    const storedData = sessionStorage.getItem('predictionData');
    
    if (!storedPreview || !storedData) {
      router.push('/detect');
      return;
    }

    try {
      setImagePreview(storedPreview);
      setPrediction(JSON.parse(storedData));
    } catch (e) {
      router.push('/detect');
    }
  }, [router]);

  const getRiskColor = (risk: string) => {
    switch(risk?.toLowerCase()) {
      case 'low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'high': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch(risk?.toLowerCase()) {
      case 'low': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'high': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default: return null;
    }
  };

  if (!imagePreview || !prediction) {
    return <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white">Loading analysis...</div>;
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center py-12 px-4 bg-[#030303] relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container max-w-5xl z-10 mx-auto">
        <Link href="/detect" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Upload
        </Link>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold tracking-tight mb-12 text-white"
        >
          AI Analysis <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Result</span>
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm p-4 h-full">
              <div className="aspect-square rounded-xl overflow-hidden relative border border-white/5">
                <img src={imagePreview} alt="Uploaded skin condition" className="w-full h-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center h-full"
          >
            <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-xl overflow-hidden relative h-full flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500" />
              <CardHeader className="pb-4 pt-6">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-sm font-medium text-white/50 mb-1 tracking-wider uppercase">Predicted Condition</p>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-white leading-tight">{prediction.condition}</CardTitle>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shrink-0 ${getRiskColor(prediction.risk)}`}>
                    {getRiskIcon(prediction.risk)}
                    <span className="text-sm font-semibold">{prediction.risk} Risk</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8 flex-1 flex flex-col justify-between pb-6">
                <div>
                  <div className="flex justify-between items-end mb-3 mt-4">
                    <span className="text-sm font-medium text-white/60 uppercase tracking-widest">AI Confidence</span>
                    <span className="text-2xl font-bold text-indigo-400">{prediction.confidence}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.confidence}%` }}
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 mt-6">
                  <h4 className="text-sm font-semibold mb-3 text-white flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-400" />
                    Medical Suggestion
                  </h4>
                  <p className="text-[15px] text-white/70 leading-relaxed">
                    {prediction.suggestion}
                  </p>
                </div>

                <div className="pt-6 w-full mt-auto">
                  <Link href="/detect" className="w-full inline-block">
                    <Button className="w-full py-6 text-base rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all shadow-none">
                      Analyze Another Image
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Nearby Dermatologists Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14"
        >
          <div className="relative rounded-3xl border border-white/10 bg-black/20 backdrop-blur-sm p-6 md:p-8 overflow-hidden">
            {/* Subtle glow bg */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
            <LocationMap />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
