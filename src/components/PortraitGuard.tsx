import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone } from "lucide-react";

export function PortraitGuard() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = () => {
      const portrait = window.matchMedia("(orientation: portrait)").matches;
      const mobile = window.innerWidth < 900;
      setIsPortrait(portrait && mobile);
    };
    check();
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);

  return (
    <AnimatePresence>
      {isPortrait && !dismissed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-navy-deep/95 backdrop-blur-sm flex items-center justify-center p-6"
        >
          <div className="max-w-sm text-center space-y-6">
            <motion.div
              animate={{ rotate: [0, -90, -90, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
              className="inline-block"
            >
              <Smartphone className="w-16 h-16 text-gold mx-auto" />
            </motion.div>
            <h2 className="font-serif-display text-2xl text-gold">Miringkan HP kamu</h2>
            <p className="text-foreground/70 leading-relaxed">
              Untuk pengalaman membaca terbaik, putar perangkatmu ke mode{" "}
              <span className="text-gold">Landscape</span> ✨
            </p>
            <button
              onClick={() => setDismissed(true)}
              className="mt-4 px-6 py-2.5 rounded-full border border-gold/40 text-gold/80 text-sm hover:bg-gold/10 transition-colors"
            >
              Tetap di Portrait
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
