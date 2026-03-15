"use client";
import React, { useState } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Detection() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) return;
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('https://skinvision-production.up.railway.app/api/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Prediction request failed');
      }
      
      const data = await response.json();
      
      // Store preview in sessionStorage since we can't easily pass it in App Router state
      sessionStorage.setItem('imagePreview', preview as string);
      sessionStorage.setItem('predictionData', JSON.stringify(data));
      
      router.push('/prediction');
    } catch (error) {
      console.error(error);
      alert('Failed to analyze image. Ensure the backend is reachable at skinvision-production.up.railway.app.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden">
      <div className="absolute top-[20%] right-[10%] h-[30%] w-[30%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] h-[30%] w-[30%] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 z-10"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Upload Skin Image <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
            For AI Analysis
          </span>
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          Drag and drop a clear, well-lit image of the skin condition, or browse your files to let the AI analyze it.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-2xl z-10"
      >
        {!preview ? (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-80 rounded-2xl border-2 border-dashed transition-all duration-300 ease-out group 
              ${isDragging ? 'border-indigo-500 bg-indigo-500/5 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 'border-white/20 bg-black/40 hover:border-indigo-500/50 hover:bg-white/5'}
            `}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <div className="mb-4 p-4 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-indigo-400" />
              </div>
              <p className="mb-2 text-lg font-semibold text-white">
                Drag & Drop here
              </p>
              <p className="text-sm text-white/60 mb-6">
                PNG, JPG, JPEG up to 10MB
              </p>
              
              <label htmlFor="dropzone-file" className="cursor-pointer">
                <div className="px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 font-medium hover:bg-indigo-500/20 transition-colors">
                  Browse Files
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            </div>
          </div>
        ) : (
          <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-black/40 shadow-xl backdrop-blur-sm">
            <button 
              onClick={clearFile}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-red-500 text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full max-w-sm aspect-square mb-8 rounded-xl overflow-hidden border border-white/10 shadow-lg relative">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-2 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-medium text-white">
                <ImageIcon className="w-4 h-4" />
                {file?.name}
              </div>
            </div>
            
            <Button 
              onClick={handleAnalyze} 
              disabled={isLoading}
              className={`w-64 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:opacity-90 ${isLoading ? "opacity-50" : ""}`}
            >
              {isLoading ? "Analyzing Image..." : "Analyze Image"}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
