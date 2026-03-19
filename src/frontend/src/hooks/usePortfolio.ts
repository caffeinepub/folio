import { useCallback, useEffect, useState } from "react";
import { getSampleData } from "../data/sampleData";
import type {
  PortfolioData,
  PortfolioSettings,
  Profile,
  Section,
  SectionItem,
} from "../types/portfolio";

const KEY = "folio_data";

function load(): PortfolioData {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as PortfolioData;
  } catch {}
  return getSampleData();
}

function save(data: PortfolioData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
}

export function usePortfolio() {
  const [data, setData] = useState<PortfolioData>(load);

  const update = useCallback((fn: (d: PortfolioData) => PortfolioData) => {
    setData((prev) => {
      const next = fn(prev);
      save(next);
      return next;
    });
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
  };
}
