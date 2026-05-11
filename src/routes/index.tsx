import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Envelope } from "@/components/Envelope";
import { Letter } from "@/components/Letter";
import { PortraitGuard } from "@/components/PortraitGuard";
import { LETTER_CONFIG } from "@/UBAH_DISINI.js";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: `Surat untuk ${LETTER_CONFIG.recipientName}` },
      { name: "description", content: LETTER_CONFIG.title },
    ],
  }),
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="min-h-screen bg-navy-deep">
      <PortraitGuard />
      <AnimatePresence mode="wait">
        {!opened ? (
          <Envelope
            key="env"
            recipientName={LETTER_CONFIG.recipientName}
            onOpen={() => setOpened(true)}
          />
        ) : (
          <Letter key="letter" />
        )}
      </AnimatePresence>
    </div>
  );
}
