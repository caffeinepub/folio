import { Award, ExternalLink, Plus, Trash2 } from "lucide-react";
import type { Section, SectionItem } from "../../types/portfolio";
import { ImageUpload } from "../editor/ImageUpload";
import { InlineEdit } from "../editor/InlineEdit";

interface Props {
  section: Section;
  isEditing?: boolean;
  onAddItem?: () => void;
  onUpdateItem?: (itemId: string, changes: Partial<SectionItem>) => void;
  onRemoveItem?: (itemId: string) => void;
}

export function CertificatesSection({
  section,
  isEditing,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: Props) {
  return (
    <section id={section.id} className="py-14 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-2xl font-bold mb-8"
          style={{ fontFamily: "var(--font-heading)", color: "var(--p-text)" }}
        >
          {section.title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden shadow-sm border"
              style={{
                background: "var(--p-card)",
                borderColor: "var(--p-border)",
              }}
            >
              {/* IMAGE: natural ratio, no cropping — certificate images fully visible */}
              <div
                className="w-full h-44 flex items-center justify-center p-2"
                style={{
                  background: "#F8FAFC",
                  borderBottom: "1px solid var(--p-border)",
                }}
              >
                {isEditing ? (
                  <ImageUpload
                    imageUrl={item.imageUrl}
                    onUpload={(url) =>
                      onUpdateItem?.(item.id, { imageUrl: url })
                    }
                    onRemove={() => onUpdateItem?.(item.id, { imageUrl: "" })}
                    className="w-full h-40"
                    contain
                  />
                ) : item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "160px",
                      objectFit: "contain",
                      display: "block",
                      padding: "4px",
                    }}
                  />
                ) : (
                  <div
                    className="flex flex-col items-center justify-center gap-2"
                    style={{ color: "var(--p-text2)" }}
                  >
                    <Award className="w-10 h-10 opacity-30" />
                    <span className="text-xs">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="font-semibold text-base"
                    style={{
                      color: "var(--p-text)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {isEditing ? (
                      <InlineEdit
                        value={item.title}
                        onChange={(v) => onUpdateItem?.(item.id, { title: v })}
                      />
                    ) : (
                      item.title
                    )}
                  </h3>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => onRemoveItem?.(item.id)}
                      className="text-red-400 hover:text-red-500 shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Issuer */}
                <p
                  className="text-sm mt-1 font-medium"
                  style={{ color: "var(--p-accent)" }}
                >
                  {isEditing ? (
                    <InlineEdit
                      value={item.issuer || ""}
                      onChange={(v) => onUpdateItem?.(item.id, { issuer: v })}
                      placeholder="Issuing Organization"
                    />
                  ) : (
                    item.issuer
                  )}
                </p>

                {/* Year / Date — now editable */}
                <p className="text-xs mt-1" style={{ color: "var(--p-text2)" }}>
                  {isEditing ? (
                    <InlineEdit
                      value={item.startDate || ""}
                      onChange={(v) =>
                        onUpdateItem?.(item.id, { startDate: v })
                      }
                      placeholder="Year (e.g. 2024)"
                    />
                  ) : (
                    item.startDate
                  )}
                </p>

                {/* Verify URL — now editable */}
                {isEditing ? (
                  <div className="mt-2">
                    <p
                      className="text-xs mb-0.5"
                      style={{ color: "var(--p-text2)" }}
                    >
                      Verify URL
                    </p>
                    <InlineEdit
                      value={item.url || ""}
                      onChange={(v) => onUpdateItem?.(item.id, { url: v })}
                      placeholder="https://verify-link.com"
                    />
                  </div>
                ) : (
                  item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-sm font-medium"
                      style={{ color: "var(--p-accent)" }}
                    >
                      Verify <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <button
              type="button"
              onClick={onAddItem}
              className="rounded-xl border-2 border-dashed min-h-[260px] flex flex-col items-center justify-center gap-2 transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
              style={{
                borderColor: "var(--p-border)",
                color: "var(--p-text2)",
              }}
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Add Certificate</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
