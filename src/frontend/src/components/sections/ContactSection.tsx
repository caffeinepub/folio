import {
  Github,
  Globe,
  Link,
  Linkedin,
  Mail,
  MapPin,
  Plus,
  Trash2,
  Twitter,
} from "lucide-react";
import type { Profile, Section, SectionItem } from "../../types/portfolio";
import { ensureUrl } from "../../utils/url";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (changes: Partial<Section>) => void;
  onUpdateProfile?: (changes: Partial<Profile>) => void;
  onAddItem?: () => void;
  onUpdateItem?: (itemId: string, changes: Partial<SectionItem>) => void;
  onRemoveItem?: (itemId: string) => void;
}

export function ContactSection({
  section,
  profile,
  isEditing,
  onUpdate,
  onUpdateProfile,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
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
          {/* Email */}
          {(isEditing || profile.email) && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Mail
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <InlineEdit
                  value={profile.email || ""}
                  onChange={(v) => onUpdateProfile?.({ email: v })}
                  placeholder="your@email.com"
                />
              ) : (
                <a
                  href={`mailto:${profile.email}`}
                  className="text-sm hover:underline"
                  style={{ color: "var(--p-text)" }}
                >
                  {profile.email}
                </a>
              )}
            </div>
          )}

          {/* Location */}
          {(isEditing || profile.location) && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <MapPin
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <InlineEdit
                  value={profile.location || ""}
                  onChange={(v) => onUpdateProfile?.({ location: v })}
                  placeholder="City, Country"
                />
              ) : (
                <span className="text-sm" style={{ color: "var(--p-text)" }}>
                  {profile.location}
                </span>
              )}
            </div>
          )}

          {/* Website */}
          {(isEditing || profile.website) && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Globe
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <InlineEdit
                  value={profile.website || ""}
                  onChange={(v) => onUpdateProfile?.({ website: v })}
                  placeholder="https://yourwebsite.com"
                />
              ) : (
                <a
                  href={ensureUrl(profile.website)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: "var(--p-text)" }}
                >
                  {profile.website}
                </a>
              )}
            </div>
          )}

          {/* GitHub */}
          {(isEditing || profile.github) && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Github
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <InlineEdit
                  value={profile.github || ""}
                  onChange={(v) => onUpdateProfile?.({ github: v })}
                  placeholder="https://github.com/username"
                />
              ) : (
                <a
                  href={ensureUrl(profile.github)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: "var(--p-text)" }}
                >
                  {profile.github}
                </a>
              )}
            </div>
          )}

          {/* LinkedIn */}
          {(isEditing || profile.linkedin) && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Linkedin
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <InlineEdit
                  value={profile.linkedin || ""}
                  onChange={(v) => onUpdateProfile?.({ linkedin: v })}
                  placeholder="https://linkedin.com/in/username"
                />
              ) : (
                <a
                  href={ensureUrl(profile.linkedin)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: "var(--p-text)" }}
                >
                  {profile.linkedin}
                </a>
              )}
            </div>
          )}

          {/* Twitter */}
          {(isEditing || profile.twitter) && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Twitter
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <InlineEdit
                  value={profile.twitter || ""}
                  onChange={(v) => onUpdateProfile?.({ twitter: v })}
                  placeholder="https://twitter.com/username"
                />
              ) : (
                <a
                  href={ensureUrl(profile.twitter)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline"
                  style={{ color: "var(--p-text)" }}
                >
                  {profile.twitter}
                </a>
              )}
            </div>
          )}

          {/* Custom links from section.items */}
          {section.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-4 rounded-xl border transition-colors"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <Link
                className="w-5 h-5 shrink-0"
                style={{ color: "var(--p-accent)" }}
              />
              {isEditing ? (
                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <InlineEdit
                    value={item.title}
                    onChange={(v) => onUpdateItem?.(item.id, { title: v })}
                    placeholder="Link Label"
                  />
                  <InlineEdit
                    value={item.url || ""}
                    onChange={(v) => onUpdateItem?.(item.id, { url: v })}
                    placeholder="https://"
                  />
                </div>
              ) : (
                <a
                  href={ensureUrl(item.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm hover:underline truncate"
                  style={{ color: "var(--p-text)" }}
                >
                  {item.title || item.url}
                </a>
              )}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onRemoveItem?.(item.id)}
                  className="ml-auto p-1 rounded text-red-400 hover:text-red-500 shrink-0"
                  aria-label="Remove link"
                  data-ocid="contact.delete_button"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Add link button */}
        {isEditing && (
          <button
            type="button"
            onClick={onAddItem}
            className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed text-sm font-medium transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
            style={{ borderColor: "var(--p-border)", color: "var(--p-text2)" }}
            data-ocid="contact.button"
          >
            <Plus className="w-4 h-4" /> Add link
          </button>
        )}
      </div>
    </section>
  );
}
