import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Copy, Check, ChevronDown, Gift } from "lucide-react";
import { config } from "../config";
import { submitDonation } from "../api";

import bkashLogo from "../assets/payment/bkash.png";
import nagadLogo from "../assets/payment/nagad.png";
import rocketLogo from "../assets/payment/rocket.png";

const donationTiers = [
  {
    id: "tier1",
    amount: 100,
    title: "Small Help",
    description: "Joy for a child's Eid",
    icon: "🌙",
  },
  {
    id: "tier2",
    amount: 250,
    title: "Sweet Eid",
    description: "Eid gift for a family",
    icon: "🎁",
  },
  {
    id: "tier3",
    amount: 500,
    title: "Eid Mubarak",
    description: "Eid joy for two families",
    icon: "🤲",
  },
];

const paymentMethods = [
  {
    id: "bkash",
    name: "bKash",
    icon: bkashLogo,
    color: "from-pink-500 to-pink-600",
    number: config.paymentNumbers.bkash,
  },
  {
    id: "nagad",
    name: "Nagad",
    icon: nagadLogo,
    color: "from-orange-500 to-orange-600",
    number: config.paymentNumbers.nagad,
  },
  {
    id: "rocket",
    name: "Rocket",
    icon: rocketLogo,
    color: "from-purple-500 to-purple-600",
    number: config.paymentNumbers.rocket,
  },
];

