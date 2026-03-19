import { Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";
import type { Profile, Section } from "../../types/portfolio";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (changes: Partial<Section>) => void;
}

export function ContactSection({
  section,
  profile,
  isEditing,
  onUpdate,
}: Props) {
  return (
    <section id={section.id} className="py-14 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--p-text)" }}
        >
          {section.title}
        </h2>
        <p className="text-base mb-8" style={{ color: "var(--p-text2)" }}>
          {isEditing ? (
            <InlineEdit
              value={section.content || ""}
              onChange={(v) => onUpdate?.({ content: v })}
              multiline
              placeholder="Contact intro..."
            />
          ) : (
            section.content
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.email && (
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-[var(--p-accent)]"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Mail className="w-5 h-5" style={{ color: "var(--p-accent)" }} />
              <span className="text-sm" style={{ color: "var(--p-text)" }}>
                {profile.email}
              </span>
            </a>
          )}
          {profile.location && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <MapPin
                className="w-5 h-5"
                style={{ color: "var(--p-accent)" }}
              />
              <span className="text-sm" style={{ color: "var(--p-text)" }}>
                {profile.location}
              </span>
            </div>
          )}
          {profile.website && (
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-[var(--p-accent)]"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Globe className="w-5 h-5" style={{ color: "var(--p-accent)" }} />
              <span className="text-sm" style={{ color: "var(--p-text)" }}>
                {profile.website}
              </span>
            </a>
          )}
          {profile.github && (
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-[var(--p-accent)]"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Github
                className="w-5 h-5"
                style={{ color: "var(--p-accent)" }}
              />
              <span className="text-sm" style={{ color: "var(--p-text)" }}>
                GitHub
              </span>
            </a>
          )}
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors hover:border-[var(--p-accent)]"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Linkedin
                className="w-5 h-5"
                style={{ color: "var(--p-accent)" }}
              />
              <span className="text-sm" style={{ color: "var(--p-text)" }}>
                LinkedIn
              </span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
