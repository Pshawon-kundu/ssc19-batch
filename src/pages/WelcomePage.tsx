import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-emerald-900 via-emerald-800 to-amber-900 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-transparent rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ scale: [1.3, 1, 1.3], rotate: [360, 180, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-400 to-transparent rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-emerald-500 to-transparent rounded-full blur-3xl opacity-10 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Main Content */}
      <motion.div className="relative z-10 px-4 sm:px-6 max-w-2xl mx-auto text-center">
        {/* Logo/Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-amber-400"
            />
            <div className="relative bg-gradient-to-br from-emerald-900/50 to-amber-900/50 backdrop-blur-md rounded-full p-8 border border-emerald-400/30">
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300"
              >
                ✨
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter"
            >
              <span className="bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-300 bg-clip-text text-transparent drop-shadow-2xl">
                PILOTIAN
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-4"
            >
              <span className="text-5xl sm:text-6xl lg:text-7xl font-black text-white">
                '<span className="text-amber-300">19</span>
              </span>
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="space-y-3"
          >
            <p className="text-xl sm:text-2xl text-emerald-200 font-semibold tracking-wide">
              SSC Batch Class of 2019
            </p>
            <p className="text-lg sm:text-xl text-amber-200 font-medium">
              Iftar Party Reunion
            </p>
            <p className="text-base text-gray-300 max-w-md mx-auto">
              Reconnect • Celebrate • Remember
            </p>
          </motion.div>
        </motion.div>

        {/* Animated Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mb-12 origin-center"
        />

        {/* Event Details Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-emerald-400/20 p-4">
            <p className="text-xs text-emerald-200 uppercase tracking-widest mb-2">
              Date
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">17 Mar</p>
            <p className="text-xs text-gray-300">2026</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-amber-400/20 p-4">
            <p className="text-xs text-amber-200 uppercase tracking-widest mb-2">
              Time
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">5:00 PM</p>
            <p className="text-xs text-gray-300">Onwards</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg border border-emerald-400/20 p-4 col-span-2 sm:col-span-1">
            <p className="text-xs text-emerald-200 uppercase tracking-widest mb-2">
              Batch
            </p>
            <p className="text-lg sm:text-xl font-bold text-white">120</p>
            <p className="text-xs text-gray-300">Strength</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/event")}
          className="group relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-full font-bold text-lg sm:text-xl shadow-2xl border-2 border-emerald-400 cursor-pointer overflow-hidden inline-flex items-center gap-3 hover:shadow-3xl transition-all"
        >
          {/* Animated background layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Content */}
          <span className="relative flex items-center gap-3">
            <span>Enter the Event</span>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </motion.div>
          </span>
        </motion.button>

        {/* Loading Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center gap-2"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-emerald-400"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-amber-400"
          />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-emerald-300"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
