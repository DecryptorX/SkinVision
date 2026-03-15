import { useLocation, Link, Navigate } from 'react-router-dom';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Prediction() {
  const location = useLocation();
  const imagePreview = location.state?.imagePreview;
  const predictionData = location.state?.predictionData;

  // Use dynamic prediction data from backend or fallback to mock
  const prediction = predictionData || {
    condition: "Actinic Keratosis",
    confidence: 87,
    risk: "Medium",
    suggestion: "We detected patterns consistent with Actinic Keratosis. While not immediately life-threatening, it is considered pre-cancerous. Please schedule a consultation with a dermatologist for a professional evaluation."
  };

  const getRiskColor = (risk: string) => {
    switch(risk.toLowerCase()) {
      case 'low': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'high': return 'text-rose-400 bg-rose-400/10 border-rose-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch(risk.toLowerCase()) {
      case 'low': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'high': return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default: return null;
    }
  };

  if (!imagePreview) {
    return <Navigate to="/detect" replace />;
  }

  return (
    <div className="flex-1 w-full flex flex-col items-center py-12 px-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/20 via-background to-background pointer-events-none" />
      
      <div className="container max-w-5xl z-10 mx-auto">
        <Link to="/detect" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Upload
        </Link>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
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
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 backdrop-blur-sm p-4">
              <div className="aspect-square rounded-xl overflow-hidden relative">
                <img src={imagePreview} alt="Uploaded skin condition" className="w-full h-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <Card className="bg-card/40 backdrop-blur-md border-white/10 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-rose-500" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Predicted Condition</p>
                    <CardTitle className="text-2xl md:text-3xl font-bold">{prediction.condition}</CardTitle>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${getRiskColor(prediction.risk)}`}>
                    {getRiskIcon(prediction.risk)}
                    <span className="text-sm font-semibold">{prediction.risk} Risk</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-muted-foreground">AI Confidence</span>
                    <span className="text-xl font-bold text-primary">{prediction.confidence}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${prediction.confidence}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="text-sm font-semibold mb-2 text-foreground">Next Steps / Suggestion</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {prediction.suggestion}
                  </p>
                </div>

                <div className="pt-4 flex justify-center w-full">
                  <Link to="/detect" className="w-full">
                    <InteractiveHoverButton text="Upload Another Image" className="w-full py-4 text-base" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
