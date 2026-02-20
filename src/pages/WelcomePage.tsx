import { motion, useAnimation } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* ─── Emerald palette ─── */
const C = {
  bg:        "#022c22",
  bgCard:    "rgba(6, 78, 59, 0.5)",
  border:    "rgba(52, 211, 153, 0.2)",
  glowTop:   "rgba(16, 185, 129, 0.18)",
  glowBot:   "rgba(13, 148, 136, 0.14)",
  white:     "#ffffff",
  accent:    "#34d399",
  label:     "#6ee7b7",
  muted:     "rgba(255,255,255,0.5)",
  divider:   "rgba(52, 211, 153, 0.15)",
  btnBg:     "#34d399",
  btnText:   "#022c22",
};

/* ─── High-Five SVG ─── */
function HighFiveScene() {
  const leftArm  = useAnimation();
  const rightArm = useAnimation();
  const spark    = useAnimation();
  const leftBody  = useAnimation();
  const rightBody = useAnimation();

  useEffect(() => {
    const run = async () => {
      // Walk in & lean
      await Promise.all([
        leftBody.start({ x: 0, transition: { duration: 0.7, ease: "easeOut" } }),
        rightBody.start({ x: 0, transition: { duration: 0.7, ease: "easeOut" } }),
      ]);
      // Raise arms to high-five
      await Promise.all([
        leftArm.start({ rotate: -130, transition: { duration: 0.4, ease: "easeInOut" } }),
        rightArm.start({ rotate: 130, transition: { duration: 0.4, ease: "easeInOut" } }),
      ]);
      // Flash spark
      await spark.start({
        opacity: [0, 1, 1, 0],
        scale: [0.4, 1.4, 1.1, 0],
        transition: { duration: 0.55, times: [0, 0.3, 0.7, 1] },
      });
      // Victory bounce loop
      leftBody.start({
        y: [0, -8, 0],
        transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" },
      });
      rightBody.start({
        y: [0, -8, 0],
        transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.15 },
      });
      // Arms stay up and sway slightly
      leftArm.start({
        rotate: [-130, -120, -130],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
      });
      rightArm.start({
        rotate: [130, 120, 130],
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.1 },
      });
    };
    const t = setTimeout(run, 1200);
    return () => clearTimeout(t);
  }, []);

  const strokeProps = {
    stroke: C.accent,
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    fill: "none",
  };

  /* ── Single figure (left faces right, right is mirrored via scaleX) ── */
  const Figure = ({
    ctrl,
    armCtrl,
    mirror,
  }: {
    ctrl: ReturnType<typeof useAnimation>;
    armCtrl: ReturnType<typeof useAnimation>;
    mirror: boolean;
  }) => (
    <motion.g
      animate={ctrl}
      initial={{ x: mirror ? 60 : -60 }}
      style={{ transformOrigin: "50% 50%" }}
    >
      <g transform={mirror ? "scale(-1,1) translate(-100,0)" : ""}>
        {/* Head */}
        <circle cx="50" cy="14" r="9" {...strokeProps} />
        {/* Body */}
        <line x1="50" y1="23" x2="50" y2="56" {...strokeProps} />
        {/* Raised arm (high-five side) */}
        <motion.line
          x1="50" y1="32" x2="72" y2="20"
          {...strokeProps}
          animate={armCtrl}
          initial={{ rotate: 0 }}
          style={{ transformOrigin: "50px 32px" }}
        />
        {/* Resting arm */}
        <line x1="50" y1="32" x2="30" y2="45" {...strokeProps} />
        {/* Left leg */}
        <line x1="50" y1="56" x2="38" y2="80" {...strokeProps} />
        {/* Right leg */}
        <line x1="50" y1="56" x2="62" y2="80" {...strokeProps} />
      </g>
    </motion.g>
  );

  return (
    <div style={{ position: "relative", width: "220px", height: "100px" }}>
      <svg
        viewBox="0 0 220 100"
        width="220"
        height="100"
        style={{ overflow: "visible" }}
      >
        {/* Left person */}
        <Figure ctrl={leftBody} armCtrl={leftArm} mirror={false} />

        {/* Right person (mirrored, offset right) */}
        <g transform="translate(120, 0)">
          <Figure ctrl={rightBody} armCtrl={rightArm} mirror={true} />
        </g>

        {/* Spark at contact point */}
        <motion.g
          animate={spark}
          initial={{ opacity: 0, scale: 0 }}
          style={{ transformOrigin: "110px 12px" }}
        >
          {/* Star burst */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="110" y1="12"
              x2={110 + 14 * Math.cos((deg * Math.PI) / 180)}
              y2={12  + 14 * Math.sin((deg * Math.PI) / 180)}
              stroke="#fbbf24"
              strokeWidth={2.5}
              strokeLinecap="round"
            />
          ))}
          <circle cx="110" cy="12" r="5" fill="#fbbf24" opacity={0.9} />
        </motion.g>
      </svg>
    </div>
  );
}

