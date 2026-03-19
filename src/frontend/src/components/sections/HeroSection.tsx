import { Github, Globe, Linkedin, Mail, MapPin, Twitter } from "lucide-react";
import type { Profile } from "../../types/portfolio";
import { ensureUrl } from "../../utils/url";
import { ImageUpload } from "../editor/ImageUpload";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  profile: Profile;
  isEditing?: boolean;
  onUpdate?: (p: Partial<Profile>) => void;
}

export function HeroSection({ profile, isEditing, onUpdate }: Props) {
  return (
    <section
      id="hero"
      className="w-full py-16 px-6 md:px-12"
      style={{
        background:
          "linear-gradient(135deg, var(--p-bg) 0%, var(--p-bg2) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Profile Image */}
        <div className="shrink-0">
          {isEditing ? (
            <ImageUpload
              imageUrl={profile.profileImageUrl}
              onUpload={(url) => onUpdate?.({ profileImageUrl: url })}
              onRemove={() => onUpdate?.({ profileImageUrl: "" })}
              className="w-36 h-36 rounded-full overflow-hidden"
            />
          ) : (
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-4 border-[var(--p-accent)] shadow-lg"
              style={{ boxShadow: "0 0 0 4px var(--p-accent)" }}
            >
              {profile.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-4xl font-bold"
                  style={{ background: "var(--p-accent)", color: "#fff" }}
                >
                  {profile.name.charAt(0)}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1
            className="text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--p-text)",
            }}
          >
            {isEditing ? (
              <InlineEdit
                value={profile.name}
                onChange={(v) => onUpdate?.({ name: v })}
                placeholder="Your Name"
                className="text-4xl font-extrabold uppercase"
              />
            ) : (
              profile.name
            )}
          </h1>
          <p
            className="text-lg font-semibold mb-3"
            style={{ color: "var(--p-accent)" }}
          >
            {isEditing ? (
              <InlineEdit
                value={profile.title}
                onChange={(v) => onUpdate?.({ title: v })}
                placeholder="Your Title"
              />
            ) : (
              profile.title
            )}
          </p>
          <p
            className="text-sm leading-relaxed mb-4 max-w-xl"
            style={{ color: "var(--p-text2)" }}
          >
            {isEditing ? (
              <InlineEdit
                value={profile.bio}
                onChange={(v) => onUpdate?.({ bio: v })}
                multiline
                placeholder="Short bio..."
              />
            ) : (
              profile.bio
            )}
          </p>
          <div
            className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm"
            style={{ color: "var(--p-text2)" }}
          >
            {(isEditing || profile.location) && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {isEditing ? (
                  <InlineEdit
                    value={profile.location}
                    onChange={(v) => onUpdate?.({ location: v })}
                    placeholder="Location"
                  />
                ) : (
                  profile.location
                )}
              </span>
            )}
            {(isEditing || profile.email) && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {isEditing ? (
                  <InlineEdit
                    value={profile.email}
                    onChange={(v) => onUpdate?.({ email: v })}
                    placeholder="email"
                  />
                ) : (
                  profile.email
                )}
              </span>
            )}
          </div>
          <div className="flex gap-3 mt-4 justify-center md:justify-start">
            {(profile.github || isEditing) && (
              <a
                href={ensureUrl(profile.github)}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-[var(--p-bg2)]"
                style={{ color: "var(--p-text2)" }}
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {(profile.linkedin || isEditing) && (
              <a
                href={ensureUrl(profile.linkedin)}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-[var(--p-bg2)]"
                style={{ color: "var(--p-text2)" }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {(profile.twitter || isEditing) && (
              <a
                href={ensureUrl(profile.twitter)}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-[var(--p-bg2)]"
                style={{ color: "var(--p-text2)" }}
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {(profile.website || isEditing) && (
              <a
                href={ensureUrl(profile.website)}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg transition-colors hover:bg-[var(--p-bg2)]"
                style={{ color: "var(--p-text2)" }}
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
