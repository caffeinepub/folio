import { useState } from "react";
import { PinModal } from "./components/editor/PinModal";
import { usePortfolio } from "./hooks/usePortfolio";
import { useTheme } from "./hooks/useTheme";
import { EditView } from "./pages/EditView";
import { PublicView } from "./pages/PublicView";

function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: "var(--p-bg, #0f0f0f)" }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div
          className="w-12 h-12 rounded-full border-4 animate-spin"
          style={{
            borderColor: "rgba(255,255,255,0.12)",
            borderTopColor: "var(--p-accent, #7c3aed)",
          }}
        />
        {/* Skeleton preview */}
        <div className="flex flex-col items-center gap-3 w-64">
          <div
            className="w-16 h-16 rounded-full animate-pulse"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="h-4 w-40 rounded animate-pulse"
            style={{ background: "rgba(255,255,255,0.07)" }}
          />
          <div
            className="h-3 w-32 rounded animate-pulse"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <div
            className="h-3 w-48 rounded animate-pulse"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"public" | "edit">("public");
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [verifiedPin, setVerifiedPin] = useState("");

  const portfolio = usePortfolio();
  const { data, loaded } = portfolio;

  // Apply theme immediately from local cache if available, fallback to default
  const themeId = data?.settings?.theme ?? "aether-light";
  const fontPairId = data?.settings?.fontPair ?? "inter-poppins";
  useTheme(themeId, fontPairId);

  // Show loading screen until backend data is confirmed
  if (!loaded || !data) {
    return <LoadingScreen />;
  }

  const handleGoEdit = () => {
    if (isPinVerified) {
      setView("edit");
    } else {
      setPinModalOpen(true);
    }
  };

  const handlePinSuccess = (pin: string) => {
    setVerifiedPin(pin);
    setIsPinVerified(true);
    setPinModalOpen(false);
    setView("edit");
  };

  const handleGoPublic = () => {
    setView("public");
    setIsPinVerified(false);
    setVerifiedPin("");
  };

  return (
    <>
      {view === "edit" ? (
        <EditView
          onGoPublic={handleGoPublic}
          pin={verifiedPin}
          portfolio={portfolio}
        />
      ) : (
        <PublicView data={data} onGoEdit={handleGoEdit} />
      )}
      {pinModalOpen && (
        <PinModal
          onSuccess={handlePinSuccess}
          onCancel={() => setPinModalOpen(false)}
        />
      )}
    </>
  );
}
