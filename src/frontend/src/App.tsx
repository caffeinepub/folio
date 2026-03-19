import { useState } from "react";
import { PinModal } from "./components/editor/PinModal";
import { usePortfolio } from "./hooks/usePortfolio";
import { useTheme } from "./hooks/useTheme";
import { EditView } from "./pages/EditView";
import { PublicView } from "./pages/PublicView";

export default function App() {
  const [view, setView] = useState<"public" | "edit">("public");
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [verifiedPin, setVerifiedPin] = useState("");

  const portfolio = usePortfolio();
  const { data } = portfolio;
  // Safe access: fall back to defaults if settings not loaded yet
  const themeId = data?.settings?.theme ?? "aether-light";
  const fontPairId = data?.settings?.fontPair ?? "inter-poppins";
  useTheme(themeId, fontPairId);

  // If data is not valid yet, show nothing (brief moment before sample data loads)
  if (!data?.settings || !data?.profile || !data?.sections) {
    return null;
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
