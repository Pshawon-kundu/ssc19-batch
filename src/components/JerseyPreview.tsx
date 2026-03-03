import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import jerseyImage from "../assets/j.jpg";

export function JerseyPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
        Jersey Preview 👕
      </h3>

      <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-emerald-100 to-amber-100 mb-4">
        <ImageWithFallback
          src={jerseyImage}
          alt="SSC 2019 Jersey"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="space-y-3 text-center">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <h4 className="font-semibold text-emerald-800 mb-2">Features:</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ Premium quality fabric</li>
            <li>✓ SSC 2019 Batch logo</li>
            <li>✓ Custom name & number</li>
            <li>✓ Comfortable fit</li>
          </ul>
        </div>

        <p className="text-sm text-gray-600 italic">
          *Jersey design is for illustration purposes
        </p>
      </div>
    </motion.div>
  );
}
