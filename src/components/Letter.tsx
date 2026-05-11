import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { LETTER_CONFIG } from "@/UBAH_DISINI.js";

const TYPING_SPEED = 32;

export function Letter() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const fullText = LETTER_CONFIG.body;

  useEffect(() => {
    if (typed.length >= fullText.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setTyped(fullText.slice(0, typed.length + 1));
    }, fullText[typed.length] === "\n" ? 140 : TYPING_SPEED);
    return () => clearTimeout(t);
  }, [typed, fullText]);

  useEffect(() => {
    if (!cursorRef.current) return;
    const rect = cursorRef.current.getBoundingClientRect();
    const target = rect.top + window.scrollY - window.innerHeight / 2;
    window.scrollTo({ top: target, behavior: "smooth" });
  }, [typed]);

  const handleSave = async () => {
    if (!cardRef.current) return;
    setSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: "#07090f",
        scale: 2,
        useCORS: true,
        windowWidth: cardRef.current.scrollWidth,
        windowHeight: cardRef.current.scrollHeight,
      });
      const link = document.createElement("a");
      link.download = `surat-untuk-${LETTER_CONFIG.recipientName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full flex flex-col items-center py-12 px-4"
      style={{ background: "var(--navy-deep)" }}
    >
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="ambient-orb absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,169,106,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="ambient-orb-delay absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(180,120,80,0.05) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </div>

      {/* Main letter card */}
      <div
        ref={cardRef}
        className="relative w-full max-w-2xl"
        style={{ zIndex: 1 }}
      >
        {/* Outer decorative frame */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "var(--navy-card)",
            boxShadow: `
              0 0 0 1px rgba(212, 169, 106, 0.15),
              0 8px 64px rgba(0, 0, 0, 0.7),
              0 0 120px rgba(212, 169, 106, 0.05),
              inset 0 1px 0 rgba(212, 169, 106, 0.1)
            `,
          }}
        >
          {/* Top decorative border gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,169,106,0.6) 30%, rgba(232,200,154,0.9) 50%, rgba(212,169,106,0.6) 70%, transparent)",
            }}
          />

          {/* Inner padding container */}
          <div className="p-8 sm:p-12">

            {/* Inner decorative border */}
            <div
              className="relative p-6 sm:p-10 rounded-xl"
              style={{
                border: "1px solid rgba(212, 169, 106, 0.18)",
                background: "rgba(255,255,255,0.012)",
              }}
            >
              {/* Corner ornaments */}
              <CornerOrnament className="absolute top-3 left-3" />
              <CornerOrnament className="absolute top-3 right-3 scale-x-[-1]" />
              <CornerOrnament className="absolute bottom-3 left-3 scale-y-[-1]" />
              <CornerOrnament className="absolute bottom-3 right-3 scale-[-1]" />

              {/* Header */}
              <div className="text-center mb-10 pb-8" style={{ borderBottom: "1px solid rgba(212,169,106,0.15)" }}>

                {/* Date with small ornament */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <span style={{ color: "rgba(212,169,106,0.4)", fontSize: "10px", letterSpacing: "0.3em" }}>✦</span>
                  <p
                    className="font-hand"
                    style={{
                      color: "rgba(212,169,106,0.65)",
                      fontSize: "1rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {LETTER_CONFIG.date}
                  </p>
                  <span style={{ color: "rgba(212,169,106,0.4)", fontSize: "10px", letterSpacing: "0.3em" }}>✦</span>
                </div>

                {/* Title — elegant serif display */}
                <h1
                  className="font-serif-display mb-6"
                  style={{
                    fontSize: "clamp(1.5rem, 4vw, 2.4rem)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 1.3,
                    letterSpacing: "0.02em",
                    color: "var(--gold-bright)",
                    textShadow: "0 0 40px rgba(212,169,106,0.2)",
                  }}
                >
                  {LETTER_CONFIG.title}
                </h1>

                {/* Ornament divider */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div style={{ height: "1px", width: "3rem", background: "linear-gradient(to right, transparent, rgba(212,169,106,0.4))" }} />
                  <span style={{ color: "var(--gold)", fontSize: "14px", opacity: 0.5 }}>❧</span>
                  <div style={{ height: "1px", width: "3rem", background: "linear-gradient(to left, transparent, rgba(212,169,106,0.4))" }} />
                </div>

                {/* Salutation — Great Vibes / script */}
                <p
                  className="font-script"
                  style={{
                    color: "var(--gold)",
                    fontSize: "clamp(1.8rem, 5vw, 2.6rem)",
                    lineHeight: 1.3,
                    textShadow: "0 2px 20px rgba(212,169,106,0.2)",
                  }}
                >
                  Dear {LETTER_CONFIG.recipientName},
                </p>
              </div>

              {/* Letter body */}
              <div
                className="ruled-paper"
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  color: "rgba(245,235,215,0.90)",
                  fontSize: "clamp(1rem, 2.2vw, 1.13rem)",
                  lineHeight: "2em",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  letterSpacing: "0.015em",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                {typed.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.12 }}
                  >
                    {ch}
                  </motion.span>
                ))}
                {!done && <span ref={cursorRef} className="typewriter-cursor" />}
              </div>

              {/* Signature */}
              {done && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
                  className="mt-12 text-right"
                >
                  {/* Decorative line before signature */}
                  <div className="flex items-center justify-end gap-3 mb-4">
                    <div style={{ height: "1px", width: "4rem", background: "linear-gradient(to right, transparent, rgba(212,169,106,0.3))" }} />
                    <span style={{ color: "rgba(212,169,106,0.4)", fontSize: "11px" }}>✦</span>
                  </div>

                  <p
                    className="font-script"
                    style={{
                      color: "var(--gold-bright)",
                      fontSize: "clamp(2rem, 6vw, 3rem)",
                      lineHeight: 1.2,
                      textShadow: "0 2px 24px rgba(212,169,106,0.3)",
                    }}
                  >
                    {LETTER_CONFIG.senderName}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Bottom decorative border */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(212,169,106,0.4) 50%, transparent)",
            }}
          />
        </div>
      </div>

      {/* Save button */}
      {done && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          onClick={handleSave}
          disabled={saving}
          className="mt-10 inline-flex items-center gap-3 font-serif-display"
          style={{
            padding: "0.85rem 2.5rem",
            borderRadius: "9999px",
            background: "linear-gradient(135deg, rgba(212,169,106,0.15) 0%, rgba(212,169,106,0.25) 100%)",
            border: "1px solid rgba(212,169,106,0.35)",
            color: "var(--gold-bright)",
            fontSize: "0.85rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
            boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,169,106,0.2)",
            transition: "all 0.3s ease",
            fontStyle: "italic",
          }}
          onMouseEnter={e => {
            if (!saving) {
              (e.currentTarget as HTMLButtonElement).style.background =
                "linear-gradient(135deg, rgba(212,169,106,0.22) 0%, rgba(212,169,106,0.35) 100%)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 32px rgba(0,0,0,0.4), 0 0 24px rgba(212,169,106,0.1), inset 0 1px 0 rgba(212,169,106,0.25)";
            }
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "linear-gradient(135deg, rgba(212,169,106,0.15) 0%, rgba(212,169,106,0.25) 100%)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,169,106,0.2)";
          }}
        >
          <Download style={{ width: "14px", height: "14px" }} />
          {saving ? "Menyimpan..." : "Simpan Surat Ini"}
        </motion.button>
      )}

      {/* Bottom margin */}
      <div className="h-16" />
    </motion.div>
  );
}

/* Small SVG corner ornament */
function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      style={{ opacity: 0.35 }}
    >
      <path
        d="M2 20 L2 4 Q2 2 4 2 L20 2"
        stroke="rgba(212,169,106,0.8)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="2" cy="2" r="1.5" fill="rgba(212,169,106,0.6)" />
      <path
        d="M6 2 L6 6 Q6 7 7 7 L2 7"
        stroke="rgba(212,169,106,0.5)"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}