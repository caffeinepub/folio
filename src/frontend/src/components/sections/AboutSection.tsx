import type { Section } from "../../types/portfolio";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  isEditing?: boolean;
  onUpdate?: (changes: Partial<Section>) => void;
}

export function AboutSection({ section, isEditing, onUpdate }: Props) {
  return (
    <section id={section.id} className="py-14 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-6"
          style={{ fontFamily: "var(--font-heading)", color: "var(--p-text)" }}
        >
          {section.title}
        </h2>
        <div
          className="text-base leading-relaxed whitespace-pre-line"
          style={{ color: "var(--p-text2)" }}
        >
          {isEditing ? (
            <InlineEdit
              value={section.content || ""}
              onChange={(v) => onUpdate?.({ content: v })}
              multiline
              className="w-full text-base"
              placeholder="Write about yourself..."
            />
          ) : (
            section.content
          )}
        </div>
      </div>
    </section>
  );
}
