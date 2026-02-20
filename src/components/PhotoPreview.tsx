import { motion } from "motion/react";
import { Image, ArrowRight } from "lucide-react";

interface PhotoPreviewProps {
  totalRegistered: number;
  onViewAlbum?: () => void;
}

export function PhotoPreview({
  totalRegistered,
  onViewAlbum,
}: PhotoPreviewProps) {
  // Photos from uploaded images
  const samplePhotos = [
    { id: 1, src: "1.jpeg", alt: "Event photo 1" },
    { id: 2, src: "2.jpeg", alt: "Event photo 2" },
    { id: 3, src: "3.jpeg", alt: "Event photo 3" },
    { id: 4, src: "4.jpeg", alt: "Event photo 4" },
    { id: 5, src: "5.jpeg", alt: "Event photo 5" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-100"
    >
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-3">
          <Image className="text-emerald-600" size={32} />
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Photo Gallery
            </h3>
            <p className="text-sm text-gray-600">Event Highlights Preview</p>
          </div>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600">5</p>
          <p className="text-sm text-gray-600">Photos Captured</p>
        </div>
      </div>

      {/* Mini Gallery Grid - 2x3 layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
        {samplePhotos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-lg group"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4 + idx * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full h-full"
            >
              <motion.img
                src={`/assets/${photo.src}`}
                alt={photo.alt}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=300&h=300&fit=crop";
                }}
              />
            </motion.div>
            {/* Overlay for hover effect */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center"
            >
              <span className="text-white text-xs sm:text-sm font-semibold">
                {photo.alt}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <motion.button
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(16, 185, 129, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        onClick={
          onViewAlbum ||
          (() => {
            const element = document.getElementById("album");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          })
        }
        className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
      >
        <span>View Full Album</span>
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowRight size={20} />
        </motion.div>
      </motion.button>

      {/* Info Text */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Click "View Full Album" to see all {samplePhotos.length} photos in full
        resolution
      </p>
    </motion.div>
  );
}
