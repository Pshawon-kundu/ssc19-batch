import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  User,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import type { RegistrationData } from "../api";
import { JerseyPreview } from "./JerseyPreview";
import { PaymentSection } from "./PaymentSection";
import { config } from "../config";
import type { PackageType } from "../App";

interface RegistrationFormProps {
  selectedPackage: PackageType | null;
  onSubmit: (data: RegistrationData) => Promise<void>;
  isSubmitting: boolean;
}

export function RegistrationForm({
  selectedPackage,
  onSubmit,
  isSubmitting,
}: RegistrationFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<RegistrationData>({
    name: "",
    phone: "",
    package: selectedPackage || "iftar-only",
    jerseySize: undefined,
    jerseyName: "",
    jerseyNumber: "",
    paymentMethod: "",
    transactionId: "",
    lastTwoDigit: "",
    amount: config.packagePrices[selectedPackage || "iftar-only"],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        package: selectedPackage,
        amount: config.packagePrices[selectedPackage],
      }));
    }
  }, [selectedPackage]);

  const needsJerseySize = [
    "iftar-jersey",
    "iftar-jersey-seheri",
    "jersey-only",
  ].includes(formData.package);

  const validatePhone = (phone: string): boolean => {
    return /^01[0-9]{9}$/.test(phone);
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be 11 digits starting with 01";
    }
    if (needsJerseySize && !formData.jerseySize) {
      newErrors.jerseySize = "Please select jersey size";
    }
    if (needsJerseySize && !formData.jerseyName?.trim()) {
      newErrors.jerseyName = "Jersey name is required";
    } else if (
      needsJerseySize &&
      formData.jerseyName &&
      formData.jerseyName.length > 15
    ) {
      newErrors.jerseyName = "Jersey name must be 15 characters or less";
    }
    if (needsJerseySize && !formData.jerseyNumber?.trim()) {
      newErrors.jerseyNumber = "Jersey number is required";
    } else if (needsJerseySize && formData.jerseyNumber) {
      const num = parseInt(formData.jerseyNumber);
      if (isNaN(num) || num < 0 || num > 99) {
        newErrors.jerseyNumber = "Jersey number must be between 0 and 99";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select payment method";
    }
    if (!formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required";
    }
    if (!formData.lastTwoDigit?.trim()) {
      newErrors.lastTwoDigit = "Last 3 digits are required";
    } else if (!/^\d{3}$/.test(formData.lastTwoDigit)) {
      newErrors.lastTwoDigit = "Must be exactly 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Package prices from centralized config
  const packagePrices = config.packagePrices;

  const handleNextStep = () => {
    if (validateStep1()) {
      setErrors({});
      setStep(2);
      // Scroll to top of form
      document
        .getElementById("registration")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackStep = () => {
    setErrors({});
    setStep(1);
    document
      .getElementById("registration")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    // Ensure amount is correct based on current package
    const currentAmount = packagePrices[formData.package];
    const dataToSubmit = {
      ...formData,
      amount: currentAmount, // <-- IMPORTANT: Send numeric amount
    };

    // Update local state to match
    setFormData((prev) => ({ ...prev, amount: currentAmount }));

    try {
      await onSubmit(dataToSubmit);

      // Reset form ONLY on success
      setStep(1);
      setFormData({
        name: "",
        phone: "",
        package: "iftar-only",
        jerseySize: undefined,
        jerseyName: "",
        jerseyNumber: "",
        paymentMethod: "",
        transactionId: "",
        lastTwoDigit: "",
        amount: config.packagePrices["iftar-only"],
      });
      setErrors({});
    } catch (error) {
      // Handle error (e.g. duplicate phone)
      const message =
        error instanceof Error ? error.message : "Registration failed";

      if (message.includes("registered")) {
        setErrors((prev) => ({ ...prev, phone: message }));
      } else {
        setErrors((prev) => ({ ...prev, submit: message }));
      }
    }
  };

  const handleChange = (field: keyof RegistrationData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <section
      id="registration"
      className="py-20 sm:py-28 bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-x-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Register Now
          </h2>
          <p className="text-base sm:text-lg text-gray-500">
            Fill in your details to secure your spot
          </p>
        </div>

        {/* ── Step Indicator ── */}
        <div className="flex items-center justify-center mb-10">
          {/* Step 1 bubble */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow ${
                step === 1
                  ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                  : "bg-emerald-500 text-white"
              }`}
            >
              {step > 1 ? <CheckCircle2 size={20} /> : <User size={18} />}
            </div>
            <span
              className={`text-xs font-semibold mt-1.5 ${
                step === 1 ? "text-emerald-700" : "text-emerald-500"
              }`}
            >
              Your Info
            </span>
          </div>

          {/* Connector */}
          <div className="relative mx-2 mb-5">
            <div className="h-0.5 w-16 sm:w-28 bg-gray-200 rounded-full" />
            <div
              className={`absolute inset-0 h-0.5 rounded-full bg-emerald-500 transition-all duration-700 ${
                step === 2 ? "w-full" : "w-0"
              }`}
            />
          </div>

          {/* Step 2 bubble */}
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 shadow ${
                step === 2
                  ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                  : "bg-gray-200 text-gray-400"
              }`}
            >
              <CreditCard size={18} />
            </div>
            <span
              className={`text-xs font-semibold mt-1.5 ${
                step === 2 ? "text-emerald-700" : "text-gray-400"
              }`}
            >
              Payment
            </span>
          </div>
        </div>

        {/* ── STEP 1 layout: Jersey preview + Form side by side on large screens ── */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.28 }}
              className="grid lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {/* Jersey preview */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <JerseyPreview />
              </div>

              {/* Step 1 form card */}
              <div className="lg:col-span-2 order-1 lg:order-2">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Card header */}
                  <div className="flex items-center gap-3 px-6 sm:px-8 py-5 bg-gradient-to-r from-emerald-600 to-emerald-700">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                      <User size={18} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                        Personal Details
                      </h3>
                      <p className="text-xs text-emerald-100 mt-0.5">
                        Step 1 of 2 &mdash; Fill in your info below
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={`w-full h-[3.5rem] px-4 py-3 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all ${
                          errors.name
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          ⚠ {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center h-[3.5rem] px-3 border-2 border-r-0 rounded-l-xl text-xs font-bold text-gray-500 bg-gray-50 border-gray-200 select-none shrink-0">
                          +88
                        </span>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            handleChange("phone", e.target.value)
                          }
                          className={`flex-1 h-[3.5rem] px-4 py-3 border-2 rounded-r-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all ${
                            errors.phone
                              ? "border-red-400 bg-red-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                          placeholder="01XXXXXXXXX"
                          maxLength={11}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">
                          ⚠ {errors.phone}
                        </p>
                      )}
                      {errors.submit && (
                        <p className="text-red-500 text-xs mt-1">
                          ⚠ {errors.submit}
                        </p>
                      )}
                    </div>

                    {/* Contribution Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Select Contribution *
                      </label>
                      <div className="grid grid-cols-1 gap-2.5">
                        {(
                          [
                            {
                              key: "iftar-only",
                              label: "Iftar Only",
                              icon: "🍽️",
                              desc: "Iftar dinner",
                            },
                            {
                              key: "iftar-jersey",
                              label: "Iftar + Jersey",
                              icon: "👕",
                              desc: "Dinner + jersey",
                            },
                            {
                              key: "iftar-jersey-seheri",
                              label: "Iftar + Jersey + Seheri",
                              icon: "🌙",
                              desc: "Full package",
                            },
                            {
                              key: "jersey-only",
                              label: "Jersey Only",
                              icon: "🏅",
                              desc: "Jersey alone",
                            },
                          ] as const
                        ).map(({ key, label, icon, desc }) => (
                          <label
                            key={key}
                            className={`relative flex items-center gap-3 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all select-none min-h-[3.5rem] h-auto ${
                              formData.package === key
                                ? "border-emerald-500 bg-emerald-50 shadow-md ring-2 ring-emerald-100"
                                : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50 hover:shadow-sm"
                            }`}
                          >
                            <input
                              type="radio"
                              name="package"
                              value={key}
                              checked={formData.package === key}
                              onChange={(e) =>
                                handleChange(
                                  "package",
                                  e.target.value as PackageType,
                                )
                              }
                              className="sr-only"
                            />
                            {/* Custom radio dot */}
                            <div
                              className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                                formData.package === key
                                  ? "border-emerald-600 bg-emerald-600"
                                  : "border-gray-300 bg-white"
                              }`}
                            >
                              {formData.package === key && (
                                <div className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="text-base leading-none">
                                {icon}
                              </span>
                              <span
                                className={`font-medium text-sm leading-tight ${
                                  formData.package === key
                                    ? "text-emerald-800"
                                    : "text-gray-700"
                                }`}
                              >
                                {label}
                              </span>
                            </div>
                            <div
                              className={`text-base font-semibold mr-8 ${
                                formData.package === key
                                  ? "text-emerald-600"
                                  : "text-emerald-500"
                              }`}
                            >
                              ৳{packagePrices[key]}
                            </div>
                            {formData.package === key && (
                              <div className="absolute top-1/2 -translate-y-1/2 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                  viewBox="0 0 12 12"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-3 h-3"
                                >
                                  <polyline points="2,6 5,9 10,3" />
                                </svg>
                              </div>
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Jersey Size (Conditional) */}
                    {needsJerseySize && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-5 border-t-2 border-dashed border-emerald-200 pt-5"
                      >
                        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                          <span>👕</span> Jersey Information
                        </h3>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Jersey Size *
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                            {["S", "M", "L", "XL", "XXL"].map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => handleChange("jerseySize", size)}
                                className={`h-[3.5rem] px-3 py-3 border-2 rounded-xl text-base sm:text-lg font-bold transition-all ${
                                  formData.jerseySize === size
                                    ? "border-emerald-600 bg-emerald-600 text-white shadow-md scale-105"
                                    : "border-gray-200 text-gray-600 hover:border-emerald-400 hover:bg-gray-50"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                          {errors.jerseySize && (
                            <p className="text-red-500 text-xs mt-2">
                              ⚠ {errors.jerseySize}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label
                              htmlFor="jerseyName"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Jersey Name *
                            </label>
                            <input
                              type="text"
                              id="jerseyName"
                              value={formData.jerseyName}
                              onChange={(e) =>
                                handleChange(
                                  "jerseyName",
                                  e.target.value.toUpperCase(),
                                )
                              }
                              maxLength={15}
                              className={`w-full px-4 py-3.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 uppercase font-semibold transition-all ${
                                errors.jerseyName
                                  ? "border-red-400 bg-red-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              placeholder="KALU"
                            />
                            <div className="flex justify-between mt-2">
                              {errors.jerseyName ? (
                                <p className="text-red-500 text-xs">
                                  ⚠ {errors.jerseyName}
                                </p>
                              ) : (
                                <p className="text-gray-400 text-xs">
                                  Max 15 chars
                                </p>
                              )}
                              <span
                                className={`text-xs font-semibold ${
                                  (formData.jerseyName?.length || 0) > 15
                                    ? "text-red-500"
                                    : "text-gray-400"
                                }`}
                              >
                                {formData.jerseyName?.length || 0}/15
                              </span>
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="jerseyNumber"
                              className="block text-sm font-semibold text-gray-700 mb-2"
                            >
                              Jersey Number *
                            </label>
                            <input
                              type="number"
                              id="jerseyNumber"
                              value={formData.jerseyNumber}
                              onChange={(e) =>
                                handleChange("jerseyNumber", e.target.value)
                              }
                              min="0"
                              max="99"
                              className={`w-full px-4 py-3.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 font-semibold transition-all ${
                                errors.jerseyNumber
                                  ? "border-red-400 bg-red-50"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              placeholder="10"
                            />
                            {errors.jerseyNumber ? (
                              <p className="text-red-500 text-xs mt-2">
                                ⚠ {errors.jerseyNumber}
                              </p>
                            ) : (
                              <p className="text-gray-400 text-xs mt-2">
                                0 – 99 only
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full py-4 sm:py-4.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5"
                    >
                      Next: Payment Details <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: Payment — centered, max-w-2xl ── */}
          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.28 }}
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-6">
                {/* Card header */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                    <CreditCard size={17} className="text-emerald-700" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                      Payment Details
                    </h3>
                    <p className="text-xs text-gray-400">Step 2 of 2</p>
                  </div>
                </div>

                {/* Step 1 summary */}
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">
                        Name
                      </p>
                      <p className="font-semibold text-gray-900 text-sm truncate">
                        {formData.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">
                        Phone
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {formData.phone}
                      </p>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">
                        Contribution
                      </p>
                      <p className="font-semibold text-gray-900 text-sm capitalize">
                        {formData.package.replace(/-/g, " ")}
                      </p>
                    </div>
                    {formData.jerseySize && (
                      <div className="col-span-2 sm:col-span-3">
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-0.5">
                          Jersey
                        </p>
                        <p className="font-semibold text-gray-900 text-sm">
                          {formData.jerseyName} #{formData.jerseyNumber} — Size{" "}
                          {formData.jerseySize}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="mt-3 text-xs text-emerald-600 font-semibold hover:text-emerald-800 flex items-center gap-1 transition-colors"
                  >
                    <ArrowLeft size={12} /> Edit Info
                  </button>
                </div>

                {/* Payment Section */}
                <PaymentSection
                  formData={formData}
                  errors={errors}
                  onChange={handleChange}
                />

                {/* Total Amount */}
                <div className="flex items-center justify-between bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl px-5 py-4 border-2 border-emerald-200">
                  <span className="text-sm sm:text-base font-semibold text-gray-700">
                    Total Amount
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700">
                    ৳{packagePrices[formData.package]}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleBackStep}
                    className="flex-none px-5 sm:px-6 py-3.5 sm:py-4 border-2 border-emerald-500 text-emerald-700 rounded-xl font-semibold text-sm sm:text-base hover:bg-emerald-50 active:bg-emerald-100 transition-all flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />{" "}
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={20} /> Complete Registration
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
