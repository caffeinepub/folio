import { GraduationCap, Plus, Trash2 } from "lucide-react";
import type { Section, SectionItem } from "../../types/portfolio";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  isEditing?: boolean;
  onAddItem?: () => void;
  onUpdateItem?: (itemId: string, changes: Partial<SectionItem>) => void;
  onRemoveItem?: (itemId: string) => void;
}

export function EducationSection({
  section,
  isEditing,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: Props) {
  return (
    <section
      id={section.id}
      className="py-14 px-6 md:px-12"
      style={{ background: "var(--p-bg2)" }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "var(--p-text)" }}
        >
          {section.title}
        </h2>
        <div className="space-y-6">
          {section.items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 p-5 rounded-xl border"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <div className="shrink-0 mt-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: "var(--p-accent)" }}
                >
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3
                      className="font-semibold"
                      style={{
                        color: "var(--p-text)",
                        fontFamily: "var(--font-heading)",
                      }}
                    >
                      {isEditing ? (
                        <InlineEdit
                          value={item.title}
                          onChange={(v) =>
                            onUpdateItem?.(item.id, { title: v })
                          }
                        />
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--p-accent)" }}
                    >
                      {isEditing ? (
                        <InlineEdit
                          value={item.subtitle || ""}
                          onChange={(v) =>
                            onUpdateItem?.(item.id, { subtitle: v })
                          }
                          placeholder="Institution"
                        />
                      ) : (
                        item.subtitle
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs"
                      style={{ color: "var(--p-text2)" }}
                    >
                      {item.startDate}
                      {item.endDate ? ` – ${item.endDate}` : ""}
                    </span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => onRemoveItem?.(item.id)}
                        className="text-red-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                {(item.description || isEditing) && (
                  <p
                    className="text-sm mt-2"
                    style={{ color: "var(--p-text2)" }}
                  >
                    {isEditing ? (
                      <InlineEdit
                        value={item.description || ""}
                        onChange={(v) =>
                          onUpdateItem?.(item.id, { description: v })
                        }
                        multiline
                        placeholder="Description..."
                      />
                    ) : (
                      item.description
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <button
              type="button"
              onClick={onAddItem}
              className="w-full py-4 border-2 border-dashed rounded-xl flex items-center justify-center gap-2 transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
              style={{
                borderColor: "var(--p-border)",
                color: "var(--p-text2)",
              }}
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
