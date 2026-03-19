import { useCallback, useEffect, useState } from "react";
import { getSampleData } from "../data/sampleData";
import type {
  PortfolioData,
  PortfolioSettings,
  Profile,
  Section,
  SectionItem,
} from "../types/portfolio";
import { useActor } from "./useActor";

const KEY = "folio_data";

function loadLocal(): PortfolioData | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PortfolioData;
      if (isValidPortfolio(parsed)) return parsed;
    }
  } catch {}
  return null;
}

function isValidPortfolio(data: unknown): data is PortfolioData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return (
    typeof d.profile === "object" &&
    d.profile !== null &&
    typeof d.settings === "object" &&
    d.settings !== null &&
    Array.isArray(d.sections)
  );
}

export function usePortfolio() {
  const { actor, isFetching } = useActor();
  const [data, setData] = useState<PortfolioData>(
    () => loadLocal() ?? getSampleData(),
  );
  const [loaded, setLoaded] = useState(false);

  // Load from backend on mount
  useEffect(() => {
    if (!actor || isFetching || loaded) return;
    actor
      .getPortfolio()
      .then((json) => {
        if (json && json.trim() !== "") {
          try {
            const parsed = JSON.parse(json) as PortfolioData;
            // Only use backend data if it's a valid portfolio structure
            if (isValidPortfolio(parsed)) {
              setData(parsed);
            }
          } catch {}
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [actor, isFetching, loaded]);

  const update = useCallback((fn: (d: PortfolioData) => PortfolioData) => {
    setData((prev) => fn(prev));
  }, []);

  const updateProfile = useCallback(
    (profile: Partial<Profile>) => {
      update((d) => ({ ...d, profile: { ...d.profile, ...profile } }));
    },
    [update],
  );

  const updateSettings = useCallback(
    (settings: Partial<PortfolioSettings>) => {
      update((d) => ({ ...d, settings: { ...d.settings, ...settings } }));
    },
    [update],
  );

  const updateSection = useCallback(
    (id: string, changes: Partial<Section>) => {
      update((d) => ({
        ...d,
        sections: d.sections.map((s) =>
          s.id === id ? { ...s, ...changes } : s,
        ),
      }));
    },
    [update],
  );

  const addSection = useCallback(
    (section: Section) => {
      update((d) => ({ ...d, sections: [...d.sections, section] }));
    },
    [update],
  );

  const removeSection = useCallback(
    (id: string) => {
      update((d) => ({
        ...d,
        sections: d.sections.filter((s) => s.id !== id),
      }));
    },
    [update],
  );

  const addItem = useCallback(
    (sectionId: string, item: SectionItem) => {
      update((d) => ({
        ...d,
        sections: d.sections.map((s) =>
          s.id === sectionId ? { ...s, items: [...s.items, item] } : s,
        ),
      }));
    },
    [update],
  );

  const updateItem = useCallback(
    (sectionId: string, itemId: string, changes: Partial<SectionItem>) => {
      update((d) => ({
        ...d,
        sections: d.sections.map((s) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.map((i) =>
                  i.id === itemId ? { ...i, ...changes } : i,
                ),
              }
            : s,
        ),
      }));
    },
    [update],
  );

  const removeItem = useCallback(
    (sectionId: string, itemId: string) => {
      update((d) => ({
        ...d,
        sections: d.sections.map((s) =>
          s.id === sectionId
            ? { ...s, items: s.items.filter((i) => i.id !== itemId) }
            : s,
        ),
      }));
    },
    [update],
  );

  const reorderSections = useCallback(
    (ids: string[]) => {
      update((d) => ({
        ...d,
        sections: ids
          .map((id, order) => {
            const s = d.sections.find((x) => x.id === id);
            return s ? { ...s, order } : null;
          })
          .filter(Boolean) as Section[],
      }));
    },
    [update],
  );

  const saveToBackend = useCallback(
    async (pin: string): Promise<boolean> => {
      if (!actor) return false;
      try {
        const json = JSON.stringify(data);
        const ok = await actor.savePortfolio(json, pin);
        if (ok) {
          try {
            localStorage.setItem(KEY, json);
          } catch {}
        }
        return ok;
      } catch {
        return false;
      }
    },
    [actor, data],
  );

  return {
    data,
    updateProfile,
    updateSettings,
    updateSection,
    addSection,
    removeSection,
    addItem,
    updateItem,
    removeItem,
    reorderSections,
    saveToBackend,
  };
}
