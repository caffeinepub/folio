import { X } from "lucide-react";
import type { SectionType } from "../../types/portfolio";

const SECTION_TYPES: { type: SectionType; label: string; desc: string }[] = [
  { type: "about", label: "About Me", desc: "Bio and personal info" },
  { type: "projects", label: "Projects", desc: "Showcase your work" },
  {
    type: "certificates",
    label: "Certificates",
    desc: "Credentials and awards",
  },
  { type: "education", label: "Education", desc: "Academic background" },
  { type: "skills", label: "Skills", desc: "Technical and soft skills" },
  { type: "gallery", label: "Gallery", desc: "Photo gallery" },
  { type: "contact", label: "Contact", desc: "How to reach you" },
  { type: "custom", label: "Custom", desc: "Free-form section" },
  {
    type: "blackberryhub",
    label: "BlackberryHub",
    desc: "BlackberryHub branded section",
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (type: SectionType) => void;
}

export function AddSectionModal({ open, onClose, onAdd }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
        }}
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
      />
      <div
        className="relative z-10 w-full max-w-md rounded-2xl p-6 shadow-2xl"
        style={{ background: "var(--p-card)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3
            className="font-bold text-lg"
            style={{
              color: "var(--p-text)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Add Section
          </h3>
          <button type="button" onClick={onClose}>
            <X className="w-5 h-5" style={{ color: "var(--p-text2)" }} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {SECTION_TYPES.map((s) => (
            <button
              type="button"
              key={s.type}
              onClick={() => {
                onAdd(s.type);
                onClose();
              }}
              className="text-left p-4 rounded-xl border transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
              style={{
                borderColor: "var(--p-border)",
                background: "var(--p-bg)",
              }}
            >
              <p
                className="font-semibold text-sm"
                style={{ color: "var(--p-text)" }}
              >
                {s.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--p-text2)" }}>
                {s.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
