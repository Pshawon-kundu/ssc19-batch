import {
  Calendar,
  MapPin,
  Users,
  Banknote,
  Sparkles,
  Moon,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { CountdownTimer } from "./CountdownTimer";
import { TestimonialCarousel } from "./TestimonialCarousel";

interface HeroProps {
  totalRegistered: number;
  totalMoney: number;
  onRegisterClick: () => void;
  isLoading?: boolean;
}

export function Hero({
  totalRegistered,
  totalMoney,
  onRegisterClick,
  isLoading = false,
}: HeroProps) {
  const batchStrength = 120;

  return (
    <section
      id="home"
      className="relative pt-20 pb-8 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-amber-200 to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-6 py-12">
          {/* Badge with Smooth Animation */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(16, 185, 129, 0.2)",
                  "0 0 40px rgba(59, 130, 246, 0.3)",
                  "0 0 20px rgba(16, 185, 129, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl border-2 border-emerald-200 shadow-lg hover:border-emerald-300 transition-all"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex-shrink-0"
              >
                <Moon className="text-emerald-600" size={28} strokeWidth={2} />
              </motion.div>
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold text-emerald-700 tracking-widest uppercase">
                  Reunion Event
                </span>
                <span className="text-lg font-bold text-emerald-700 whitespace-nowrap">
                  Ramadan 1445 - Class of 2019
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Title with Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="text-amber-500" size={32} />
              </motion.div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                SSC 2019 Batch
              </h1>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="text-emerald-600" size={32} />
              </motion.div>
            </div>

            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900"
            >
              Iftar Party Reunion
            </motion.h2>

            <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl mx-auto font-semibold">
              <span className="text-emerald-600">
                Reconnect • Celebrate • Remember
              </span>
            </p>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Join us for the biggest batch reunion! An evening of food, fun,
              and unforgettable memories with your classmates.
            </p>
          </motion.div>

          {/* Enhanced Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 py-6"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px rgba(16, 185, 129, 0.3)",
              }}
              className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-lg border-2 border-emerald-100"
            >
              <Calendar className="text-emerald-600" size={28} />
              <div className="text-left">
                <div className="text-sm text-gray-500 font-semibold">Date</div>
                <div className="font-bold text-gray-900 text-lg">
                  27th Ramadan
                </div>
                <div className="text-xs text-gray-600">March 17, 2026</div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px rgba(59, 130, 246, 0.3)",
              }}
              className="flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-lg border-2 border-blue-100"
            >
              <MapPin className="text-blue-600" size={28} />
              <div className="text-left">
                <div className="text-sm text-gray-500 font-semibold">
                  Location
                </div>
                <div className="font-bold text-gray-900 text-lg">
                  School Field
                </div>
                <div className="text-xs text-gray-600">5:00 PM Onwards</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto py-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-3xl p-8 shadow-xl text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <Users className="opacity-90" size={32} strokeWidth={1.5} />
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <TrendingUp size={16} />
                    <span className="font-bold">
                      {Math.round((totalRegistered / batchStrength) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-5xl font-bold">{totalRegistered}</div>
                <div className="text-emerald-100 text-sm font-medium">
                  Out of {batchStrength} Registered
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -8 }}
              className="group relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 rounded-3xl p-8 shadow-xl text-white overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <Banknote
                    className="opacity-90"
                    size={32}
                    strokeWidth={1.5}
                  />
                  <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full font-bold">
                    BDT Tk
                  </span>
                </div>
                <div className="text-5xl font-bold">
                  ৳{(totalMoney / 1000).toFixed(1)}K
                </div>
                <div className="text-amber-100 text-sm font-medium">
                  Total Collected
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* CTA Section */}
          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-8 mt-12"
          >
            {/* Background Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 60px rgba(16, 185, 129, 0.15)",
                  "0 0 100px rgba(16, 185, 129, 0.25)",
                  "0 0 60px rgba(16, 185, 129, 0.15)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 rounded-3xl -z-10 blur-3xl"
            />

            {/* Main CTA Button */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Button clicked!");
                    onRegisterClick();
                  }}
                  className="group relative w-full sm:w-auto inline-flex justify-center items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden border-2 border-emerald-400 cursor-pointer hover:bg-gradient-to-r hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800"
                >
                  {/* Animated background layer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Content */}
                  <span className="relative flex items-center gap-3">
                    <span>Join the Reunion Now</span>
                    <motion.div
                      className="relative"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={24} strokeWidth={2.5} />
                    </motion.div>
                  </span>
                </button>
              </motion.div>

              {/* Pulse ring effect */}
              <motion.div
                animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-emerald-400 -z-10"
              />
            </div>

            {/* CTA Description */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center space-y-3"
            >
              <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-emerald-700 to-emerald-600 bg-clip-text text-transparent">
                Limited Spots Available
              </p>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                Don't miss this chance to{" "}
                <span className="font-semibold text-emerald-600">
                  reconnect
                </span>{" "}
                with your batch and create unforgettable memories together
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <p className="text-3xl font-bold text-emerald-700">17 Mar</p>
                <p className="text-sm text-gray-600 font-medium">Event Date</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <p className="text-3xl font-bold text-emerald-700">5:00 PM</p>
                <p className="text-sm text-gray-600 font-medium">Start Time</p>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} className="text-center">
                <p className="text-3xl font-bold text-emerald-700">120</p>
                <p className="text-sm text-gray-600 font-medium">Batch Size</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Sections Below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-16 space-y-12">
        {/* Countdown Timer */}
        <CountdownTimer />

        {/* Testimonials */}
        <TestimonialCarousel />
      </div>
    </section>
  );
}
