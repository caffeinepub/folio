import { Loader2, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useActor } from "../../hooks/useActor";

interface Props {
  onSuccess: (pin: string) => void;
  onCancel: () => void;
}

// Fallback: verify locally when backend is unreachable
const LOCAL_PIN = "3275";

const DIGIT_KEYS = ["d0", "d1", "d2", "d3"];

export function PinModal({ onSuccess, onCancel }: Props) {
  const { actor } = useActor();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleSubmit = async () => {
    if (pin.length !== 4) {
      setError("Enter a 4-digit PIN");
      return;
    }
    setLoading(true);
    setError("");

    // Try backend first; fall back to local check if unavailable
    let ok = false;
    if (actor) {
      try {
        ok = await actor.checkPin(pin);
      } catch {
        // Backend unreachable -- verify locally
        ok = pin === LOCAL_PIN;
      }
    } else {
      // Actor not ready -- verify locally
      ok = pin === LOCAL_PIN;
    }

    setLoading(false);
    if (ok) {
      onSuccess(pin);
    } else {
      setError("Incorrect PIN");
      setPin("");
      inputRef.current?.focus();
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const digits = pin.padEnd(4, " ").split("");

  const appendDigit = (n: string | number) => {
    if (pin.length < 4) {
      setPin(`${pin}${n}`);
      setError("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      data-ocid="pin.modal"
    >
      <div
        className="relative w-full max-w-sm mx-4 rounded-2xl shadow-2xl overflow-hidden"
        style={{
          background: "var(--p-card)",
          border: "1px solid var(--p-border)",
        }}
      >
        <div className="px-8 pt-8 pb-4 text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--p-accent)" }}
          >
            <Lock className="w-7 h-7 text-white" />
          </div>
          <h2
            className="text-xl font-bold mb-1"
            style={{
              color: "var(--p-text)",
              fontFamily: "var(--font-heading)",
            }}
          >
            Owner Access
          </h2>
          <p className="text-sm" style={{ color: "var(--p-text2)" }}>
            Enter your 4-digit PIN to edit this portfolio
          </p>
        </div>

        <div className="px-8 py-4">
          <div className="flex justify-center gap-3 mb-4">
            {digits.map((d, i) => (
              <div
                key={DIGIT_KEYS[i]}
                className="w-12 h-14 rounded-xl flex items-center justify-center text-2xl font-bold border-2 transition-all"
                style={{
                  background: "var(--p-bg2)",
                  borderColor:
                    pin.length === i
                      ? "var(--p-accent)"
                      : d.trim()
                        ? "var(--p-accent)"
                        : "var(--p-border)",
                  color: "var(--p-text)",
                }}
              >
                {d.trim() ? "●" : ""}
              </div>
            ))}
          </div>

          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={4}
            value={pin}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 4);
              setPin(val);
              setError("");
            }}
            onKeyDown={handleKey}
            className="sr-only"
            aria-label="PIN input"
            data-ocid="pin.input"
          />

          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="w-full text-center text-xs py-1 rounded-lg mb-2"
            style={{ color: "var(--p-text2)" }}
          >
            Tap digits above to enter PIN
          </button>

          <div className="grid grid-cols-3 gap-2 mb-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => appendDigit(n)}
                className="h-12 rounded-xl text-lg font-semibold transition-all active:scale-95"
                style={{ background: "var(--p-bg2)", color: "var(--p-text)" }}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setPin("");
                setError("");
              }}
              className="h-12 rounded-xl text-sm font-medium transition-all active:scale-95"
              style={{ background: "var(--p-bg2)", color: "var(--p-text2)" }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => appendDigit(0)}
              className="h-12 rounded-xl text-lg font-semibold transition-all active:scale-95"
              style={{ background: "var(--p-bg2)", color: "var(--p-text)" }}
            >
              0
            </button>
            <button
              type="button"
              onClick={() => {
                setPin((p) => p.slice(0, -1));
                setError("");
              }}
              className="h-12 rounded-xl text-sm font-medium transition-all active:scale-95"
              style={{ background: "var(--p-bg2)", color: "var(--p-text2)" }}
            >
              ⌫
            </button>
          </div>

          {error && (
            <p
              className="text-sm text-center py-1"
              style={{ color: "#ef4444" }}
              data-ocid="pin.error_state"
            >
              {error}
            </p>
          )}
        </div>

        <div className="px-8 pb-8 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 h-11 rounded-xl text-sm font-medium transition-all"
            style={{ background: "var(--p-bg2)", color: "var(--p-text2)" }}
            data-ocid="pin.cancel_button"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || pin.length !== 4}
            className="flex-1 h-11 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            style={{ background: "var(--p-accent)", color: "#fff" }}
            data-ocid="pin.submit_button"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? "Checking..." : "Unlock"}
          </button>
        </div>
      </div>
    </div>
  );
}
