import { useCallback, useEffect, useRef, useState } from "react";
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

function saveLocal(data: PortfolioData) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {}
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function usePortfolio() {
  const { actor, isFetching } = useActor();
  // Start with null -- do NOT show sample data to visitors before backend loads
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loaded, setLoaded] = useState(false);
  // Track latest actor in a ref so saveToBackend always uses the current actor
  const actorRef = useRef(actor);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  // Load from backend on mount
  useEffect(() => {
    if (!actor || isFetching || loaded) return;
    actor
      .getPortfolio()
      .then((json) => {
        if (json && json.trim() !== "") {
          try {
            const parsed = JSON.parse(json) as PortfolioData;
            if (isValidPortfolio(parsed)) {
              setData(parsed);
              setLoaded(true);
              return;
            }
          } catch {}
        }
        // Backend returned nothing valid -- fall back to local or sample
        const local = loadLocal();
        if (local) {
          setData(local);
        } else {
          setData(getSampleData());
        }
        setLoaded(true);
      })
      .catch(() => {
        const local = loadLocal();
        setData(local ?? getSampleData());
        setLoaded(true);
      });
  }, [actor, isFetching, loaded]);

  const update = useCallback((fn: (d: PortfolioData) => PortfolioData) => {
    setData((prev) => (prev ? fn(prev) : prev));
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
      // Use actorRef to always get the latest actor, even if it was null at hook creation
      const currentActor = actorRef.current;
      if (!currentActor || !data) return false;

      const json = JSON.stringify(data);

      // Attempt 1
      try {
        const ok = await currentActor.savePortfolio(json, pin);
        if (ok) {
          saveLocal(data);
          return true;
        }
      } catch {
        // first attempt failed, will retry
      }

      // Wait and retry once
      await sleep(2000);
      const retryActor = actorRef.current;
      if (!retryActor) return false;
      try {
        const ok = await retryActor.savePortfolio(json, pin);
        if (ok) {
          saveLocal(data);
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [data],
  );

  return {
    data,
    loaded,
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
