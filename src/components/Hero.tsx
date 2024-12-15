import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star, Music2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Hero = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number }[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const { toast } = useToast();

  const addHeart = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
    const size = Math.random() * 20 + 20; // Random size between 20-40px
    
    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime;
    
    if (timeDiff < 1000) { // If clicks are less than 1 second apart
      setCombo(prev => prev + 1);
      if (combo > 0 && combo % 5 === 0) {
        toast({
          title: "Combo x" + (combo + 1),
          description: "You're on fire! 🔥",
          duration: 2000,
        });
      }
    } else {
      setCombo(0);
    }
    
    setLastClickTime(currentTime);
    setScore(prev => prev + (combo + 1));
    
    const newHeart = { id: Date.now(), x, y, size };
    setHearts(prev => [...prev, newHeart]);
    
    setTimeout(() => {
      setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center flex-col p-4 relative overflow-hidden"
      onTouchStart={addHeart}
      onClick={addHeart}
    >
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ scale: 0, x: heart.x, y: heart.y }}
            animate={{ 
              scale: [1, 0],
              y: [heart.y, heart.y - 100],
              opacity: [1, 0]
            }}
            transition={{ duration: 1 }}
            className="absolute text-love-300"
            style={{ width: heart.size, height: heart.size }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360]
              }}
              transition={{
                duration: 1,
                ease: "linear"
              }}
            >
              <Heart className="w-full h-full fill-love-300" />
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute top-4 right-4 bg-love-400/20 backdrop-blur-sm rounded-lg p-3 text-love-300 font-bold"
      >
        Score: {score}
        {combo > 1 && <div className="text-sm">Combo x{combo}! 🔥</div>}
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mb-8"
      >
        <Star className="w-12 h-12 text-love-300 animate-pulse" />
      </motion.div>

      <motion.h1 
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.8, type: "spring" }}
        className="text-4xl md:text-7xl font-bold text-love-300 mb-6 text-center hover:text-love-400 transition-colors duration-300 animate-glow"
      >
        For My Love
      </motion.h1>

      <motion.p 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-lg md:text-2xl text-foreground/80 max-w-2xl text-center leading-relaxed px-4"
      >
        Tap anywhere to spread love! ❤️
      </motion.p>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="mt-8 relative"
      >
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="bg-love-400/20 hover:bg-love-400/30 text-love-300 px-6 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-love-300/20 hover:border-love-300/40 active:scale-95 transform group"
        >
          <span className="flex items-center gap-2">
            Explore Our Love Story
            <Music2 className="w-4 h-4 group-hover:animate-bounce" />
          </span>
        </button>
      </motion.div>

      <div className="fixed bottom-4 left-4 text-sm text-love-300/60">
        Tip: Tap faster for combos! 💕
      </div>
    </motion.div>
  );
};

export default Hero;