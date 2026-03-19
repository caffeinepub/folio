import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}

export function InlineEdit({
  value,
  onChange,
  multiline,
  className = "",
  placeholder,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editing) ref.current?.focus();
  }, [editing]);
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const commit = () => {
    onChange(draft);
    setEditing(false);
  };

  if (editing) {
    const shared = {
      ref,
      value: draft,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (!multiline && e.key === "Enter") commit();
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
      },
      className: `w-full bg-transparent border-b-2 border-[var(--p-accent)] outline-none text-inherit font-inherit resize-none ${className}`,
      placeholder,
    };
    return multiline ? (
      <textarea {...shared} rows={3} />
    ) : (
      <input {...shared} />
    );
  }

  return (
    <button
      type="button"
      className={`group relative inline-flex items-start gap-1 cursor-text bg-transparent border-none p-0 text-inherit font-inherit text-left ${className}`}
      onClick={() => setEditing(true)}
    >
      <span>{value || <span className="opacity-40">{placeholder}</span>}</span>
      <Pencil className="opacity-0 group-hover:opacity-50 w-3 h-3 mt-1 shrink-0 transition-opacity" />
    </button>
  );
}
