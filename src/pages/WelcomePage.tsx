import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Dark overlay background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 -z-20" />

      {/* Animated background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/3 -left-1/4 w-96 h-96 bg-gradient-to-br from-blue-500 to-transparent rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-1/3 -right-1/4 w-96 h-96 bg-gradient-to-tl from-cyan-500 to-transparent rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-blue-600 to-transparent rounded-full blur-3xl opacity-15 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 py-12">
        <motion.div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Animated icon badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-4xl"
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Main title - PILOTIAN */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1
              className="font-black tracking-tight leading-none"
              style={{
                fontSize: "clamp(4rem, 15vw, 10rem)",
                color: "white",
                textShadow: `
                  0 0 20px rgba(59, 130, 246, 0.8),
                  0 0 40px rgba(59, 130, 246, 0.6),
                  0 0 60px rgba(34, 197, 94, 0.5),
                  0 0 80px rgba(59, 130, 246, 0.3)
                `,
                letterSpacing: "-0.02em",
              }}
            >
              PILOTIAN
            </h1>
          </motion.div>

          {/* Year - '19 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="-mt-6 sm:-mt-8"
          >
            <h2
              className="font-black tracking-tight"
              style={{
                fontSize: "clamp(3.5rem, 12vw, 8rem)",
                background: "linear-gradient(135deg, #ffffff 0%, #06b6d4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 30px rgba(59, 130, 246, 0.4)",
                letterSpacing: "-0.01em",
              }}
            >
              '19
            </h2>
          </motion.div>

          {/* Subtitle text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-3 pt-4"
          >
            <p className="text-xl sm:text-2xl font-bold text-blue-200">
              SSC BATCH CLASS OF 2019
            </p>
            <p className="text-lg sm:text-xl font-semibold text-cyan-300">
              Iftar Party Reunion
            </p>
            <p className="text-base sm:text-lg text-gray-300">
              Reconnect • Celebrate • Remember
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent max-w-sm mx-auto"
          />

          {/* Event info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4"
          >
            <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/50 rounded-lg p-4">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Date
              </p>
              <p className="text-lg font-bold text-white">17 Mar</p>
              <p className="text-xs text-gray-400">2026</p>
            </div>

            <div className="backdrop-blur-md bg-cyan-500/10 border border-cyan-400/50 rounded-lg p-4">
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Time
              </p>
              <p className="text-lg font-bold text-white">5:00 PM</p>
              <p className="text-xs text-gray-400">Onwards</p>
            </div>

            <div className="backdrop-blur-md bg-blue-500/10 border border-blue-400/50 rounded-lg p-4">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                Batch
              </p>
              <p className="text-lg font-bold text-white">120</p>
              <p className="text-xs text-gray-400">Size</p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="pt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/event")}
              className="group relative px-10 sm:px-16 py-4 sm:py-5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 text-white font-bold text-lg sm:text-xl rounded-full shadow-2xl hover:shadow-3xl border-2 border-cyan-300 overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-0 group-hover:opacity-20"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <span className="relative flex items-center gap-3 justify-center">
                <span>Enter the Event</span>
                <motion.div
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={24} strokeWidth={2.5} />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Animated dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center gap-2 pt-8"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-blue-400"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 rounded-full bg-cyan-400"
            />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 rounded-full bg-blue-300"
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
