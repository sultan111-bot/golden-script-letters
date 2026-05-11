import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface EnvelopeProps {
  recipientName: string;
  onOpen: () => void;
}

export function Envelope({ recipientName, onOpen }: EnvelopeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08, y: -50 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex min-h-screen items-center justify-center p-6"
      style={{ background: "var(--navy-deep)" }}
    >
      {/* Ambient glow behind envelope */}
      <div
        className="absolute"
        style={{
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(212,169,106,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Envelope */}
        <div className="relative w-full" style={{ maxWidth: "440px", aspectRatio: "4 / 2.5" }}>
          {/* Main envelope body */}
          <div
            className="absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: "var(--navy-card)",
              boxShadow: `
                0 0 0 1px rgba(212, 169, 106, 0.18),
                0 20px 80px rgba(0, 0, 0, 0.7),
                0 0 80px rgba(212, 169, 106, 0.06),
                inset 0 1px 0 rgba(212, 169, 106, 0.12)
              `,
            }}
          >
            {/* Top gradient line */}
            <div
              className="absolute top-0 left-0 right-0 h-px z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,169,106,0.7) 50%, transparent)",
              }}
            />

            {/* Bottom flap */}
            <div
              className="absolute inset-x-0 bottom-0 h-1/2"
              style={{
                background: "linear-gradient(180deg, rgba(15,21,32,0.95), rgba(11,16,26,1))",
                clipPath: "polygon(0 100%, 100% 100%, 100% 0, 50% 55%, 0 0)",
              }}
            />

            {/* Side flaps */}
            <div
              className="absolute inset-y-0 left-0 w-1/2"
              style={{
                background: "rgba(12,18,28,0.92)",
                clipPath: "polygon(0 0, 0 100%, 100% 50%)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-1/2"
              style={{
                background: "rgba(12,18,28,0.92)",
                clipPath: "polygon(100% 0, 100% 100%, 0 50%)",
              }}
            />

            {/* Top flap (animated on hover) */}
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 origin-top z-20"
              style={{
                background: "linear-gradient(160deg, rgba(18,26,42,0.98), rgba(14,20,34,0.96))",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                transformStyle: "preserve-3d",
              }}
              initial={{ rotateX: 0 }}
              whileHover={{ rotateX: -18 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />

            {/* Gold border accent lines on flaps */}
            <svg
              className="absolute inset-0 w-full h-full z-10 pointer-events-none"
              viewBox="0 0 440 275"
              preserveAspectRatio="none"
            >
              {/* Diagonal fold lines */}
              <line
                x1="0"
                y1="0"
                x2="220"
                y2="137"
                stroke="rgba(212,169,106,0.12)"
                strokeWidth="0.8"
              />
              <line
                x1="440"
                y1="0"
                x2="220"
                y2="137"
                stroke="rgba(212,169,106,0.12)"
                strokeWidth="0.8"
              />
              <line
                x1="0"
                y1="275"
                x2="220"
                y2="137"
                stroke="rgba(212,169,106,0.12)"
                strokeWidth="0.8"
              />
              <line
                x1="440"
                y1="275"
                x2="220"
                y2="137"
                stroke="rgba(212,169,106,0.12)"
                strokeWidth="0.8"
              />
            </svg>

            {/* Recipient label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
              <p
                className="font-hand"
                style={{
                  color: "rgba(212,169,106,0.55)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.5em",
                  textTransform: "uppercase",
                  marginBottom: "0.3rem",
                }}
              >
                Untuk
              </p>
              <p
                className="font-script"
                style={{
                  color: "var(--gold-bright)",
                  fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
                  lineHeight: 1.2,
                  textShadow: "0 2px 20px rgba(212,169,106,0.25)",
                }}
              >
                {recipientName}
              </p>
            </div>

            {/* Wax seal button */}
            <motion.button
              onClick={onOpen}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center"
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "linear-gradient(145deg, #c49050, #8b5e25, #c49050)",
                border: "2px solid rgba(212,169,106,0.5)",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.5), 0 0 0 4px rgba(212,169,106,0.08), inset 0 1px 0 rgba(255,255,255,0.15)",
                cursor: "pointer",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              aria-label="Buka surat"
            >
              <Heart
                style={{
                  width: "26px",
                  height: "26px",
                  color: "#07090f",
                  fill: "#07090f",
                }}
              />
            </motion.button>

            {/* Bottom gradient line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(212,169,106,0.4) 50%, transparent)",
              }}
            />
          </div>
        </div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-hand text-center"
          style={{
            color: "rgba(212,169,106,0.45)",
            fontSize: "1rem",
            letterSpacing: "0.03em",
          }}
        >
          Sentuh segel untuk membuka ✦
        </motion.p>
      </div>
    </motion.div>
  );
}
