import { useState } from "react";
import { motion } from "motion/react";
import { Copy, Check } from "lucide-react";
import type { RegistrationData } from "../api";
import { config } from "../config";

interface PaymentSectionProps {
  formData: RegistrationData;
  errors: Record<string, string>;
  onChange: (field: keyof RegistrationData, value: any) => void;
}

import bkashLogo from "../assets/payment/bkash.png";
import nagadLogo from "../assets/payment/nagad.png";
import rocketLogo from "../assets/payment/rocket.png";

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

export function PaymentSection({
  formData,
  errors,
  onChange,
}: PaymentSectionProps) {
  const [copiedNumber, setCopiedNumber] = useState(false);

  const copyToClipboard = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  const selectedMethod = paymentMethods.find(
    (m) => m.id === formData.paymentMethod,
  );

  return (
    <div className="space-y-5">
      {/* ── Sliding warning ticker ── */}
      <div
        style={{
          backgroundColor: "#dc2626",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        className="flex items-stretch"
      >
        {/* Static badge */}
        <div
          style={{
            backgroundColor: "#b91c1c",
            borderRight: "1px solid #ef4444",
          }}
          className="shrink-0 flex items-center px-3 py-2"
        >
          <span
            style={{
              color: "#fef08a",
              fontWeight: 900,
              fontSize: "12px",
              whiteSpace: "nowrap",
            }}
          >
            ⚠️ সতর্কতা
          </span>
        </div>
        {/* Scrolling track */}
        <div
          className="flex-1 overflow-hidden flex items-center"
          style={{ height: "38px" }}
        >
          <motion.div
            style={{ display: "flex", whiteSpace: "nowrap", gap: "48px" }}
            animate={{ x: ["-0%", "-50%"] }}
            transition={{
              duration: 12,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                style={{
                  color: "#fef9c3",
                  fontWeight: 600,
                  fontSize: "13px",
                  whiteSpace: "nowrap",
                }}
              >
                পেমেন্ট তথ্য শেয়ারে সর্বোচ্চ সতর্কতা অবলম্বন করুন।
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Select Payment Method *
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {paymentMethods.map((method) => {
            const active = formData.paymentMethod === method.id;
            return (
              <button
                key={method.id}
                type="button"
                onClick={() => onChange("paymentMethod", method.id)}
                className={`relative flex flex-col items-center justify-between gap-2 py-3 px-3 border-2 rounded-xl transition-all ${
                  active
                    ? "border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-200"
                    : "border-gray-200 hover:border-emerald-300 hover:bg-gray-50"
                }`}
              >
                {active && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center z-10">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </span>
                )}
                <div className="w-full h-10 flex items-center justify-center">
                  <img
                    src={method.icon}
                    alt={method.name}
                    className="h-10 w-auto max-w-full object-contain"
                  />
                </div>
                <span
                  className={`text-xs font-bold leading-tight text-center ${
                    active ? "text-emerald-700" : "text-gray-600"
                  }`}
                >
                  {method.name}
                </span>
              </button>
            );
          })}
        </div>
        {errors.paymentMethod && (
          <p className="text-red-500 text-xs mt-1.5">
            ⚠ {errors.paymentMethod}
          </p>
        )}
      </div>

      {/* Send-money instruction card */}
      {selectedMethod && (
        <div className="rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 shrink-0 flex items-center justify-center">
              <img
                src={selectedMethod.icon}
                alt={selectedMethod.name}
                className="h-8 w-auto max-w-full object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm font-semibold text-gray-700">
              Send money to this{" "}
              <span className="text-emerald-700">{selectedMethod.name}</span>{" "}
              number:
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 bg-white rounded-lg border border-emerald-200 px-4 py-2.5">
              <span className="text-lg sm:text-2xl font-black text-emerald-700 tracking-widest">
                {selectedMethod.number}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(selectedMethod.number)}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                copiedNumber
                  ? "bg-emerald-100 text-emerald-700 border-2 border-emerald-300"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow"
              }`}
            >
              {copiedNumber ? (
                <>
                  <Check size={15} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={15} /> Copy
                </>
              )}
            </button>
          </div>
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 border border-amber-200">
            ⚠️ Send the <strong>exact amount</strong> and save your Transaction
            ID
          </p>
        </div>
      )}

      {/* Transaction ID + Last 2 digits — side by side on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {/* Transaction ID — wider */}
        <div className="sm:col-span-3">
          <label
            htmlFor="transactionId"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Transaction ID *
          </label>
          <input
            type="text"
            id="transactionId"
            value={formData.transactionId}
            onChange={(e) => onChange("transactionId", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all ${
              errors.transactionId
                ? "border-red-400 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="e.g., ABC123XYZ456"
          />
          {errors.transactionId && (
            <p className="text-red-500 text-xs mt-1.5">
              ⚠ {errors.transactionId}
            </p>
          )}
        </div>

        {/* Last 2 digits — narrower */}
        <div className="sm:col-span-2">
          <label
            htmlFor="lastTwoDigit"
            className="block text-sm font-semibold text-gray-700 mb-1.5"
          >
            Last 2 Phone Digits *
          </label>
          <input
            type="text"
            id="lastTwoDigit"
            value={formData.lastTwoDigit}
            onChange={(e) => onChange("lastTwoDigit", e.target.value)}
            className={`w-full px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-center font-mono tracking-widest text-lg ${
              errors.lastTwoDigit
                ? "border-red-400 bg-red-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            placeholder="78"
            maxLength={2}
            inputMode="numeric"
          />
          {errors.lastTwoDigit ? (
            <p className="text-red-500 text-xs mt-1.5">
              ⚠ {errors.lastTwoDigit}
            </p>
          ) : (
            <p className="text-gray-400 text-xs mt-1.5 text-center">
              ℹ Helps verify payment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
