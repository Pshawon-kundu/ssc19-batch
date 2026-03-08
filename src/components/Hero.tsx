import {
  Calendar,
  MapPin,
  Users,
  Banknote,
  Sparkles,
  Moon,
  ArrowDown,
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
      className="relative pt-20 pb-8 overflow-x-hidden bg-gradient-to-br from-emerald-50 via-white to-amber-50"
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

      {/* ── Ramadan Lantern Garland ── */}
      <div
        className="absolute left-0 w-full pointer-events-none overflow-hidden"
        style={{ top: "5rem", height: "240px" }}
      >
        {/* Rope */}
        <div
          className="absolute top-0 left-0 w-full"
          style={{
            height: "3px",
            background:
              "linear-gradient(90deg,#92400e,#b45309,#d97706,#b45309,#92400e)",
            opacity: 0.7,
          }}
        />

        {/* ── Lantern SVG definitions (reusable shapes) ── */}
        {/* Large golden lantern */}
        {[
          { left: "5%", strH: 55, scale: 1, delay: 0, dur: 3.6, dir: 1 },
          {
            left: "16%",
            strH: 100,
            scale: 1.15,
            delay: 0.5,
            dur: 4.1,
            dir: -1,
          },
          { left: "28%", strH: 70, scale: 0.85, delay: 1.1, dur: 3.3, dir: 1 },
          { left: "40%", strH: 120, scale: 1.1, delay: 0.3, dur: 4.5, dir: -1 },
          { left: "50%", strH: 60, scale: 0.9, delay: 0.8, dur: 3.8, dir: 1 },
          { left: "61%", strH: 110, scale: 1.2, delay: 0.2, dur: 4.2, dir: -1 },
          { left: "72%", strH: 80, scale: 0.88, delay: 1.3, dur: 3.5, dir: 1 },
          { left: "83%", strH: 95, scale: 1.05, delay: 0.6, dur: 4.0, dir: -1 },
          { left: "93%", strH: 50, scale: 0.82, delay: 1.0, dur: 3.7, dir: 1 },
        ].map((l, i) => (
          <motion.div
            key={`lantern-${i}`}
            className="absolute top-0 flex flex-col items-center"
            style={{ left: l.left, transformOrigin: "top center" }}
            animate={{ rotate: [l.dir * 6, l.dir * -6, l.dir * 6] }}
            transition={{
              duration: l.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: l.delay,
            }}
          >
            {/* hanging string */}
            <div
              style={{
                width: "1.5px",
                height: `${l.strH}px`,
                background: "#92400e",
                opacity: 0.75,
              }}
            />
            {/* lantern body */}
            <motion.div
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: l.delay,
              }}
              style={{
                transform: `scale(${l.scale})`,
                transformOrigin: "top center",
              }}
            >
              <svg width="46" height="74" viewBox="0 0 46 74" fill="none">
                <defs>
                  <radialGradient id={`gl${i}`} cx="50%" cy="55%" r="50%">
                    <stop offset="0%" stopColor="#fef9c3" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* hook ring */}
                <circle
                  cx="23"
                  cy="3"
                  r="3"
                  stroke="#92400e"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* chain */}
                <line
                  x1="23"
                  y1="6"
                  x2="23"
                  y2="10"
                  stroke="#b45309"
                  strokeWidth="1.5"
                />
                {/* top cap */}
                <polygon points="12,14 23,9 34,14 37,21 9,21" fill="#b45309" />
                <line
                  x1="9"
                  y1="18"
                  x2="37"
                  y2="18"
                  stroke="#92400e"
                  strokeWidth="1"
                  opacity="0.7"
                />
                {/* top band */}
                <rect
                  x="9"
                  y="21"
                  width="28"
                  height="4"
                  rx="1"
                  fill="#d97706"
                />
                {/* body */}
                <path
                  d="M9 25 L6 58 L10 65 L23 67 L36 65 L40 58 L37 25 Z"
                  fill="#fbbf24"
                />
                {/* inner glow */}
                <path
                  d="M9 25 L6 58 L10 65 L23 67 L36 65 L40 58 L37 25 Z"
                  fill={`url(#gl${i})`}
                />
                {/* vertical ribs */}
                <line
                  x1="14"
                  y1="25"
                  x2="12"
                  y2="65"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.55"
                />
                <line
                  x1="23"
                  y1="25"
                  x2="23"
                  y2="67"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.55"
                />
                <line
                  x1="32"
                  y1="25"
                  x2="34"
                  y2="65"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.55"
                />
                {/* horizontal bands */}
                <line
                  x1="7"
                  y1="36"
                  x2="39"
                  y2="36"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="6"
                  y1="47"
                  x2="40"
                  y2="47"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.5"
                />
                <line
                  x1="7"
                  y1="57"
                  x2="39"
                  y2="57"
                  stroke="#d97706"
                  strokeWidth="1"
                  opacity="0.5"
                />
                {/* bottom band */}
                <rect
                  x="9"
                  y="63"
                  width="28"
                  height="4"
                  rx="1"
                  fill="#d97706"
                />
                {/* base cone */}
                <polygon points="13,67 23,73 33,67" fill="#b45309" />
                {/* fringe dots */}
                <circle cx="17" cy="73" r="2" fill="#92400e" />
                <circle cx="23" cy="74" r="2" fill="#92400e" />
                <circle cx="29" cy="73" r="2" fill="#92400e" />
              </svg>
            </motion.div>
            {/* glow pulse behind lantern */}
            <motion.div
              animate={{ opacity: [0.2, 0.55, 0.2], scale: [0.8, 1.1, 0.8] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: l.delay,
              }}
              style={{
                position: "absolute",
                top: `${l.strH + 20}px`,
                width: "60px",
                height: "60px",
                background:
                  "radial-gradient(circle, rgba(251,191,36,0.45) 0%, transparent 70%)",
                borderRadius: "50%",
                transform: "translateX(-50%)",
                left: "50%",
              }}
            />
          </motion.div>
        ))}

        {/* ── Stars between lanterns ── */}
        {[
          { left: "10.5%", top: 18, size: 13, delay: 0.2 },
          { left: "22%", top: 28, size: 10, delay: 0.9 },
          { left: "34%", top: 14, size: 14, delay: 0.4 },
          { left: "45.5%", top: 22, size: 11, delay: 1.2 },
          { left: "55.5%", top: 16, size: 13, delay: 0.7 },
          { left: "67%", top: 25, size: 10, delay: 0.1 },
          { left: "77.5%", top: 12, size: 14, delay: 1.5 },
          { left: "88%", top: 20, size: 11, delay: 0.6 },
        ].map((s, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{ left: s.left, top: `${s.top}px` }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.85, 1.25, 0.85] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: s.delay,
            }}
          >
            <svg width={s.size} height={s.size} viewBox="0 0 24 24">
              <polygon
                points="12,1 14.9,8.2 22.5,9 17,14 18.8,21.5 12,17.8 5.2,21.5 7,14 1.5,9 9.1,8.2"
                fill="#f59e0b"
              />
            </svg>
          </motion.div>
        ))}
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
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent drop-shadow-lg">
                Pilotian'19
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
              className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900"
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
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-6 max-w-xl mx-auto"
          >
            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 24px rgba(16, 185, 129, 0.2)",
              }}
              className="flex items-center gap-4 bg-white w-full sm:w-auto px-6 py-5 rounded-2xl shadow-md border-2 border-emerald-100 hover:border-emerald-200 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                <Calendar className="text-emerald-600" size={22} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Date
                </div>
                <div className="font-bold text-gray-900 text-lg leading-tight">
                  27th Ramadan
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  March 17, 2026
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{
                scale: 1.03,
                boxShadow: "0 12px 24px rgba(59, 130, 246, 0.2)",
              }}
              className="flex items-center gap-4 bg-white w-full sm:w-auto px-6 py-5 rounded-2xl shadow-md border-2 border-blue-100 hover:border-blue-200 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <MapPin className="text-blue-600" size={22} />
              </div>
              <div className="text-left">
                <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Location
                </div>
                <div className="font-bold text-gray-900 text-lg leading-tight">
                  School Field
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  5:00 PM Onwards
                </div>
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
                  {!isLoading && (
                    <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <TrendingUp size={16} />
                      <span className="font-bold">
                        {Math.round((totalRegistered / batchStrength) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
                {isLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-12 w-24 bg-white/30 rounded-xl" />
                    <div className="h-4 w-36 bg-white/20 rounded-lg" />
                  </div>
                ) : (
                  <>
                    <div className="text-5xl font-bold">{totalRegistered}</div>
                    <div className="text-emerald-100 text-sm font-medium">
                      Out of {batchStrength} Registered
                    </div>
                  </>
                )}
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
                {isLoading ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-12 w-28 bg-white/30 rounded-xl" />
                    <div className="h-4 w-32 bg-white/20 rounded-lg" />
                  </div>
                ) : (
                  <>
                    <div className="text-5xl font-bold">
                      ৳{(totalMoney / 1000).toFixed(1)}K
                    </div>
                    <div className="text-amber-100 text-sm font-medium">
                      Total Collected
                    </div>
                  </>
                )}
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
              <button
                type="button"
                onClick={onRegisterClick}
                className="relative w-full sm:w-auto inline-flex justify-center items-center gap-3 px-12 py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white rounded-full font-bold text-xl shadow-2xl hover:shadow-emerald-500/50 transition-all border-2 border-emerald-400 cursor-pointer hover:from-emerald-600 hover:to-emerald-800 active:scale-95"
              >
                <span>Join the Reunion Now</span>
                <ArrowDown size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* CTA Description */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center space-y-3"
            >
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