export function DonationSection() {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("bkash");
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [donorName, setDonorName] = useState<string>("");
  const [donorPhone, setDonorPhone] = useState<string>("");
  const [showVerification, setShowVerification] = useState(false);
  const [last3Digit, setLast3Digit] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [verificationError, setVerificationError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;
  const selectedPayment = paymentMethods.find((m) => m.id === selectedMethod);
  const isFormComplete =
    donorName.trim() && donorPhone.trim() && finalAmount > 0;

  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } catch {
      console.error("Failed to copy");
    }
  };

  const handleCompleteDonation = () => {
    setShowVerification(true);
    setLast3Digit("");
    setTransactionId("");
    setVerificationError("");
  };

  const handleVerifyTransaction = async () => {
    if (!last3Digit || last3Digit.length !== 3) {
      setVerificationError("Please enter a valid 3-digit number");
      return;
    }

    if (!transactionId.trim()) {
      setVerificationError("Please enter your transaction ID");
      return;
    }

    if (!/^\d{3}$/.test(last3Digit)) {
      setVerificationError("Last 3 digits must contain only numbers");
      return;
    }

    setIsSubmitting(true);
    setVerificationError("");

    try {
      // Submit donation to Google Sheets
      const result = await submitDonation({
        donorName,
        donorPhone,
        amount: finalAmount,
        paymentMethod: selectedPayment?.name || selectedMethod,
        last3Digit,
        transactionId,
      });

      if (result.success) {
        // Show thank you modal
        setShowVerification(false);
        setShowThankYou(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setShowThankYou(false);
          setLast3Digit("");
          setTransactionId("");
          setDonorName("");
          setDonorPhone("");
          setCustomAmount("");
          setSelectedAmount(250);
        }, 3000);
      } else {
        setVerificationError(
          result.error || "Failed to submit donation. Please try again.",
        );
      }
    } catch (error) {
      console.error("Donation error:", error);
      setVerificationError(
        "Failed to submit donation. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="donate"
      className="py-20 sm:py-28 bg-gradient-to-br from-red-50 via-white to-pink-50 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Separator banner ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
          <span className="text-xs font-bold uppercase tracking-widest text-red-400 whitespace-nowrap">
            ── Voluntary Section ──
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-red-200 to-transparent" />
        </div>

        {/* ── Toggle Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Optional notice bar */}
          <div className="flex items-center justify-center mb-5">
            <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-[11px] sm:text-xs font-semibold px-4 py-2 rounded-full border border-emerald-200 shadow-sm">
              <span className="text-emerald-500 text-sm">✅</span>
              <span>Registration complete? Already registered!</span>
            </span>
          </div>

          {/* Clickable card to expand/collapse */}
          <button
            type="button"
            onClick={() => setIsExpanded((v) => !v)}
            className="w-full group"
          >
            <div
              className={`rounded-2xl border-2 transition-all duration-300 px-5 py-4 sm:px-8 sm:py-6 ${isExpanded ? "border-red-300 bg-red-50 shadow-lg" : "border-dashed border-red-200 bg-white hover:border-red-300 hover:bg-red-50 shadow-sm"}`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Gift icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-red-100 to-pink-100 border border-red-200 flex items-center justify-center shrink-0">
                  <Gift className="text-red-500" size={20} />
                </div>

                {/* Title + description */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">
                      Make a Donation
                    </h2>
                    <span className="hidden sm:inline-flex items-center bg-amber-100 text-amber-700 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-300">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-snug">
                    Completely voluntary — not required to join
                  </p>
                </div>

                {/* Chevron */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-100 border border-red-200 flex items-center justify-center"
                >
                  <ChevronDown className="text-red-500" size={18} />
                </motion.div>
              </div>

              {/* Mobile-only optional badge */}
              <div className="flex sm:hidden mt-2">
                <span className="inline-flex items-center bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-200">
                  Optional
                </span>
              </div>

              {!isExpanded && (
                <p className="text-xs sm:text-sm text-gray-400 mt-3 border-t border-dashed border-red-100 pt-3 leading-relaxed">
                  💛 Want to help support those who can't afford to attend? Tap
                  to donate — every bit counts.
                </p>
              )}
            </div>
          </button>
        </motion.div>

        {/* ── Collapsible Donation Form ── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="donation-form"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 32 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {/* Eid Charity Sub-header */}
              <div className="text-center mb-5">
                <p className="text-base sm:text-lg font-semibold text-rose-600">
                  🌙 Help poor families celebrate Eid this year
                </p>
                <span className="inline-block mt-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1 rounded-full border border-green-200">
                  🔒 Completely separate from registration
                </span>
              </div>

              <div className="max-w-lg mx-auto">
                {/* Amount chips */}
                <div
                  className={`rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-500 ${
                    isFormComplete
                      ? "bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-2 border-orange-400 shadow-orange-200"
                      : "bg-white border-2 border-gray-200"
                  }`}
                >
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {donationTiers.map((tier) => (
                      <motion.button
                        key={tier.id}
                        onClick={() => {
                          if (selectedAmount === tier.amount) {
                            setSelectedAmount(0);
                          } else {
                            setSelectedAmount(tier.amount);
                            setCustomAmount("");
                          }
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`p-2.5 sm:p-3 rounded-xl border-2 transition-all text-center ${
                          selectedAmount === tier.amount && !customAmount
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300 bg-white"
                        }`}
                      >
                        <div className="text-xl mb-0.5">{tier.icon}</div>
                        <div className="text-xs font-bold text-gray-900">
                          ৳ {tier.amount}
                        </div>
                        <div className="text-[10px] text-gray-500 leading-tight mt-0.5">
                          {tier.title}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="relative mb-4">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-lg pointer-events-none">
                      ৳
                    </span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      min={100}
                      max={5000}
                      placeholder="Other amount (100 – 5,000)"
                      className="w-full pl-10 pr-4 py-2.5 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:border-red-400 text-sm"
                    />
                  </div>

                  {/* Name + Phone */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your name"
                      className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm"
                    />
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="Phone number"
                      className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-400 text-sm"
                    />
                  </div>

                  {/* Payment methods */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedMethod(method.id)}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border-2 transition-all ${
                          selectedMethod === method.id
                            ? "border-red-500 bg-red-50 shadow-md scale-105"
                            : "border-gray-200 bg-white hover:border-red-300"
                        }`}
                      >
                        <div className="w-10 h-7 flex items-center justify-center">
                          <img
                            src={method.icon}
                            alt={method.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-700">
                          {method.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Merchant number */}
                  {selectedPayment && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 mb-4 bg-blue-50 rounded-xl p-3 border border-blue-200"
                    >
                      <span className="text-xs text-gray-600 shrink-0">
                        📱 Send to:
                      </span>
                      <span className="flex-1 text-sm font-bold text-gray-900 tracking-wider">
                        {selectedPayment.number}
                      </span>
                      <motion.button
                        onClick={() => copyToClipboard(selectedPayment.number)}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 bg-blue-500 text-white rounded-lg"
                      >
                        {copiedNumber ? (
                          <Check size={14} />
                        ) : (
                          <Copy size={14} />
                        )}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Submit row */}
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-red-600">
                      ৳ {finalAmount}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleCompleteDonation}
                      disabled={!donorName || !donorPhone || !finalAmount}
                      type="button"
                      className={`flex-1 py-3 font-bold rounded-xl transition-all text-sm ${
                        isFormComplete
                          ? "bg-gradient-to-r from-orange-500 to-pink-600 text-white shadow-lg shadow-red-400/40"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <Heart className="inline-block mr-1.5" size={16} />
                      Donate ৳ {finalAmount}
                    </motion.button>
                  </div>

                  <p className="text-center text-[11px] text-gray-400 mt-3">
                    💛 Your donation brings Eid joy to a family — every bit
                    counts
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Verification Modal */}
      {showVerification && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-5 sm:p-8 max-w-md w-full"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Verify Transaction
            </h3>
            <p className="text-gray-600 mb-8">
              Enter the last 3 digits of your transaction confirmation number
            </p>

            {/* Donation Summary */}
            <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-5 mb-8">
              <p className="text-sm text-gray-600 mb-3">
                <strong>Donation Amount:</strong> ৳ {finalAmount}
              </p>
              <p className="text-sm text-gray-600 font-semibold text-pink-600">
                Donation
              </p>
            </div>

            {/* Last 3 Digit Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Last 3 Digit
              </label>
              <input
                type="text"
                maxLength={3}
                value={last3Digit}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setLast3Digit(val);
                  setVerificationError("");
                }}
                placeholder="e.g., 123"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 text-center text-2xl font-bold tracking-widest"
              />
            </div>

            {/* Transaction ID Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Transaction ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  setVerificationError("");
                }}
                placeholder="Enter your transaction ID"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-900 font-medium"
              />
            </div>

            {/* Error Message */}
            {verificationError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border-2 border-red-300 text-red-700 px-5 py-4 rounded-lg mb-8 text-sm"
              >
                {verificationError}
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowVerification(false);
                  setTransactionId("");
                  setVerificationError("");
                }}
                className="flex-1 px-4 py-3.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVerifyTransaction}
                disabled={isSubmitting}
                type="button"
                className={`flex-1 px-4 py-3.5 bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 text-white font-extrabold text-base rounded-lg hover:shadow-2xl transition-all shadow-lg shadow-pink-600/50 border-2 border-pink-700 ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                <Heart className="inline-block mr-2" size={18} fill="white" />
                {isSubmitting ? "Submitting..." : "Confirm"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-5 sm:p-10 max-w-md w-full text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <Heart className="w-14 sm:w-16 h-14 sm:h-16 text-pink-600 mx-auto fill-pink-600" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Thank You!
            </h3>

            <p className="text-gray-600 mb-1 text-base sm:text-lg">
              We will verify your donation process
            </p>
            <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
              and notify you soon.
            </p>

            <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4 sm:p-5 mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                <strong>Amount:</strong> ৳ {finalAmount}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                <strong>Last 3 Digit:</strong> {last3Digit}
              </p>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                <strong>Transaction ID:</strong> {transactionId}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Donor:</strong> {donorName}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              You will receive a confirmation email shortly
            </p>
          </motion.div>
        </div>
      )}
    </section>
  );
}
