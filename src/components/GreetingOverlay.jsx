import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const GreetingOverlay = () => {
  const [showGreeting, setShowGreeting] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Hide greeting after 3s
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Update confetti dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {showGreeting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 sm:px-6">
          {/* Greeting Box */}
          <div className="relative bg-white rounded-2xl p-5 sm:p-8 text-center shadow-2xl animate-fadeIn max-w-md w-full mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold text-pink-600 leading-tight">
              ✨ Welcome to Feshlo ✨
            </h1>
            <p className="mt-3 text-gray-600 text-base sm:text-lg md:text-xl">
              Where Elegance is Redefined.
            </p>

            {/* Glitter sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {new Array(15).fill(0).map((_, i) => (
                <span
                  key={i}
                  className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full glitter"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Confetti */}
          <Confetti width={windowSize.width} height={windowSize.height} />
        </div>
      )}

      {/* Custom Animations */}
      <style>{`
        @keyframes glitter {
          0% { opacity: 0.2; transform: scale(0.5) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(360deg); }
        }
        .glitter {
          animation: glitter 1.5s infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default GreetingOverlay;