/* ─── Main page ─── */
const containerV = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
} as const;
const slideUp = {
  hidden:  { y: 26, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 90, damping: 12 } },
} as const;

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
        padding: "2rem 1rem",
        fontFamily: "inherit",
      }}
    >
      {/* Glows */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-15%", left: "-10%", width: "55%", height: "55%", background: C.glowTop, borderRadius: "100%", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "-15%", right: "-10%", width: "55%", height: "55%", background: C.glowBot, borderRadius: "100%", filter: "blur(100px)" }} />
      </div>

      <motion.div
        variants={containerV}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "860px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2.5rem",
        }}
      >
        {/* ── High-Five Animation ── */}
        <motion.div variants={slideUp}>
          <HighFiveScene />
        </motion.div>

        {/* ── TITLE ── */}
        <motion.div
          variants={slideUp}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.9rem" }}
        >
          <h1
            style={{
              fontSize: "clamp(3.2rem, 11vw, 8.5rem)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.02em",
              color: C.white,
              margin: 0,
              textShadow: `0 0 40px rgba(52,211,153,0.3), 0 8px 32px rgba(0,0,0,0.6)`,
            }}
          >
            PILOTIAN
            <span style={{ color: C.accent, marginLeft: "0.15em" }}>'19</span>
          </h1>

          {/* Divider line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
            style={{
              height: "2px",
              width: "100px",
              background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
              borderRadius: "99px",
            }}
          />

          <p style={{ color: C.label, fontSize: "clamp(0.62rem, 1.4vw, 0.85rem)", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase", margin: 0 }}>
            SSC Batch · Class of 2019
          </p>
          <p style={{ color: C.muted, fontSize: "clamp(0.8rem, 1.7vw, 1rem)", fontStyle: "italic", fontWeight: 300, margin: 0 }}>
            Iftar Party Reunion
          </p>
        </motion.div>

        {/* ── INFO CARD ── */}
        <motion.div
          variants={slideUp}
          style={{
            width: "100%",
            background: C.bgCard,
            borderRadius: "18px",
            border: `1px solid ${C.border}`,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            overflow: "hidden",
            boxShadow: `0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(52,211,153,0.35)`,
          }}
        >
          {/* Top glow line */}
          <div style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, opacity: 0.6 }} />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {[
              { label: "Date",       value: "27th Ramadan" },
              { label: "Time",       value: "Iftar Onwards" },
              { label: "Batch Size", value: "120+ Members"  },
            ].map((item, idx) => (
              <div
                key={item.label}
                style={{
                  padding: "1.6rem 0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  borderLeft: idx !== 0 ? `1px solid ${C.divider}` : "none",
                  gap: "0.4rem",
                }}
              >
                <span style={{ color: C.label, fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                  {item.label}
                </span>
                <span style={{ color: C.white, fontSize: "clamp(1rem, 2.2vw, 1.3rem)", fontWeight: 700, letterSpacing: "0.02em" }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── BUTTON ── */}
        <motion.button
          variants={slideUp}
          onClick={() => navigate("/event")}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.9rem 2.4rem",
            background: C.btnBg,
            color: C.btnText,
            borderRadius: "99px",
            border: "none",
            fontWeight: 700,
            fontSize: "1.05rem",
            letterSpacing: "0.04em",
            cursor: "pointer",
            boxShadow: `0 0 28px rgba(52,211,153,0.4)`,
          }}
        >
          Enter Event
          <ArrowRight size={20} strokeWidth={2.5} />
        </motion.button>

        {/* Footer */}
        <motion.p
          variants={slideUp}
          style={{
            color: "rgba(255,255,255,0.15)",
            fontSize: "0.58rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Reconnect • Celebrate • Remember
        </motion.p>
      </motion.div>
    </div>
  );
}
