import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer id="contact" className="bg-gradient-to-br from-emerald-900 to-emerald-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <span className="text-emerald-800 font-bold text-lg">SSC</span>
              </div>
              <div>
                <div className="font-bold text-xl">SSC 2019 Batch</div>
                <div className="text-emerald-200 text-sm">Iftar Party</div>
              </div>
            </div>
            <p className="text-emerald-100 text-sm">
              Join us for a memorable reunion this Ramadan. Let's celebrate together and strengthen our bonds.
            </p>
          </div>

          {/* Event Details */}
          <div>
            <h3 className="font-bold text-lg mb-4">Event Details</h3>
            <div className="space-y-3 text-emerald-100 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="flex-shrink-0 mt-0.5" size={18} />
                <div>
                  <div className="font-semibold text-white">Location</div>
                  <div>Gurudaspur Govt. Pilot Model High School</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex-shrink-0 text-lg">📅</span>
                <div>
                  <div className="font-semibold text-white">Date</div>
                  <div>27th Ramadan 1445</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-emerald-100 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <a href="tel:+8801712345678" className="hover:text-white transition-colors">
                  +880 1784915291
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <a href="mailto:ssc2019@example.com" className="hover:text-white transition-colors">
                  mushfikurr19@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
                >
                  <span className="text-xl">f</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 mt-8 pt-8 text-center text-emerald-200 text-sm">
          <p>© 2026 SSC 2019 Batch. All rights reserved.</p>
          <p className="mt-2">Developed by Mushfikur Rahman</p>
        </div>
      </div>
    </footer>
  );
}
