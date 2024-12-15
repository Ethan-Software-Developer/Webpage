import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const PoemSection = () => {
  const poems = [
    {
      title: "My Heart's Symphony",
      content: "In the quiet of dawn\nWhere dreams still linger\nI find my thoughts\nDancing with your smile\nA melody of love\nPlaying in my heart",
      color: "from-love-300/20 to-love-400/10"
    },
    {
      title: "Forever Yours",
      content: "Through storms and sunshine\nThrough laughter and tears\nMy love for you grows\nWith each passing day\nA garden of emotions\nBlooming eternally",
      color: "from-love-200/20 to-love-300/10"
    },
    {
      title: "Starlit Dreams",
      content: "Under the starlit sky\nI whisper your name\nLike a gentle breeze\nCarrying my love\nTo wherever you are\nMy shooting star",
      color: "from-love-400/20 to-love-500/10"
    },
    {
      title: "Sweet Moments",
      content: "Every smile you share\nEvery laugh we create\nBecomes a treasure\nIn my heart's gallery\nPainted with the colors\nOf our endless love",
      color: "from-love-300/20 to-love-400/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const poemVariants = {
    hidden: { 
      y: 20,
      opacity: 0 
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden px-4">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="max-w-6xl mx-auto relative z-10"
      >
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-love-300 mb-12 text-center"
        >
          Love Poems for You
          <Sparkles className="inline-block ml-2 w-6 h-6" />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {poems.map((poem, index) => (
            <motion.div 
              key={index}
              variants={poemVariants}
              whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? -1 : 1 }}
              whileTap={{ scale: 0.98 }}
              className={`bg-gradient-to-br ${poem.color} p-8 rounded-lg backdrop-blur-sm 
                border border-love-300/10 hover:border-love-300/30 transition-all duration-300 
                relative group shadow-lg hover:shadow-love-300/20`}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart className="w-6 h-6 text-love-300 fill-love-300 animate-pulse" />
              </motion.div>
              
              <h3 className="text-xl md:text-2xl font-bold text-love-300 mb-4 relative">
                {poem.title}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-love-300/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </h3>
              <p className="poem-text text-base md:text-lg whitespace-pre-line leading-relaxed text-foreground/90
                first-letter:text-2xl first-letter:font-bold first-letter:text-love-300
                first-letter:mr-1 first-letter:float-left">
                {poem.content}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-100/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default PoemSection;