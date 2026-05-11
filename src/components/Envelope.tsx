import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  recipientName: string;
  onOpen: () => void;
}

export function Envelope({ recipientName, onOpen }: EnvelopeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex min-h-screen items-center justify-center p-6"
    >
      <div className="relative w-full max-w-md aspect-[4/2.6]">
        {/* Envelope body */}
        <div className="absolute inset-0 bg-navy-slate rounded-md shadow-2xl border border-gold/20 overflow-hidden">
          {/* Inner gold trim */}
          <div className="absolute inset-2 border border-gold/20 rounded-sm" />
          {/* Bottom flap */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-navy-slate"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 60%, 0 0)",
            }}
          />
          {/* Side flaps */}
          <div
            className="absolute inset-y-0 left-0 w-1/2 bg-navy-slate/80"
            style={{ clipPath: "polygon(0 0, 0 100%, 100% 50%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/2 bg-navy-slate/80"
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
          />

          {/* Top flap (animated) */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-navy-slate origin-top z-20"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              transformStyle: "preserve-3d",
            }}
            initial={{ rotateX: 0 }}
            whileHover={{ rotateX: -15 }}
            transition={{ duration: 0.4 }}
          />

          {/* Recipient label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <p className="font-serif-display text-gold/70 text-xs tracking-[0.4em] uppercase mb-1">
              For
            </p>
            <p className="font-script text-gold text-3xl">{recipientName}</p>
          </div>

          {/* Wax seal */}
          <button
            onClick={onOpen}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-700 shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform border-2 border-gold/40"
            aria-label="Open letter"
          >
            <Heart className="w-7 h-7 text-navy-deep" fill="currentColor" />
          </button>
        </div>

        <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-gold/60 text-sm font-hand text-center w-full">
          Tap the seal to open ✦
        </p>
      </div>
    </motion.div>
  );
}
