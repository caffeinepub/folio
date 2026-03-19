import { Plus, Trash2 } from "lucide-react";
import type { Section, SectionItem } from "../../types/portfolio";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  isEditing?: boolean;
  onAddItem?: () => void;
  onUpdateItem?: (itemId: string, changes: Partial<SectionItem>) => void;
  onRemoveItem?: (itemId: string) => void;
}

function groupByCategory(items: SectionItem[]): Record<string, SectionItem[]> {
  const result: Record<string, SectionItem[]> = {};
  for (const item of items) {
    const key = item.subtitle || "General";
    if (!result[key]) result[key] = [];
    result[key].push(item);
  }
  return result;
}

export function SkillsSection({
  section,
  isEditing,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: Props) {
  const grouped = groupByCategory(section.items);

  return (
    <section id={section.id} className="py-14 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "var(--p-text)" }}
        >
          {section.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Object.entries(grouped).map(([category, items]) => (
            <div
              key={category}
              className="p-5 rounded-xl border"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              <h3
                className="font-semibold text-sm uppercase tracking-wider mb-4"
                style={{ color: "var(--p-accent)" }}
              >
                {category}
              </h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--p-text)" }}
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
                      </span>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => onRemoveItem?.(item.id)}
                          className="text-red-400 hover:text-red-500"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div
                      className="h-1.5 rounded-full"
                      style={{ background: "var(--p-border)" }}
                    >
                      <div
                        className="h-1.5 rounded-full transition-all"
                        style={{
                          width: `${((item.level || 3) / 5) * 100}%`,
                          background: "var(--p-accent)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {isEditing && (
          <button
            type="button"
            onClick={onAddItem}
            className="mt-4 px-4 py-2 border-2 border-dashed rounded-xl flex items-center gap-2 text-sm transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
            style={{ borderColor: "var(--p-border)", color: "var(--p-text2)" }}
          >
            <Plus className="w-4 h-4" /> Add Skill
          </button>
        )}
      </div>
    </section>
  );
}
