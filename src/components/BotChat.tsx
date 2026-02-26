import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Bot } from "lucide-react";

const MESSAGES = [
  "তাড়াতাড়ি রেজিস্ট্রেশন করো, সময় নেই।",
  "শিগগিরই দেখা হবে, বুঝোনি !",
  "তোমার বন্ধু রেজিস্ট্রেশন করেছে তো? নিশ্চিত হয়ে নাও।",
];

export function BotChat() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shownCount, setShownCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Appear after 3 s
    timers.push(setTimeout(() => setVisible(true), 3000));

    // Message 1: typing starts at 3 s → arrives at 4 s
    timers.push(setTimeout(() => setIsTyping(true), 3000));
    timers.push(
      setTimeout(() => {
        setIsTyping(false);
        setShownCount(1);
      }, 4000)
    );

    // Message 2: typing at 5.5 s → arrives at 6.5 s
    timers.push(setTimeout(() => setIsTyping(true), 5500));
    timers.push(
      setTimeout(() => {
        setIsTyping(false);
        setShownCount(2);
      }, 6500)
    );

    // Message 3: typing at 8 s → arrives at 9 s
    timers.push(setTimeout(() => setIsTyping(true), 8000));
    timers.push(
      setTimeout(() => {
        setIsTyping(false);
        setShownCount(3);
      }, 9000)
    );

    return () => timers.forEach(clearTimeout);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  const handleRegister = () => {
    document
      .getElementById("registration")
      ?.scrollIntoView({ behavior: "smooth" });
    handleDismiss();
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="fixed z-50 bottom-6 right-6 w-80 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* ── Header ── */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Pilotian Bot</p>
                <p className="text-emerald-200 text-xs">Online</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Close chat"
              title="Close"
              className="text-emerald-200 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Chat body ── */}
          <div className="bg-white p-4 space-y-3">
            <AnimatePresence initial={false}>
              {MESSAGES.slice(0, shownCount).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-emerald-50 rounded-xl rounded-tl-none px-3 py-2 text-sm text-gray-700 leading-relaxed"
                >
                  {msg}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 rounded-xl rounded-tl-none px-3 py-2 flex gap-1 items-center w-16"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.55,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA button — appears after all messages */}
            <AnimatePresence>
              {shownCount === MESSAGES.length && !isTyping && (
                <motion.button
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleRegister}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-sm transition-colors"
                >
                  রেজিস্ট্রেশন করো ↓
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
