import { motion, AnimatePresence } from "motion/react";
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
  const [galleryIndex, setGalleryIndex] = useState(0);
  const navigate = useNavigate();

  // Lightbox navigation
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

  // Gallery slider navigation
  const galleryNext = () => setGalleryIndex((i) => (i + 1) % ALBUM_PHOTOS.length);
  const galleryPrev = () => setGalleryIndex((i) => (i === 0 ? ALBUM_PHOTOS.length - 1 : i - 1));

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selectedPhoto !== null) {
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "Escape") setSelectedPhoto(null);
      } else {
        if (e.key === "ArrowRight") galleryNext();
        if (e.key === "ArrowLeft") galleryPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedPhoto, handleNext, handlePrev]);

  const currentPhoto = ALBUM_PHOTOS[galleryIndex];

  return (
    <section
      id="album"
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 pt-24 pb-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Back Button (always visible at top) ── */}
        <motion.button
          whileHover={{ scale: 1.05, x: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#059669",
            color: "#ffffff",
            border: "none",
            borderRadius: "999px",
            padding: "10px 20px",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            marginBottom: "32px",
            boxShadow: "0 4px 14px rgba(5,150,105,0.4)",
          }}
        >
          <ChevronLeft size={20} />
          ← Back to Home
        </motion.button>

        {/* ── Heading ── */}
        <div className="flex items-center gap-3 mb-2">
          <Image className="text-emerald-600" size={36} />
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
            Photo Album
          </h2>
        </div>
        <p className="text-gray-500 text-sm sm:text-base mb-10">
          Use the <strong>&lt; &gt;</strong> arrows or keyboard keys to browse photos
        </p>

        {/* ── Main Slider ── */}
        <div className="relative w-full">
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={galleryPrev}
            style={{
              position: "absolute",
              left: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              background: "#059669",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(5,150,105,0.5)",
            }}
          >
            <ChevronLeft size={26} />
          </motion.button>

          {/* Photo Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={galleryIndex}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{ position: "relative" }}
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                style={{
                  width: "100%",
                  height: "480px",
                  objectFit: "cover",
                  display: "block",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=900&h=600&fit=crop";
                }}
              />

              {/* View Full Image Button — always visible on photo */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPhoto(currentPhoto.id)}
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    color: "#059669",
                    border: "2px solid #059669",
                    borderRadius: "999px",
                    padding: "10px 28px",
                    fontWeight: 700,
                    fontSize: "15px",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                    whiteSpace: "nowrap",
                  }}
                >
                  🔍 View Full Image
                </motion.button>
              </div>

              {/* Photo counter badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  borderRadius: "999px",
                  padding: "4px 14px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {galleryIndex + 1} / {ALBUM_PHOTOS.length}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={galleryNext}
            style={{
              position: "absolute",
              right: "-20px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              background: "#059669",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(5,150,105,0.5)",
            }}
          >
            <ChevronRight size={26} />
          </motion.button>
        </div>

        {/* ── Thumbnail Strip ── */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          {ALBUM_PHOTOS.map((photo, idx) => (
            <motion.button
              key={photo.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setGalleryIndex(idx)}
              style={{
                width: "72px",
                height: "60px",
                borderRadius: "10px",
                overflow: "hidden",
                border: galleryIndex === idx ? "3px solid #059669" : "3px solid transparent",
                padding: 0,
                cursor: "pointer",
                opacity: galleryIndex === idx ? 1 : 0.6,
                transition: "all 0.2s",
                boxShadow: galleryIndex === idx ? "0 0 0 2px #6ee7b7" : "none",
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=100&h=80&fit=crop";
                }}
              />
            </motion.button>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-4">
          Press ← → arrow keys to navigate between photos
        </p>
      </div>

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.96)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px",
            }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ position: "relative", width: "100%", maxWidth: "900px" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top bar: Back + Close */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "12px",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "999px",
                    padding: "8px 18px",
                    fontWeight: 700,
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  <ChevronLeft size={18} /> Back
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Image */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedPhoto}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  src={ALBUM_PHOTOS.find((p) => p.id === selectedPhoto)?.src}
                  alt="Full size"
                  style={{
                    width: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                    borderRadius: "12px",
                    display: "block",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1552176875-cfee50b0c768?w=1200&h=900&fit=crop";
                  }}
                />
              </AnimatePresence>

              {/* < > Navigation buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "24px",
                  marginTop: "20px",
                }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrev}
                  style={{
                    background: "#059669",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(5,150,105,0.5)",
                    fontSize: "22px",
                    fontWeight: 700,
                  }}
                >
                  <ChevronLeft size={28} />
                </motion.button>

                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>
                    Photo {ALBUM_PHOTOS.findIndex((p) => p.id === selectedPhoto) + 1} of {ALBUM_PHOTOS.length}
                  </p>
                  {/* Thumbnail strip in lightbox */}
                  <div style={{ display: "flex", gap: "8px", marginTop: "10px", justifyContent: "center" }}>
                    {ALBUM_PHOTOS.map((photo) => (
                      <motion.button
                        key={photo.id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedPhoto(photo.id)}
                        style={{
                          width: "52px",
                          height: "44px",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: selectedPhoto === photo.id ? "2px solid #fff" : "2px solid rgba(255,255,255,0.25)",
                          padding: 0,
                          cursor: "pointer",
                          opacity: selectedPhoto === photo.id ? 1 : 0.6,
                        }}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNext}
                  style={{
                    background: "#059669",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "52px",
                    height: "52px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(5,150,105,0.5)",
                  }}
                >
                  <ChevronRight size={28} />
                </motion.button>
              </div>

              <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "12px", marginTop: "12px" }}>
                ← → arrow keys to navigate &nbsp;·&nbsp; Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
