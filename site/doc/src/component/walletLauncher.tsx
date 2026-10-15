import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";

let walletModule: Promise<typeof import("./walletDemo")> | undefined;
function loadWallet() {
  return (walletModule ??= import("./walletDemo").catch((error) => {
    walletModule = undefined;
    throw error;
  }));
}

function hasSavedConnection() {
  try {
    const state = JSON.parse(localStorage.getItem("wagmi.store") || "null")?.state;
    return typeof state?.current === "string" &&
      state.connections?.__type === "Map" &&
      Array.isArray(state.connections.value) &&
      state.connections.value.some(([uid, connection]: [string, { accounts?: string[] }]) =>
        uid === state.current && Array.isArray(connection?.accounts) && connection.accounts.length > 0);
  } catch {
    // Unavailable or invalid storage cannot establish an authorized session.
    return false;
  }
}

export function WalletLauncher() {
  const [Demo, setDemo] = useState<ComponentType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const activation = useRef<Promise<void>>();
  const pendingOpen = useRef(false);
  const mounted = useRef(true);

  function reportError(reason: unknown) {
    console.error("Unable to load the wallet demo", reason);
    if (mounted.current) setError("Wallet could not load. Please retry.");
  }

  function activate(open = false) {
    pendingOpen.current ||= open;
    if (activation.current) return;
    setLoading(true);
    setError(undefined);
    activation.current = loadWallet()
      .then(async (module) => {
        const kit = await module.prepareWallet();
        if (!mounted.current) return;
        if (pendingOpen.current) {
          pendingOpen.current = false;
          kit.open();
        }
        setDemo(() => module.default);
      })
      .catch(reportError)
      .finally(() => {
        activation.current = undefined;
        if (mounted.current) setLoading(false);
      });
  }

  useEffect(() => {
    mounted.current = true;
    if (hasSavedConnection()) activate();
    return () => { mounted.current = false; pendingOpen.current = false; };
  }, []);

  if (Demo) return <Demo />;
  return (
    <div className="relative">
      <button
        className="py-[10px] px-[15px] bg-blue-default hover:shadow-button-hover h-10 relative rounded-md flex items-center justify-center text-center text-white text-base"
        onPointerEnter={() => { void loadWallet().catch(reportError); }}
        onFocus={() => { void loadWallet().catch(reportError); }}
        onClick={() => activate(true)}
        aria-busy={loading}
        disabled={loading}
      >
        {loading ? "Loading wallet…" : error ? "Retry wallet" : "Connect Wallet"}
      </button>
      {error && <p role="alert" className="absolute right-0 top-full mt-2 w-[240px] text-right text-sm text-white">{error}</p>}
    </div>
  );
}
