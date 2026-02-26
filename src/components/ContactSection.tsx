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
      className="py-16 sm:py-20 bg-white border-t border-gray-100"
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

        <div className="grid lg:grid-cols-5 gap-6 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* General Queries */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-200">
                    General Queries
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Comments or questions?
                  </p>
                </div>
              </div>
              <a
                href="tel:01786571200"
                className="flex items-center justify-between bg-emerald-900 hover:bg-emerald-950 transition-colors rounded-xl px-4 py-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-emerald-300 shrink-0" />
                  <span className="font-extrabold text-white text-lg tracking-wide">
                    01786-571200
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500 px-2.5 py-1 rounded-lg">
                  Tap to Call
                </span>
              </a>
            </div>

            {/* Technical Support */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center shrink-0">
                  <Headphones size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-100">
                    Technical Issues
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Website / payment problems?
                  </p>
                </div>
              </div>
              <a
                href="tel:01717529860"
                className="flex items-center justify-between bg-amber-800 hover:bg-amber-900 transition-colors rounded-xl px-4 py-3.5"
              >
                <div className="flex items-center gap-2.5">
                  <Phone size={15} className="text-amber-200 shrink-0" />
                  <span className="font-extrabold text-white text-lg tracking-wide">
                    01717529860
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-200 border border-amber-600 px-2.5 py-1 rounded-lg">
                  Tap to Call
                </span>
              </a>
            </div>
          </motion.div>

          {/* Comment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm overflow-hidden">
              {/* Form header */}
              <div className="px-6 py-4 border-b-2 border-gray-100 bg-gray-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <Send size={14} className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Send a Message
                  </p>
                  <p className="text-[11px] text-gray-400">
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
                      01786-571200
                    </span>
                    .
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
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
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-gray-300 transition-all bg-white"
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
                      rows={5}
                      className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 hover:border-gray-300 transition-all bg-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md hover:shadow-lg"
                  >
                    <Send size={15} />
                    Send via WhatsApp
                  </button>

                  <p className="text-center text-xs text-gray-400 pt-1">
                    Message will be sent to{" "}
                    <span className="font-semibold text-gray-600">
                      01786-571200
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
