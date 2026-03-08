import { useState } from "react";
import { motion } from "motion/react";
import {
  MessageCircle,
  Phone,
  Send,
  CheckCircle2,
  Headphones,
} from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;
    // Build WhatsApp / SMS-style message link to the contact number
    const text = encodeURIComponent(`Name: ${form.name}\n\n${form.message}`);
    window.open(`https://wa.me/8801786571200?text=${text}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", message: "" });
    }, 3500);
  };

  return (
    <section
      id="comments"
      className="py-20 sm:py-28 bg-white border-t-2 border-gray-100 overflow-x-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-200 mb-4">
            <MessageCircle size={13} />
            Comments &amp; Queries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Have a Question?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Feel free to send us your queries — we'll get back to you as soon as
            possible.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Contact Info Cards — side by side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* General Queries */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 sm:px-5 sm:pt-5 sm:pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle size={17} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200 mb-1">
                      Feedback & Complaints
                    </p>
                    <p className="text-[13px] font-semibold text-white leading-snug">
                      Strictly for suggestions, complaints & feedback
                    </p>
                    <p className="text-[11px] text-emerald-200/80 mt-1.5">
                      Contact Belal Abdullah Anas
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="tel:01786571200"
                className="flex items-center justify-between bg-emerald-900/60 hover:bg-emerald-900/80 transition-colors px-4 sm:px-5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-emerald-300 shrink-0" />
                  <span className="font-bold text-white text-[13px] tracking-wide">
                    01786571200
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-800/60 px-2 py-0.5 rounded-md whitespace-nowrap">
                  Tap to Call
                </span>
              </a>
            </div>

            {/* Technical Support */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 sm:px-5 sm:pt-5 sm:pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Headphones size={17} className="text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100 mb-1">
                      Technical Issues
                    </p>
                    <p className="text-[13px] font-semibold text-white leading-snug">
                      Website / payment problems?
                    </p>
                    <p className="text-[11px] text-amber-200/80 mt-1.5">
                      Contact Provat Kundu
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="tel:01717529860"
                className="flex items-center justify-between bg-amber-800/60 hover:bg-amber-800/80 transition-colors px-4 sm:px-5 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Phone size={13} className="text-amber-200 shrink-0" />
                  <span className="font-bold text-white text-[13px] tracking-wide">
                    01717529860
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-200 bg-amber-900/50 px-2 py-0.5 rounded-md whitespace-nowrap">
                  Tap to Call
                </span>
              </a>
            </div>
          </motion.div>

          {/* Comment Form — full width, centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Form header */}
              <div className="px-5 sm:px-6 py-4 border-b border-gray-100 bg-gray-50/70 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Send size={15} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Send a Message
                  </p>
                  <p className="text-[11px] text-gray-400 leading-snug">
                    Opens WhatsApp — no login needed
                  </p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-14 gap-3 px-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-1">
                    <CheckCircle2 size={34} className="text-emerald-500" />
                  </div>
                  <p className="font-bold text-gray-800 text-xl">
                    Message Sent!
                  </p>
                  <p className="text-gray-400 text-sm max-w-xs">
                    WhatsApp is opening with your message pre-filled to{" "}
                    <span className="font-semibold text-gray-600">
                      01786571200
                    </span>
                    .
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="px-5 sm:px-6 py-5 space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-gray-300 transition-all bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-sm font-semibold text-gray-700">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Write your query or comment here…"
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-gray-300 transition-all bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    <Send size={15} />
                    Send via WhatsApp
                  </button>

                  <p className="text-center text-[11px] text-gray-400">
                    Message will be sent to{" "}
                    <span className="font-semibold text-emerald-600">
                      01786571200
                    </span>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
