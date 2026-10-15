"use client";

import { useContext, useEffect, useRef } from "react";
import { RabbykitContext } from "./rabbykit";
import { useAccount, useDisconnect } from "wagmi";
import clsx from "clsx";
export const ConnectButton = ({ openOnReady, onError }: { openOnReady?: boolean; onError?: () => void }) => {
  const kit = useContext(RabbykitContext);
  const { isConnected, isConnecting, isReconnecting, address } = useAccount();
  const consumed = useRef(false);
  useEffect(() => {
    if (!openOnReady || consumed.current || isConnecting || isReconnecting) return;
    consumed.current = true;
    if (!isConnected) {
      try { kit.open(); } catch { onError?.(); }
    }
  }, [openOnReady, isConnected, isConnecting, isReconnecting, kit, onError]);
  const { disconnect } = useDisconnect();

  return (
    <button
      className={clsx(
        "py-[10px]",
        isConnected ? "px-[12px] bg-blue-disable" : "px-[15px] bg-blue-default",
        "hover:shadow-button-hover",
        "h-10 relative  rounded-md flex gap-[6px] items-center justify-center text-center text-white text-base"
      )}
      disabled={isConnecting || isReconnecting}
      aria-busy={isConnecting || isReconnecting || undefined}
      onClick={() => {
        if (!isConnected) {
          try { kit.open(); } catch { onError?.(); }
        } else {
          disconnect();
        }
      }}
    >
      <span>
        {isConnecting || isReconnecting ? "Loading wallet…" : isConnected
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : "Connect Wallet"}
      </span>
      {isConnected && (
        <img src={"/exit.svg"} width="20" height="20" alt={"disconnect"} />
      )}
    </button>
  );
};
