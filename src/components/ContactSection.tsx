import { useState } from "react";
import { motion } from "motion/react";
import { MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";

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
      className="py-16 bg-gradient-to-br from-emerald-50 via-white to-amber-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            <MessageCircle size={14} />
            Comments &amp; Queries
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Have a Question?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
            Feel free to send us your queries or comments — we'll get back to
            you as soon as possible.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-5 gap-6 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="sm:col-span-2 space-y-4"
          >
            {/* General Queries */}
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-md p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <MessageCircle size={17} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                    General Queries
                  </p>
                  <p className="text-sm text-gray-600">
                    Comments or questions?
                  </p>
                </div>
              </div>
              <a
                href="tel:01786571200"
                className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-xl px-4 py-3 group"
              >
                <Phone size={16} className="text-emerald-600 shrink-0" />
                <span className="font-bold text-emerald-700 text-base tracking-wide group-hover:text-emerald-800">
                  01786-571200
                </span>
              </a>
            </div>

            {/* Technical Support */}
            <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                  <Phone size={17} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">
                    Technical Issues
                  </p>
                  <p className="text-sm text-gray-600">
                    Website / payment problems?
                  </p>
                </div>
              </div>
              <a
                href="tel:01717529860"
                className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 transition-colors rounded-xl px-4 py-3 group"
              >
                <Phone size={16} className="text-amber-600 shrink-0" />
                <span className="font-bold text-amber-700 text-base tracking-wide group-hover:text-amber-800">
                  01717529860
                </span>
              </a>
            </div>
          </motion.div>

          {/* Comment Form */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sm:col-span-3"
          >
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center py-10 gap-3 text-center"
                >
                  <CheckCircle2 size={48} className="text-emerald-500" />
                  <p className="font-bold text-gray-800 text-lg">
                    Message sent!
                  </p>
                  <p className="text-gray-400 text-sm">
                    Opening WhatsApp with your message…
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Enter your name"
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all hover:border-gray-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Write your query or comment here…"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all hover:border-gray-300 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm shadow-md"
                  >
                    <Send size={16} />
                    Send via WhatsApp
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    This will open WhatsApp with your message pre-filled to{" "}
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
