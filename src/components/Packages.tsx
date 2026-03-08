import { Check, ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import type { PackageType } from "../App";

interface PackagesProps {
  selectedPackage: PackageType | null;
  onSelectPackage: (pkg: PackageType) => void;
}

import { config } from "../config";

const packages = [
  {
    id: "iftar-only" as PackageType,
    name: "Iftar Only",
    price: config.packagePrices["iftar-only"],
    icon: "🍽️",
    features: [
      "Delicious Iftar meal",
      "Fresh dates & fruits",
      "Drinks included",
      "Dessert",
    ],
    popular: false,
  },
  {
    id: "iftar-jersey" as PackageType,
    name: "Iftar + Jersey",
    price: config.packagePrices["iftar-jersey"],
    icon: "👕",
    features: [
      "Everything in Iftar Only",
      "Exclusive SSC 2019 Jersey",
      "Custom name & number",
      "Premium quality fabric",
    ],
    popular: true,
  },
  {
    id: "iftar-jersey-seheri" as PackageType,
    name: "Iftar + Jersey + Seheri",
    price: config.packagePrices["iftar-jersey-seheri"],
    icon: "🌟",
    features: [
      "Everything in Iftar + Jersey",
      "Seheri meal included",
      "Extended gathering",
      "Best value package",
    ],
    popular: false,
  },
  {
    id: "jersey-only" as PackageType,
    name: "Only Jersey",
    price: config.packagePrices["jersey-only"],
    icon: "🎽",
    features: [
      "Exclusive SSC 2019 Jersey",
      "Custom name & number",
      "Premium quality fabric",
      "Perfect memorabilia",
    ],
    popular: false,
  },
];

export function Packages({ selectedPackage, onSelectPackage }: PackagesProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="packages"
      className="py-20 sm:py-28 bg-gradient-to-br from-white to-emerald-50 overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 mb-8 sm:mb-12">
          <motion.button
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("home")}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group"
          >
            <motion.div
              animate={{ x: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ←
            </motion.div>
            <span>Back to Home</span>
          </motion.button>

          <div className="text-center order-first sm:order-none">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              Choose Your Contribution
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Select the contribution that suits you best
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("album")}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group"
          >
            <span>View Album</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.div>
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectPackage(pkg.id)}
              className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all hover:scale-105 ${
                selectedPackage === pkg.id
                  ? "border-emerald-600 bg-emerald-50 shadow-lg"
                  : "border-gray-200 bg-white hover:border-emerald-300 shadow-md"
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    ⭐ Popular
                  </div>
                </div>
              )}

              {/* Selected Badge */}
              {selectedPackage === pkg.id && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Check className="text-white" size={20} />
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className="text-5xl mb-4 text-center">{pkg.icon}</div>

              {/* Package Name */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                {pkg.name}
              </h3>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-emerald-600">
                  ৳{pkg.price}
                </div>
                <div className="text-sm text-gray-500">BDT</div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Select Button */}
              <button
                className={`w-full mt-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedPackage === pkg.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700"
                }`}
              >
                {selectedPackage === pkg.id ? "Selected ✓" : "Select"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
