import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Copy, Check } from "lucide-react";
import { config } from "../config";
import { submitDonation } from "../api";

import bkashLogo from "../assets/payment/bkash.png";
import nagadLogo from "../assets/payment/nagad.png";
import rocketLogo from "../assets/payment/rocket.png";

const donationTiers = [
  {
    id: "tier1",
    amount: 500,
    title: "Supporter",
    description: "Support one meal",
    icon: "🍚",
  },
  {
    id: "tier2",
    amount: 1000,
    title: "Friend",
    description: "Support two meals",
    icon: "🍜",
  },
  {
    id: "tier3",
    amount: 2500,
    title: "Benefactor",
    description: "Support family package",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: "tier4",
    amount: 5000,
    title: "Guardian",
    description: "Support full event",
    icon: "🌟",
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
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
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
          setSelectedAmount(1000);
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

  return (
    <section
      id="donate"
      className="py-20 sm:py-28 bg-gradient-to-br from-red-50 via-white to-pink-50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <Heart className="text-red-500" size={32} fill="currentColor" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Make a Donation
            </h2>
            <Heart className="text-red-500" size={32} fill="currentColor" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Help us support those in need. Your donation makes a meaningful
            impact and ensures everyone can participate in this special reunion.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Donation Tiers */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Choose Amount
              </h3>

              {/* Preset Amounts */}
              <div className="space-y-3">
                {donationTiers.map((tier) => (
                  <motion.button
                    key={tier.id}
                    onClick={() => {
                      setSelectedAmount(tier.amount);
                      setCustomAmount("");
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                      selectedAmount === tier.amount && !customAmount
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {tier.title}
                        </p>
                        <p className="text-sm text-gray-600">
                          {tier.description}
                        </p>
                      </div>
                      <p className="font-bold text-red-600">{tier.amount}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="mt-6 p-6 border-2 border-dashed border-gray-200 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Custom Amount (৳)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Enter custom amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Donation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div
              className={`rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-500 ${
                isFormComplete
                  ? "bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 border-3 border-orange-400 shadow-2xl shadow-orange-300/60"
                  : "bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-300 shadow-lg"
              }`}
            >
              {/* Donor Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  Donor Information
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Amount Summary */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total Donation:
                  </span>
                  <span className="text-3xl font-bold text-red-600">
                    ৳{finalAmount}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              {/* Payment Methods */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-5">
                  Payment Method
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`w-full h-auto min-h-28 px-4 py-5 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-3 ${
                        selectedMethod === method.id
                          ? "border-red-500 bg-red-50 shadow-lg scale-105"
                          : "border-gray-300 bg-white hover:border-red-400 hover:shadow-md"
                      }`}
                    >
                      <div className="w-16 h-10 flex items-center justify-center flex-shrink-0">
                        <img
                          src={method.icon}
                          alt={method.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-gray-800 text-center leading-tight">
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              {selectedPayment && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8 border-2 border-blue-200"
                >
                  <h4 className="font-semibold text-gray-900 mb-6">
                    📱 Payment Details
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-3">
                        Merchant Number:
                      </p>
                      <div className="flex items-center gap-3">
                        <input
                          type="text"
                          value={selectedPayment.number}
                          readOnly
                          className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 font-semibold"
                        />
                        <motion.button
                          onClick={() =>
                            copyToClipboard(selectedPayment.number)
                          }
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          {copiedNumber ? (
                            <Check size={20} />
                          ) : (
                            <Copy size={20} />
                          )}
                        </motion.button>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-yellow-200">
                      <p className="text-xs text-yellow-700">
                        💡 Send <strong>৳{finalAmount}</strong> to this number
                        and screenshot the confirmation
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCompleteDonation}
                disabled={!donorName || !donorPhone || !finalAmount}
                type="button"
                className={`w-full mt-8 px-6 py-4 font-bold rounded-lg hover:shadow-lg transition-all duration-500 ${
                  isFormComplete
                    ? "bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 text-white shadow-xl shadow-red-500/50"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Heart className="inline-block mr-2" size={20} />
                Complete Donation ৳{finalAmount}
              </motion.button>

              <p className="text-center text-xs text-gray-800 font-medium mt-5">
                After payment, we will verify and record your generous donation
              </p>
            </div>
          </motion.div>
        </div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid sm:grid-cols-3 gap-6"
        >
          <div className="text-center p-6 rounded-lg bg-white shadow-md border-2 border-red-100">
            <Heart className="mx-auto mb-3 text-red-500" size={32} />
            <p className="text-gray-600 text-sm">
              <strong>Every donation</strong> makes a real difference in our
              community
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-md border-2 border-red-100">
            <Heart className="mx-auto mb-3 text-red-500" size={32} />
            <p className="text-gray-600 text-sm">
              <strong>100% transparent</strong> - Track where your money goes
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white shadow-md border-2 border-red-100">
            <Heart className="mx-auto mb-3 text-red-500" size={32} />
            <p className="text-gray-600 text-sm">
              <strong>Tax exempt</strong> - Donations may be tax-deductible
            </p>
          </div>
        </motion.div>
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
                <strong>Donation Amount:</strong> ৳{finalAmount}
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
                <strong>Amount:</strong> ৳{finalAmount}
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
