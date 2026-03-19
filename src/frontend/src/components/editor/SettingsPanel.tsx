import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { FONT_PAIRS } from "../../data/fonts";
import { THEMES } from "../../data/themes";
import type { PortfolioSettings, Section } from "../../types/portfolio";

interface Props {
  settings: PortfolioSettings;
  sections: Section[];
  onUpdateSettings: (s: Partial<PortfolioSettings>) => void;
  onToggleSection: (id: string) => void;
  onMoveSection: (id: string, dir: -1 | 1) => void;
}

export function SettingsPanel({
  settings,
  sections,
  onUpdateSettings,
  onToggleSection,
  onMoveSection,
}: Props) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      style={{ color: "var(--p-text)" }}
    >
      {/* THEMES */}
      <div className="p-4 border-b" style={{ borderColor: "var(--p-border)" }}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--p-text2)" }}
        >
          Design &amp; Themes
        </p>
        <div className="grid grid-cols-6 gap-2">
          {THEMES.map((theme) => (
            <button
              type="button"
              key={theme.id}
              onClick={() => onUpdateSettings({ theme: theme.id })}
              title={theme.name}
              className="w-8 h-8 rounded-full border-2 transition-all hover:scale-110 flex items-center justify-center"
              style={{
                background: theme.swatch,
                borderColor:
                  settings.theme === theme.id
                    ? "var(--p-accent)"
                    : "transparent",
                boxShadow:
                  settings.theme === theme.id
                    ? "0 0 0 2px var(--p-accent)"
                    : "none",
              }}
            >
              {settings.theme === theme.id && (
                <span className="text-white text-xs font-bold">✓</span>
              )}
            </button>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: "var(--p-text2)" }}>
          {THEMES.find((t) => t.id === settings.theme)?.name}
        </p>
      </div>

      {/* FONTS */}
      <div className="p-4 border-b" style={{ borderColor: "var(--p-border)" }}>
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--p-text2)" }}
        >
          Fonts
        </p>
        <div className="space-y-1.5 max-h-52 overflow-y-auto">
          {FONT_PAIRS.map((fp) => (
            <button
              type="button"
              key={fp.id}
              onClick={() => onUpdateSettings({ fontPair: fp.id })}
              className="w-full text-left px-3 py-2 rounded-lg border transition-colors text-sm"
              style={{
                borderColor:
                  settings.fontPair === fp.id
                    ? "var(--p-accent)"
                    : "var(--p-border)",
                background:
                  settings.fontPair === fp.id ? "var(--p-bg2)" : "transparent",
                color: "var(--p-text)",
              }}
            >
              {fp.name}
            </button>
          ))}
        </div>
      </div>

      {/* SECTIONS */}
      <div className="p-4">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "var(--p-text2)" }}
        >
          Sections
        </p>
        <div className="space-y-1.5">
          {sorted.map((section, idx) => (
            <div
              key={section.id}
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{ background: "var(--p-bg2)" }}
            >
              <span
                className="text-sm flex-1 truncate"
                style={{ color: "var(--p-text)" }}
              >
                {section.title}
              </span>
              <button
                type="button"
                onClick={() => onMoveSection(section.id, -1)}
                disabled={idx === 0}
                className="p-0.5 rounded opacity-50 hover:opacity-100 disabled:opacity-20"
              >
                <ChevronUp
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--p-text2)" }}
                />
              </button>
              <button
                type="button"
                onClick={() => onMoveSection(section.id, 1)}
                disabled={idx === sorted.length - 1}
                className="p-0.5 rounded opacity-50 hover:opacity-100 disabled:opacity-20"
              >
                <ChevronDown
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--p-text2)" }}
                />
              </button>
              <button
                type="button"
                onClick={() => onToggleSection(section.id)}
                className="ml-1"
              >
                {section.isVisible ? (
                  <Eye
                    className="w-4 h-4"
                    style={{ color: "var(--p-accent)" }}
                  />
                ) : (
                  <EyeOff
                    className="w-4 h-4"
                    style={{ color: "var(--p-text2)" }}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
