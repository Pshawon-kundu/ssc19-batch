import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WelcomePage() {
  const navigate = useNavigate();

  // Animation variants for staggered text
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 100, opacity: 0, rotateX: -90 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  const titleText = "PILOTIAN'19";

  return (
    <>
      {/* Dark Green Gradient Background */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900 via-emerald-950 to-black -z-20" />

      {/* Animated Sheen/Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4">
        
        {/* Main Title - Single Line Animated */}
        <motion.div
          className="relative perspective-1000 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex overflow-hidden pb-4 sm:pb-8"> {/* Padding for shadow spread */}
             {titleText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-200"
                style={{
                  fontSize: "clamp(3.5rem, 14vw, 9rem)",
                  textShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
                  lineHeight: 1,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center space-y-2 mb-16"
        >
            <p className="text-emerald-300 font-bold tracking-[0.2em] uppercase text-sm sm:text-lg">
                SSC BATCH CLASS OF 2019
            </p>
            <p className="text-white/80 font-light text-base sm:text-xl">
                Iftar Party Reunion
            </p>
        </motion.div>

        {/* Info Bar - 1 Line Smart Layout */}
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ delay: 1.6, duration: 0.8, type: "spring", bounce: 0 }}
          className="w-full max-w-2xl mb-16"
        >
          <div className="relative mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
             
            {/* Glossy overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center justify-between divide-y sm:divide-y-0 sm:divide-x divide-white/10 p-4 sm:p-6 text-white">
                
                {/* Date */}
                <div className="flex-1 w-full sm:w-auto text-center py-2 sm:py-0">
                    <span className="block text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-1">Date</span>
                    <span className="text-lg sm:text-xl font-semibold tracking-tight">Ramadan 2026</span>
                </div>

                {/* Time */}
                <div className="flex-1 w-full sm:w-auto text-center py-2 sm:py-0">
                    <span className="block text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-1">Time</span>
                    <span className="text-lg sm:text-xl font-semibold tracking-tight">Iftar Onwards</span>
                </div>

                {/* Batch */}
                <div className="flex-1 w-full sm:w-auto text-center py-2 sm:py-0">
                    <span className="block text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-1">Batch</span>
                     <span className="text-lg sm:text-xl font-semibold tracking-tight">Size 120+</span>
                </div>

            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          onClick={() => navigate("/event")}
          className="group relative inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(5,150,105,0.4)] hover:shadow-[0_0_30px_rgba(5,150,105,0.6)]"
        >
          <span>Enter Event</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </motion.button>

        {/* Footer */}
        <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2.5 }}
             className="fixed bottom-6 text-[10px] text-emerald-500/50 uppercase tracking-[0.3em]"
        >
            Reconnect • Celebrate • Remember
        </motion.p>

      </div>
    </>
  );
}
