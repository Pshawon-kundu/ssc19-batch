import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WelcomePage() {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    // Main Container - Forces Dark Background
    <div className="min-h-screen w-full bg-emerald-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-emerald-50 selection:bg-emerald-500/30">
      
      {/* Background with explicit color to ensure no white flash */}
      <div className="absolute inset-0 bg-emerald-950 -z-30" />

      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-teal-600/10 rounded-full blur-[120px]" />
        {/* Noise overlay for texture */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center gap-12 sm:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* HERO TITLE SECTION */}
        <div className="flex flex-col items-center justify-center relative">
            {/* Main Brand Text - High Contrast & Front */}
            <h1 className="relative flex flex-wrap justify-center items-baseline gap-x-2 sm:gap-x-4 font-black leading-none tracking-tight select-none z-20"
                style={{ 
                    fontSize: "clamp(3rem, 10vw, 8rem)", 
                    textShadow: "0 20px 50px rgba(0,0,0,0.5)" 
                }}
            >
                <div className="flex">
                    {"PILOTIAN".split("").map((char, i) => (
                         <motion.span key={i} variants={letterVariants} className="text-white drop-shadow-2xl">
                            {char}
                         </motion.span>
                    ))}
                </div>
                <motion.span variants={letterVariants} className="text-emerald-400 drop-shadow-2xl pl-2">
                    '19
                </motion.span>
            </h1>

             {/* Subtitle - Increased margins to prevent clash */}
             <motion.div variants={letterVariants} className="mt-8 space-y-3">
                <p className="text-emerald-300 font-bold tracking-[0.3em] uppercase text-xs sm:text-base">
                    SSC Batch Class of 2019
                </p>
                <p className="text-white/70 text-sm sm:text-lg font-light italic">
                    Iftar Party Reunion
                </p>
             </motion.div>
        </div>

        {/* INFO BAR - Professional Glassmorphism */}
        <motion.div 
            variants={letterVariants}
            className="w-full max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10"
        >
            <div className="grid grid-cols-3 divide-x divide-white/10">
                {/* Date */}
                <div className="p-4 sm:p-6 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Date</span>
                    <span className="text-sm sm:text-xl font-bold text-white whitespace-nowrap">Ramadan 2026</span>
                </div>

                {/* Time */}
                <div className="p-4 sm:p-6 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Time</span>
                    <span className="text-sm sm:text-xl font-bold text-white whitespace-nowrap">Iftar Onwards</span>
                </div>

                {/* Batch */}
                <div className="p-4 sm:p-6 flex flex-col items-center justify-center group hover:bg-white/5 transition-colors">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Batch Size</span>
                    <span className="text-sm sm:text-xl font-bold text-white whitespace-nowrap">120+ Members</span>
                </div>
            </div>
        </motion.div>

        {/* CTA BUTTON - Increased spacing */}
        <div className="pt-4 z-20">
            <motion.button
                variants={letterVariants}
                onClick={() => navigate("/event")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-10 py-4 bg-white text-emerald-950 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-15px_rgba(255,255,255,0.5)] transition-all duration-300 cursor-pointer"
            >
                Enter Event
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 text-emerald-600" />
            </motion.button>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
            <motion.p 
                variants={letterVariants}
                className="text-[10px] uppercase tracking-widest text-white/20"
            >
                Reconnect • Celebrate • Remember
            </motion.p>
        </div>

      </motion.div>
    </div>
  );
}
