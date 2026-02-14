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
    'iftar-jersey-seheri': 900,
    'jersey-only': 500,
  };

  const hasJersey = registrationData && ['iftar-jersey', 'iftar-jersey-seheri', 'jersey-only'].includes(registrationData.package);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="text-white" size={48} />
                </motion.div>
              </div>

              {/* Success Message */}
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  Registration Successful! 🎉
                </h2>
                
                <p className="text-lg text-gray-600">
                  Your registration has been confirmed.
                </p>

                <div className="bg-gradient-to-r from-emerald-50 to-amber-50 rounded-lg p-6 border border-emerald-200 space-y-3">
                  <p className="text-emerald-800 font-semibold">
                    See you at the Iftar Party!
                  </p>
                  <div className="text-4xl">🌙</div>
                  <p className="text-sm text-gray-600">
                    27th Ramadan at School Field
                  </p>
                </div>

                {/* Registration Summary */}
                {registrationData && (
                  <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                    <h3 className="font-semibold text-gray-900 text-center mb-3">Registration Summary</h3>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-semibold text-gray-900">{registrationData.name}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Package:</span>
                      <span className="font-semibold text-gray-900 capitalize">
                        {registrationData.package.replace(/-/g, ' ')}
                      </span>
                    </div>
                    
                    {hasJersey && (
                      <>
                        <div className="border-t border-gray-200 my-2 pt-2">
                          <p className="text-xs font-semibold text-gray-500 mb-2">👕 Jersey Details</p>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-semibold text-gray-900">{registrationData.jerseySize}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-semibold text-gray-900">{registrationData.jerseyName}</span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Number:</span>
                          <span className="font-semibold text-gray-900">#{registrationData.jerseyNumber}</span>
                        </div>
                      </>
                    )}
                    
                    <div className="border-t border-gray-200 my-2 pt-2"></div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="font-bold text-emerald-600">
                        ৳{packagePrices[registrationData.package as keyof typeof packagePrices]}
                      </span>
                    </div>
                  </div>
                )}

                <p className="text-sm text-gray-500">
                  You will receive a confirmation message soon.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-full mt-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}