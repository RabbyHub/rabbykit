import React from "react";
import type { WalletDemoProps } from "./WalletDemo";

export const WalletPlaceholder = ({ children = "Connect Wallet", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className="h-10 rounded-md bg-blue-default px-[15px] text-white text-base hover:shadow-button-hover" {...props}>{children}</button>
);

export default function WalletEntry() {
  const [Demo, setDemo] = React.useState<React.ComponentType<WalletDemoProps>>();
  const [started, setStarted] = React.useState(false);
  const [openOnReady, setOpenOnReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const pending = React.useRef<Promise<void>>();
  const preload = React.useCallback(() => {
    if (!pending.current) {
      setFailed(false);
      pending.current = import("./WalletDemo")
        .then(({ default: component }) => { setDemo(() => component); })
        .catch(() => {
          pending.current = undefined;
          setStarted(false);
          setFailed(true);
        });
    }
  }, []);

  React.useEffect(() => {
    try {
      const state = JSON.parse(localStorage.getItem("wagmi.store") || "null")?.state;
      if (state?.current && state.connections?.__type === "Map" && Array.isArray(state.connections.value) && state.connections.value.some(([id, connection]) => id === state.current && Array.isArray(connection.accounts) && connection.accounts.length)) {
        setStarted(true);
        preload();
      }
    } catch {
      // Missing or malformed storage must not prevent a new connection.
    }
  }, [preload]);

  const button = <WalletPlaceholder
    onPointerEnter={preload}
    onFocus={preload}
    disabled={started}
    aria-busy={started || undefined}
    onClick={() => { setOpenOnReady(true); setStarted(true); preload(); }}
  >{failed ? "Retry Wallet" : started ? "Loading wallet…" : "Connect Wallet"}</WalletPlaceholder>;

  return started && Demo ? <Demo
    openOnReady={openOnReady}
    fallback={button}
    onError={() => { setStarted(false); setFailed(true); }}
  /> : button;
}
