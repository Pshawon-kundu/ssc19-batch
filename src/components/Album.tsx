import { motion } from "motion/react";
import { Image, X } from "lucide-react";
import { useState } from "react";
import photo1 from "../assets/1.jpeg";
import photo2 from "../assets/2.jpeg";
import photo3 from "../assets/3.jpeg";
import photo4 from "../assets/4.jpeg";
import photo5 from "../assets/5.jpeg";

const ALBUM_PHOTOS = [
  { id: 1, src: photo1, alt: "Event photo 1" },
  { id: 2, src: photo2, alt: "Event photo 2" },
  { id: 3, src: photo3, alt: "Event photo 3" },
  { id: 4, src: photo4, alt: "Event photo 4" },
  { id: 5, src: photo5, alt: "Event photo 5" },
];

interface AlbumProps {
  onClose?: () => void;
}

export function Album({ onClose }: AlbumProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ALBUM_PHOTOS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? ALBUM_PHOTOS.length - 1 : prev - 1,
    );
  };

  return (
    <section
      id="album"
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-24 pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <Image className="text-emerald-600" size={40} />
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Photo Album
          </h2>
        </div>

        <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
          Relive the amazing moments from our SSC 2019 Batch Iftar Reunion. All
          photos from the event are displayed below.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {ALBUM_PHOTOS.map((photo, idx) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => setSelectedPhoto(photo.id)}
              className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-80"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=600&h=600&fit=crop";
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 px-6 py-3 rounded-full font-semibold hover:bg-emerald-50 transition-colors"
                >
                  View Full Size
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Full Size Image Modal */}
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={32} className="text-white" />
              </motion.button>

              {/* Image */}
              <motion.img
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={ALBUM_PHOTOS.find((p) => p.id === selectedPhoto)?.src}
                alt="Full size"
                className="w-full h-auto rounded-lg shadow-2xl max-h-[80vh] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=1200&h=800&fit=crop";
                }}
              />

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  ← Previous
                </motion.button>

                <div className="flex gap-2">
                  {ALBUM_PHOTOS.map((photo) => (
                    <motion.button
                      key={photo.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedPhoto(photo.id)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPhoto === photo.id
                          ? "border-white"
                          : "border-white/30"
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src =
                            "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=100&h=100&fit=crop";
                        }}
                      />
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  Next →
                </motion.button>
              </div>

              {/* Photo Counter */}
              <div className="text-center mt-6 text-white/80">
                <p className="text-lg font-semibold">
                  Photo {currentIndex + 1} of {ALBUM_PHOTOS.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg text-center"
        >
          <p className="text-gray-600">
            <span className="text-3xl font-bold text-emerald-600">
              {ALBUM_PHOTOS.length}
            </span>{" "}
            Amazing Moments Captured
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
