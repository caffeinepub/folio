import { ExternalLink, Plus, Trash2 } from "lucide-react";
import type { Section, SectionItem } from "../../types/portfolio";
import { ImageUpload } from "../editor/ImageUpload";
import { InlineEdit } from "../editor/InlineEdit";

function uid() {
  return Math.random().toString(36).slice(2);
}

interface Props {
  section: Section;
  isEditing?: boolean;
  onUpdate?: (changes: Partial<Section>) => void;
  onAddItem?: () => void;
  onUpdateItem?: (itemId: string, changes: Partial<SectionItem>) => void;
  onRemoveItem?: (itemId: string) => void;
}

export function ProjectsSection({
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
              {/* IMAGE: natural ratio, no cropping */}
              <div
                className="w-full h-48 flex items-center justify-center"
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
                    className="w-full h-48"
                    contain
                  />
                ) : item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "192px",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-sm"
                    style={{ color: "var(--p-text2)" }}
                  >
                    No Image
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
                      data-ocid="projects.delete_button"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <p
                  className="text-sm mt-1 leading-relaxed"
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
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{
                          background: "var(--p-bg2)",
                          color: "var(--p-accent)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* LINKS */}
                {isEditing ? (
                  <div className="mt-3">
                    <p
                      className="text-xs font-semibold mb-1.5"
                      style={{ color: "var(--p-text2)" }}
                    >
                      Links
                    </p>
                    <div className="space-y-1.5">
                      {(item.links || []).map((link) => (
                        <div
                          key={link.id}
                          className="flex items-center gap-1.5"
                        >
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => {
                              const newLinks = (item.links || []).map((l) =>
                                l.id === link.id
                                  ? { ...l, label: e.target.value }
                                  : l,
                              );
                              onUpdateItem?.(item.id, { links: newLinks });
                            }}
                            placeholder="Label"
                            className="flex-1 min-w-0 text-xs px-2 py-1 rounded border"
                            style={{
                              background: "var(--p-bg)",
                              borderColor: "var(--p-border)",
                              color: "var(--p-text)",
                              outline: "none",
                            }}
                            data-ocid="projects.input"
                          />
                          <input
                            type="url"
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = (item.links || []).map((l) =>
                                l.id === link.id
                                  ? { ...l, url: e.target.value }
                                  : l,
                              );
                              onUpdateItem?.(item.id, { links: newLinks });
                            }}
                            placeholder="https://..."
                            className="flex-[2] min-w-0 text-xs px-2 py-1 rounded border"
                            style={{
                              background: "var(--p-bg)",
                              borderColor: "var(--p-border)",
                              color: "var(--p-text)",
                              outline: "none",
                            }}
                            data-ocid="projects.input"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newLinks = (item.links || []).filter(
                                (l) => l.id !== link.id,
                              );
                              onUpdateItem?.(item.id, { links: newLinks });
                            }}
                            className="text-red-400 hover:text-red-500 shrink-0"
                            data-ocid="projects.delete_button"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newLinks = [
                          ...(item.links || []),
                          { id: uid(), label: "", url: "" },
                        ];
                        onUpdateItem?.(item.id, { links: newLinks });
                      }}
                      className="mt-2 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors"
                      style={{
                        color: "var(--p-accent)",
                        background: "var(--p-bg2)",
                      }}
                      data-ocid="projects.button"
                    >
                      <Plus className="w-3 h-3" /> Add Link
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.links && item.links.length > 0
                      ? item.links
                          .filter((l) => l.url)
                          .map((link) => (
                            <a
                              key={link.id}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border transition-colors hover:bg-[var(--p-bg2)]"
                              style={{
                                color: "var(--p-accent)",
                                borderColor: "var(--p-accent)",
                              }}
                            >
                              {link.label || "Link"}{" "}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))
                      : item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-sm font-medium"
                            style={{ color: "var(--p-accent)" }}
                          >
                            View Project{" "}
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isEditing && (
            <button
              type="button"
              onClick={onAddItem}
              className="rounded-xl border-2 border-dashed min-h-[280px] flex flex-col items-center justify-center gap-2 transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
              style={{
                borderColor: "var(--p-border)",
                color: "var(--p-text2)",
              }}
              data-ocid="projects.button"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Add Project</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
