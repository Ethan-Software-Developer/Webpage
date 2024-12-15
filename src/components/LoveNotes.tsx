import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Music2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const LoveNotes = () => {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [unlockedNotes, setUnlockedNotes] = useState<number[]>([0]);
  const { toast } = useToast();
  
  const notes = [
    "Your smile brightens my darkest days",
    "Every moment with you is magical",
    "You are my dream come true",
    "My heart beats only for you",
  ];

  const icons = [Heart, Star, Sparkles, Music2];

  const handleNoteClick = (index: number) => {
    if (!unlockedNotes.includes(index)) {
      if (index === unlockedNotes.length) {
        setUnlockedNotes(prev => [...prev, index]);
        toast({
          title: "New note unlocked! 🎉",
          description: "Keep exploring to unlock more love notes!",
          duration: 3000,
        });
      } else {
        toast({
          title: "Note locked 🔒",
          description: "Unlock previous notes first!",
          variant: "destructive",
          duration: 2000,
        });
        return;
      }
    }
    setSelectedNote(selectedNote === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {notes.map((note, index) => {
            const Icon = icons[index];
            const isLocked = !unlockedNotes.includes(index);
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -1 : 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNoteClick(index)}
                className={`group relative bg-gradient-to-br from-love-400/10 to-love-400/5 p-6 rounded-lg backdrop-blur-sm border border-love-300/20 hover:border-love-300/40 transition-all duration-300 cursor-pointer ${
                  selectedNote === index ? 'ring-2 ring-love-300' : ''
                } ${isLocked ? 'opacity-50' : ''}`}
              >
                <motion.div
                  animate={selectedNote === index ? { 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 0.9, 1.1, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="absolute -top-3 -right-3"
                >
                  <Icon className={`w-6 h-6 text-love-300 ${!isLocked ? 'fill-love-300/50 group-hover:fill-love-300' : ''} transition-colors duration-300`} />
                </motion.div>
                {isLocked ? (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-love-300/70">🔒 Unlock this note</span>
                  </div>
                ) : (
                  <p className="text-lg md:text-xl text-center font-medium text-foreground/90">{note}</p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default LoveNotes;