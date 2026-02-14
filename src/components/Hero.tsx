import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  totalRegistered: number;
  totalMoney: number;
  onRegisterClick: () => void;
  isLoading?: boolean;
}

export function Hero({ totalRegistered, totalMoney, onRegisterClick, isLoading = false }: HeroProps) {
  return (
    <section id="home" className="relative pt-20 pb-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-amber-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center space-y-8 py-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-amber-100 rounded-full border border-emerald-200">
              <span className="text-2xl">🌙</span>
              <span className="text-emerald-800 font-semibold">Ramadan 1445</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
              SSC 2019 Batch
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Iftar Party
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us for a memorable reunion this Ramadan
            </p>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 py-6"
          >
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-emerald-100">
              <Calendar className="text-emerald-600" size={24} />
              <div className="text-left">
                <div className="text-sm text-gray-500">Date</div>
                <div className="font-semibold text-gray-900">27th Ramadan</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-emerald-100">
              <MapPin className="text-emerald-600" size={24} />
              <div className="text-left">
                <div className="text-sm text-gray-500">Location</div>
                <div className="font-semibold text-gray-900">School Field</div>
              </div>
            </div>
          </motion.div>

          {/* Live Counters */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto py-6"
          >
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Users className="text-white" size={28} />
                <div className="text-5xl font-bold text-white">{totalRegistered}</div>
              </div>
              <div className="text-emerald-100 font-medium">Total Registered</div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-700 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-center gap-3 mb-2">
                <DollarSign className="text-white" size={28} />
                <div className="text-5xl font-bold text-white">{totalMoney.toLocaleString()}</div>
              </div>
              <div className="text-amber-100 font-medium">BDT Collected</div>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <button
              onClick={onRegisterClick}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <span>🎯 Get Registered Now</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
