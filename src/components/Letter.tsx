import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { LETTER_CONFIG } from "@/UBAH_DISINI.js";

const TYPING_SPEED = 35; // ms per char

export function Letter() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const fullText = LETTER_CONFIG.body;

  // Typewriter
  useEffect(() => {
    if (typed.length >= fullText.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      setTyped(fullText.slice(0, typed.length + 1));
    }, fullText[typed.length] === "\n" ? 120 : TYPING_SPEED);
    return () => clearTimeout(t);
  }, [typed, fullText]);

  // Smart auto-scroll: keep cursor centered
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
        backgroundColor: "#1e293b",
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full flex flex-col items-center py-10 px-4"
    >
      <div
        ref={cardRef}
        className="w-[90%] max-w-2xl bg-navy-slate rounded-lg shadow-2xl border border-gold/20 overflow-hidden"
      >
        {/* Inner gold border */}
        <div className="m-3 border border-gold/25 rounded-md p-6 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-gold/20">
            <p className="font-hand text-gold/70 text-lg mb-2">
              {LETTER_CONFIG.date}
            </p>
            <h1 className="font-serif-display text-gold text-3xl sm:text-4xl leading-tight">
              {LETTER_CONFIG.title}
            </h1>
            <p className="mt-4 font-script text-gold/90 text-2xl">
              Dear {LETTER_CONFIG.recipientName},
            </p>
          </div>

          {/* Ruled body */}
          <div
            className="ruled-paper font-serif-display text-foreground/90 text-base sm:text-lg"
            style={{
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {typed.split("").map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.15 }}
              >
                {ch}
              </motion.span>
            ))}
            {!done && <span ref={cursorRef} className="typewriter-cursor" />}
          </div>

          {/* Signature */}
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 text-right"
            >
              <p className="font-script text-gold text-3xl">
                {LETTER_CONFIG.senderName}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Save button */}
      {done && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={handleSave}
          disabled={saving}
          className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold to-amber-600 text-navy-deep font-serif-display tracking-wider text-sm uppercase shadow-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-60"
        >
          <Download className="w-4 h-4" />
          {saving ? "Menyimpan..." : "Simpan Surat Ini"}
        </motion.button>
      )}
    </motion.div>
  );
}
