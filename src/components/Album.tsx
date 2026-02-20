import { motion } from "motion/react";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (selectedPhoto === null) return;
    const currentIdx = ALBUM_PHOTOS.findIndex((p) => p.id === selectedPhoto);
    const nextIdx = (currentIdx + 1) % ALBUM_PHOTOS.length;
    setSelectedPhoto(ALBUM_PHOTOS[nextIdx].id);
  }, [selectedPhoto]);

  const handlePrev = useCallback(() => {
    if (selectedPhoto === null) return;
    const currentIdx = ALBUM_PHOTOS.findIndex((p) => p.id === selectedPhoto);
    const prevIdx = currentIdx === 0 ? ALBUM_PHOTOS.length - 1 : currentIdx - 1;
    setSelectedPhoto(ALBUM_PHOTOS[prevIdx].id);
  }, [selectedPhoto]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPhoto, handleNext, handlePrev]);

  const carouselWidth = (400 + 24) * ALBUM_PHOTOS.length;

  return (
    <section
      id="album"
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-24 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-full px-4 sm:px-6 lg:px-8"
      >
        {/* Header with Back Button */}
        <div className="max-w-7xl mx-auto mb-12">
          <motion.button
            whileHover={{ scale: 1.05, x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold mb-8 group"
          >
            <ChevronLeft size={20} />
            <span>Back to Home</span>
          </motion.button>

          <div className="flex items-center gap-3 mb-6">
            <Image className="text-emerald-600" size={40} />
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
              Complete Photo Album
            </h2>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">
            Swipe or scroll to view all amazing moments from our reunion
          </p>
        </div>

        {/* Continuous Scrolling Carousel - 1 Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full overflow-hidden"
        >
          {/* left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-emerald-50 to-transparent z-30 pointer-events-none" />
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-emerald-50 to-transparent z-30 pointer-events-none" />

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -carouselWidth] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-6 py-8 px-4"
            >
              {[...ALBUM_PHOTOS, ...ALBUM_PHOTOS, ...ALBUM_PHOTOS].map(
                (photo, idx) => (
                  <motion.div
                    key={`${photo.id}-${idx}`}
                    onClick={() => setSelectedPhoto(photo.id)}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 30px 60px -15px rgba(16, 185, 129, 0.4)",
                      y: -10,
                    }}
                    className="relative flex-shrink-0 w-96 h-72 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer group transition-all duration-300"
                  >
                    <motion.img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=800&h=600&fit=crop";
                      }}
                    />

                    {/* Overlay on Hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col items-center justify-center gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="bg-white/90 hover:bg-white text-emerald-600 px-6 py-2 rounded-full font-semibold text-sm sm:text-base transition-all"
                      >
                        Click to View Full
                      </motion.div>
                    </motion.div>

                    {/* Image Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-semibold text-emerald-600">
                      {photo.alt}
                    </div>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-7xl mx-auto mt-16 bg-white rounded-2xl p-8 shadow-lg border border-emerald-100"
        >
          <div className="flex flex-col sm:flex-row items-center justify-around gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-emerald-600">
                5
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Stunning Photos
              </p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-emerald-200" />
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-emerald-600">
                ∞
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Continuous Memories
              </p>
            </div>
            <div className="hidden sm:block w-px h-16 bg-emerald-200" />
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-emerald-600">
                100%
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-2">
                Pure Joy & Nostalgia
              </p>
            </div>
          </div>
        </motion.div>

        {/* Full Screen Image Modal */}
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
              >
                <X size={24} className="text-white" />
              </motion.button>

              {/* Back Button */}
              <motion.button
                whileHover={{ scale: 1.05, x: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 left-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
              >
                <ChevronLeft size={20} className="text-white" />
                <span className="text-white text-sm font-semibold">Back</span>
              </motion.button>

              {/* Image */}
              <motion.img
                key={selectedPhoto}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={ALBUM_PHOTOS.find((p) => p.id === selectedPhoto)?.src}
                alt="Full size"
                className="w-full h-auto rounded-xl shadow-2xl max-h-[85vh] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=1200&h=900&fit=crop";
                }}
              />

              {/* Navigation Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, x: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrev}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <ChevronLeft size={18} /> Previous
                </motion.button>

                {/* Image Counter */}
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white text-lg font-bold">
                    Photo{" "}
                    {ALBUM_PHOTOS.findIndex((p) => p.id === selectedPhoto) + 1}{" "}
                    of {ALBUM_PHOTOS.length}
                  </p>

                  {/* Thumbnail Selector */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {ALBUM_PHOTOS.map((photo) => (
                      <motion.button
                        key={photo.id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPhoto(photo.id)}
                        className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedPhoto === photo.id
                            ? "border-white shadow-lg"
                            : "border-white/30 opacity-70 hover:opacity-100"
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
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Next <ChevronRight size={18} />
                </motion.button>
              </div>

              {/* Navigation Hint */}
              <p className="text-center text-white/50 text-xs mt-4">
                Use arrow keys or swipe buttons to navigate &nbsp;·&nbsp; Press
                Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
