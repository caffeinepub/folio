import { useEffect, useState } from "react";
import { usePortfolio } from "./hooks/usePortfolio";
import { useTheme } from "./hooks/useTheme";
import { EditView } from "./pages/EditView";
import { PublicView } from "./pages/PublicView";

export default function App() {
  const [view, setView] = useState<"public" | "edit">(() =>
    window.location.hash === "#edit" ? "edit" : "public",
  );
  const portfolio = usePortfolio();
  const { data } = portfolio;
  useTheme(data.settings.theme, data.settings.fontPair);

  useEffect(() => {
    window.location.hash = view === "edit" ? "#edit" : "";
  }, [view]);

  if (view === "edit") {
    return <EditView onGoPublic={() => setView("public")} />;
  }
  return <PublicView data={data} onGoEdit={() => setView("edit")} />;
}
