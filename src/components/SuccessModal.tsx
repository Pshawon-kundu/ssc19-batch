import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import type { RegistrationData } from '../App';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  registrationData?: RegistrationData;
}

export function SuccessModal({ isOpen, onClose, registrationData }: SuccessModalProps) {
  const packagePrices = {
    'iftar-only': 300,
    'iftar-jersey': 700,
    'iftar-jersey-seheri': 1000,
    'jersey-only': 500,
  };

  const hasJersey = registrationData && ['iftar-jersey', 'iftar-jersey-seheri', 'jersey-only'].includes(registrationData.package);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative my-8 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200"
                >
                  <CheckCircle className="text-white" size={32} />
                </motion.div>
              </div>

              {/* Success Message */}
              <div className="text-center space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Registration Done! 🎉
                  </h2>
                  <p className="text-sm text-gray-500">
                    Your spot is confirmed.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-xl p-4 border border-emerald-100/50">
                  <p className="text-emerald-800 font-semibold text-sm">
                    See you at the Iftar Party!
                  </p>
                  <div className="text-2xl my-1">🌙</div>
                  <p className="text-xs text-gray-600 font-medium">
                    27th Ramadan • School Field
                  </p>
                </div>

                {/* Registration Summary */}
                {registrationData && (
                  <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-xs uppercase tracking-wider mb-3 text-center opacity-70">
                      Summary
                    </h3>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Name</span>
                        <span className="font-semibold text-gray-900 truncate max-w-[12rem]">{registrationData.name}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Package</span>
                        <span className="font-semibold text-gray-900 capitalize px-2 py-0.5 bg-white rounded border border-gray-200 text-xs">
                          {registrationData.package.replace(/-/g, ' ')}
                        </span>
                      </div>

                      {hasJersey && (
                        <div className="mt-3 pt-3 border-t border-gray-200/60">
                          <p className="text-xs font-medium text-emerald-600 mb-2 flex items-center gap-1">
                            <span>👕</span> Jersey Details
                          </p>
                          <div className="bg-white rounded-lg p-2 space-y-1.5 border border-gray-100">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Size</span>
                              <span className="font-bold text-gray-900">{registrationData.jerseySize}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Name</span>
                              <span className="font-medium text-gray-900">{registrationData.jerseyName}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Number</span>
                              <span className="font-mono font-medium text-gray-900">#{registrationData.jerseyNumber}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="border-t border-gray-200/60 mt-3 pt-3 flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Total Paid</span>
                        <span className="font-bold text-emerald-600 text-lg">
                          ৳{packagePrices[registrationData.package as keyof typeof packagePrices]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full mt-6 py-2.5 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors active:scale-[0.98]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
