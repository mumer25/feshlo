import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const { pathname } = useLocation();

  // 👇 Scroll to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <footer className="bg-gray-900 text-gray-300 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-16">

            {/* Branding */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Feshlo</h2>
              <p className="text-gray-400">
                Quality fashion delivered to your doorstep. COD available.
                <h2>Follow Us on Social Media for Latest Updates</h2> <br />
              </p>
              <div className="flex space-x-4 mt-2">
                <a
                  href="https://web.facebook.com/people/Feshlo/61576231335546/#"
                  className="hover:text-white transition"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.instagram.com/p/DN3TUfP2BP4/"
                  className="hover:text-white transition"
                >
                  <FaInstagram />
                </a>
                 <a
                  href="https://whatsapp.com/channel/0029VbATyOw4Y9lj3kWjOV18"
                  className="hover:text-white transition"
                >
                  <FaWhatsapp/>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-white mb-2">Quick Links</h3>
              <Link to="/shop" className="hover:text-white transition">
                Shop
              </Link>
              <Link to="/contact" className="hover:text-white transition">
                Contact
              </Link>
              <Link to="/return-policy" className="hover:text-white transition">
                Return Policy
              </Link>
              <Link to="/delivery-process" className="hover:text-white transition">
                Delivery Process
              </Link>
            </div>

            {/* Contact */}
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold text-white mb-2">Contact</h3>
              <p>
                Support:{" "}
                <a
                  href="mailto:feshloofficial@gmail.com"
                  className="hover:text-white transition"
                >
                  feshloofficial@gmail.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+923229199459"
                  className="hover:text-white transition"
                >
                  +92 322 9199459
                </a>
              </p>
              <p>Punjab, Pakistan</p>
            </div>
          </div>

          <hr className="my-8 border-gray-700" />

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <div>© {new Date().getFullYear()} Feshlo. All rights reserved.</div>
            <div className="mt-2 md:mt-0">COD • Secure Payment</div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/923229199459"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </>
  );
}
