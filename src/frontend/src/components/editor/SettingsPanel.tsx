import { ChevronDown, ChevronUp, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FONT_PAIRS } from "../../data/fonts";
import { THEMES } from "../../data/themes";
import type {
  PortfolioSettings,
  Profile,
  Section,
} from "../../types/portfolio";

interface Props {
  settings: PortfolioSettings;
  sections: Section[];
  profile: Profile;
  onUpdateSettings: (s: Partial<PortfolioSettings>) => void;
  onUpdateProfile: (p: Partial<Profile>) => void;
  onToggleSection: (id: string) => void;
  onMoveSection: (id: string, dir: -1 | 1) => void;
}

type Tab = "design" | "profile" | "sections";

type ProfileField = {
  key: keyof Profile;
  label: string;
  placeholder: string;
  multiline?: boolean;
};

export function SettingsPanel({
  settings,
  sections,
  profile,
  onUpdateSettings,
  onUpdateProfile,
  onToggleSection,
  onMoveSection,
}: Props) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);
  const [tab, setTab] = useState<Tab>("design");

  const tabs: { id: Tab; label: string }[] = [
    { id: "design", label: "Design" },
    { id: "profile", label: "Profile" },
    { id: "sections", label: "Sections" },
  ];

  const profileFields: ProfileField[] = [
    { key: "name", label: "Name", placeholder: "Your full name" },
    { key: "title", label: "Title", placeholder: "e.g. Software Engineer" },
    { key: "bio", label: "Bio", placeholder: "Short bio...", multiline: true },
    { key: "email", label: "Email", placeholder: "your@email.com" },
    { key: "location", label: "Location", placeholder: "City, Country" },
    {
      key: "github",
      label: "GitHub URL",
      placeholder: "https://github.com/...",
    },
    {
      key: "linkedin",
      label: "LinkedIn URL",
      placeholder: "https://linkedin.com/in/...",
    },
    {
      key: "twitter",
      label: "Twitter URL",
      placeholder: "https://twitter.com/...",
    },
    { key: "website", label: "Website", placeholder: "https://..." },
  ];

  return (
    <div className="flex flex-col h-full" style={{ color: "var(--p-text)" }}>
      {/* Tab bar */}
      <div
        className="flex border-b shrink-0"
        style={{ borderColor: "var(--p-border)" }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className="flex-1 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
            style={{
              color: tab === t.id ? "var(--p-accent)" : "var(--p-text2)",
              borderBottom:
                tab === t.id
                  ? "2px solid var(--p-accent)"
                  : "2px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* DESIGN TAB */}
        {tab === "design" && (
          <div>
            <div
              className="p-4 border-b"
              style={{ borderColor: "var(--p-border)" }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: "var(--p-text2)" }}
              >
                Themes
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
            <div className="p-4">
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
                        settings.fontPair === fp.id
                          ? "var(--p-bg2)"
                          : "transparent",
                      color: "var(--p-text)",
                    }}
                  >
                    {fp.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {tab === "profile" && (
          <div className="p-4 space-y-4">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1"
              style={{ color: "var(--p-text2)" }}
            >
              Profile Info
            </p>
            {profileFields.map((field) => {
              const value = (profile[field.key] as string) ?? "";
              return (
                <div key={field.key}>
                  <label
                    htmlFor={`profile-field-${field.key}`}
                    className="block text-xs font-medium mb-1"
                    style={{ color: "var(--p-text2)" }}
                  >
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      id={`profile-field-${field.key}`}
                      value={value}
                      onChange={(e) =>
                        onUpdateProfile({ [field.key]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      rows={3}
                      className="w-full text-sm px-3 py-2 rounded-lg border resize-none outline-none"
                      style={{
                        background: "var(--p-bg2)",
                        borderColor: "var(--p-border)",
                        color: "var(--p-text)",
                      }}
                    />
                  ) : (
                    <input
                      id={`profile-field-${field.key}`}
                      type="text"
                      value={value}
                      onChange={(e) =>
                        onUpdateProfile({ [field.key]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      className="w-full text-sm px-3 py-2 rounded-lg border outline-none"
                      style={{
                        background: "var(--p-bg2)",
                        borderColor: "var(--p-border)",
                        color: "var(--p-text)",
                      }}
                    />
                  )}
                </div>
              );
            })}
            <p className="text-xs mt-2" style={{ color: "var(--p-text2)" }}>
              Click Save in the top bar to apply changes.
            </p>
          </div>
        )}

        {/* SECTIONS TAB */}
        {tab === "sections" && (
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
        )}
      </div>
    </div>
  );
}
