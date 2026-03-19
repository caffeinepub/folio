import { Upload, X } from "lucide-react";
import { useRef } from "react";

interface Props {
  imageUrl?: string;
  onUpload: (dataUrl: string) => void;
  onRemove?: () => void;
  className?: string;
  label?: string;
  contain?: boolean;
}

export function ImageUpload({
  imageUrl,
  onUpload,
  onRemove,
  className = "",
  label = "Upload Image",
  contain,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onUpload(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className={`relative ${className}`}>
      {imageUrl ? (
        <div className="relative group w-full h-full">
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full"
            style={{ objectFit: contain ? "contain" : "cover" }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white/90 text-gray-800 rounded-lg px-3 py-1.5 text-sm font-medium hover:bg-white"
            >
              Change
            </button>
            {onRemove && (
              <button
                type="button"
                onClick={onRemove}
                className="bg-red-500/90 text-white rounded-lg p-1.5 hover:bg-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-full border-2 border-dashed border-[var(--p-border)] rounded-xl flex flex-col items-center justify-center gap-2 hover:border-[var(--p-accent)] hover:bg-[var(--p-bg2)] transition-colors text-[var(--p-text2)] min-h-[120px]"
        >
          <Upload className="w-6 h-6" />
          <span className="text-sm">{label}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}
