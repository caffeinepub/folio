import { useEffect } from "react";
import { FONT_PAIRS } from "../data/fonts";
import { THEMES } from "../data/themes";

export function useTheme(themeId: string, fontPairId: string) {
  useEffect(() => {
    const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0];
    const root = document.documentElement;
    for (const [k, v] of Object.entries(theme.vars)) {
      root.style.setProperty(k, v);
    }
  }, [themeId]);

  useEffect(() => {
    const pair = FONT_PAIRS.find((f) => f.id === fontPairId) ?? FONT_PAIRS[0];
    const id = "folio-font-link";
    let link = document.getElementById(id) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    link.href = pair.googleUrl;
    document.documentElement.style.setProperty(
      "--font-heading",
      `'${pair.heading}', sans-serif`,
    );
    document.documentElement.style.setProperty(
      "--font-body",
      `'${pair.body}', sans-serif`,
    );
  }, [fontPairId]);
}
