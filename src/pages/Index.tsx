import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import HeartScene from "@/components/HeartScene";
import PoemSection from "@/components/PoemSection";
import LoveNotes from "@/components/LoveNotes";
import ParticlesBackground from "@/components/ParticlesBackground";

const Index = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <ParticlesBackground />
      <div className="relative z-10">
        <Hero />
        <HeartScene />
        <PoemSection />
        <LoveNotes />
      </div>
    </div>
  );
};

export default Index;