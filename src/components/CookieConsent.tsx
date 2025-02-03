import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="cookie-consent"
        >
          <div className="container-xl flex items-center justify-between gap-4 flex-wrap">
            <p className="text-sm text-gray-400">
              We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
              <a
                href="/privacy"
                className="text-[var(--color-primary)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more
              </a>
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleAccept}
                className="btn-primary flex items-center gap-2"
              >
                Accept
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;