import { Plus, Trash2 } from "lucide-react";
import type { Section, SectionItem } from "../../types/portfolio";
import { ImageUpload } from "../editor/ImageUpload";

interface Props {
  section: Section;
  isEditing?: boolean;
  onAddItem?: () => void;
  onUpdateItem?: (itemId: string, changes: Partial<SectionItem>) => void;
  onRemoveItem?: (itemId: string) => void;
}

export function GallerySection({
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {section.items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl overflow-hidden border relative group"
              style={{
                background: "#F8FAFC",
                borderColor: "var(--p-border)",
                aspectRatio: "1",
              }}
            >
              {/* Gallery images: contain, no crop */}
              <div className="w-full h-full flex items-center justify-center">
                {isEditing ? (
                  <ImageUpload
                    imageUrl={item.imageUrl}
                    onUpload={(url) =>
                      onUpdateItem?.(item.id, { imageUrl: url })
                    }
                    onRemove={() => onUpdateItem?.(item.id, { imageUrl: "" })}
                    className="w-full h-full"
                    contain
                  />
                ) : item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                ) : null}
              </div>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => onRemoveItem?.(item.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <button
              type="button"
              onClick={onAddItem}
              className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)]"
              style={{
                borderColor: "var(--p-border)",
                color: "var(--p-text2)",
                aspectRatio: "1",
              }}
            >
              <Plus className="w-6 h-6" />
              <span className="text-xs">Add Photo</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
