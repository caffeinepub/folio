import type { Section } from "../../types/portfolio";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  isEditing?: boolean;
  onUpdate?: (changes: Partial<Section>) => void;
}

export function BlackberryHubSection({ section, isEditing, onUpdate }: Props) {
  return (
    <section
      id={section.id}
      className="py-16 px-6 md:px-12"
      style={{ background: "var(--p-bg)" }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-6">
          <img
            src="/assets/uploads/IMG_20260318_125318_879-1.webp"
            alt="BlackberryHub Logo"
            style={{
              width: "210px",
              height: "210px",
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>

        {/* Title */}
        <h2
          className="text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--p-text)" }}
        >
          {isEditing ? (
            <InlineEdit
              value={section.title}
              onChange={(v) => onUpdate?.({ title: v })}
              placeholder="Section Title"
            />
          ) : (
            section.title
          )}
        </h2>

        {/* Content */}
        <div
          className="text-base leading-relaxed max-w-xl"
          style={{ color: "var(--p-text2)" }}
        >
          {isEditing ? (
            <InlineEdit
              value={section.content || ""}
              onChange={(v) => onUpdate?.({ content: v })}
              multiline
              placeholder="Describe BlackberryHub..."
            />
          ) : (
            section.content
          )}
        </div>
      </div>
    </section>
  );
}
