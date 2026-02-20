import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ─── Emerald palette (hex so Tailwind build is not required) ─── */
const C = {
  bg:           "#022c22", // emerald-950
  bgCard:       "rgba(6, 78, 59, 0.45)", // emerald-900 @ 45%
  border:       "rgba(52, 211, 153, 0.2)", // emerald-400 @ 20%
  borderHover:  "rgba(52, 211, 153, 0.4)",
  glowTop:      "rgba(16, 185, 129, 0.15)",  // emerald-500 soft
  glowBottom:   "rgba(13, 148, 136, 0.12)",  // teal-600 soft
  textPrimary:  "#ffffff",
  textAccent:   "#34d399", // emerald-400
  textMuted:    "rgba(255,255,255,0.55)",
  textLabel:    "#6ee7b7", // emerald-300
  divider:      "rgba(52, 211, 153, 0.15)",
  btnBg:        "#34d399", // emerald-400
  btnText:      "#022c22", // emerald-950
};

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
};

const slideUp = {
  hidden:  { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 90, damping: 12 },
  },
};

export function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "1.5rem 1rem",
        fontFamily: "inherit",
      }}
    >
      {/* ── Soft radial glows ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-10%",
            width: "55%",
            height: "55%",
            background: C.glowTop,
            borderRadius: "100%",
            filter: "blur(100px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            right: "-10%",
            width: "55%",
            height: "55%",
            background: C.glowBottom,
            borderRadius: "100%",
            filter: "blur(100px)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "3rem",
        }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── TITLE ── */}
        <motion.div
          variants={slideUp}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
        >
          <h1
            style={{
              fontSize: "clamp(3.2rem, 11vw, 8.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: C.textPrimary,
              margin: 0,
              textShadow: `0 0 40px rgba(52,211,153,0.25), 0 8px 32px rgba(0,0,0,0.6)`,
            }}
          >
            PILOTIAN
            <span style={{ color: C.textAccent, marginLeft: "0.18em" }}>'19</span>
          </h1>

          {/* Thin decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
            style={{
              height: "2px",
              width: "120px",
              background: `linear-gradient(90deg, transparent, ${C.textAccent}, transparent)`,
              borderRadius: "99px",
            }}
          />

          <p
            style={{
              color: C.textLabel,
              fontSize: "clamp(0.65rem, 1.5vw, 0.9rem)",
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            SSC Batch · Class of 2019
          </p>
          <p
            style={{
              color: C.textMuted,
              fontSize: "clamp(0.8rem, 1.8vw, 1.05rem)",
              fontStyle: "italic",
              fontWeight: 300,
              margin: 0,
            }}
          >
            Iftar Party Reunion
          </p>
        </motion.div>

        {/* ── INFO CARD ── */}
        <motion.div
          variants={slideUp}
          style={{
            width: "100%",
            background: C.bgCard,
            borderRadius: "20px",
            border: `1px solid ${C.border}`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
            boxShadow: `0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 ${C.borderHover}`,
          }}
        >
          {/* Top highlight line */}
          <div
            style={{
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${C.textAccent}, transparent)`,
              opacity: 0.5,
            }}
          />

          {/* 3-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            {[
              { label: "Date",       value: "Ramadan 2026" },
              { label: "Time",       value: "Iftar Onwards" },
              { label: "Batch Size", value: "120+ Members"  },
            ].map((item, idx) => (
              <div
                key={item.label}
                style={{
                  padding: "1.75rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: idx !== 0 ? `1px solid ${C.divider}` : "none",
                  gap: "0.35rem",
                }}
              >
                <span
                  style={{
                    color: C.textLabel,
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.label}
                </span>
                <span
                  style={{
                    color: C.textPrimary,
                    fontSize: "clamp(0.95rem, 2.2vw, 1.35rem)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── CTA BUTTON ── */}
        <motion.button
          variants={slideUp}
          onClick={() => navigate("/event")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.9rem 2.5rem",
            background: C.btnBg,
            color: C.btnText,
            borderRadius: "99px",
            border: "none",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: `0 0 24px rgba(52,211,153,0.35)`,
            transition: "box-shadow 0.25s ease",
          }}
        >
          Enter Event
          <ArrowRight size={20} strokeWidth={2.5} />
        </motion.button>

        {/* ── Footer tag ── */}
        <motion.p
          variants={slideUp}
          style={{
            position: "absolute",
            bottom: "-3rem",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(255,255,255,0.15)",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          Reconnect • Celebrate • Remember
        </motion.p>
      </motion.div>
    </div>
  );
}
