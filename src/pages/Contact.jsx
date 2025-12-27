import { FaFacebookF, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Card Box */}
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold mb-6 text-gray-900">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Have questions or need help? Our team is here to assist you.  <br/>
            Connect with us and also follow us on social media for the latest updates!
          </p>

          {/* Social + Contact Icons */}
          <div className="flex justify-center flex-wrap gap-6">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61576231335546&mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition transform hover:scale-110"
            >
              <FaFacebookF size={22} />
            </a>

            {/* WhatsApp */}
            <a
              href="https://whatsapp.com/channel/0029VbATyOw4Y9lj3kWjOV18"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-md hover:bg-green-600 transition transform hover:scale-110"
            >
              <FaWhatsapp size={22} />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/feshlo.official?igsh=MXhqNTV0ZW52YzVoaQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500 text-white shadow-md hover:bg-pink-600 transition transform hover:scale-110"
            >
              <FaInstagram size={22} />
            </a>

            {/* Email */}
            <a
              href="mailto:feshloofficial@gmail.com"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition transform hover:scale-110"
            >
              <FaEnvelope size={22} />
            </a>

            {/* Phone */}
            <a
              href="tel:+923229199459"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500 text-white shadow-md hover:bg-purple-600 transition transform hover:scale-110"
            >
              <FaPhone size={22} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
