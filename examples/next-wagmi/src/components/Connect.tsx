"use client";

import { BaseError } from "viem";
import { useAccount, useConfig, useConnect, useDisconnect } from "wagmi";
import { useEffect, useRef } from "react";
import { createModal } from "@rabby-wallet/rabbykit";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  const rabbkKitRef = useRef<ReturnType<typeof createModal>>();
  const config = useConfig();

  useEffect(() => {
    if (!rabbkKitRef.current) {
      rabbkKitRef.current = createModal({
        wagmi: config,
        appName: "test",
        projectId: "58a22d2bc1c793fc31c117ad9ceba8d9",
      });
    }
  }, [config]);

  return (
    <div>
      <div>
        <div>
          <button
            onClick={() => {
              rabbkKitRef.current?.setTheme("light");
            }}
          >
            light mode
          </button>
          <button
            onClick={() => {
              rabbkKitRef.current?.setTheme("dark");
            }}
          >
            dark mode
          </button>
        </div>

        {/* {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect from {connector?.name}
          </button>
        )} */}
        {!isConnected && (
          <button onClick={() => rabbkKitRef.current?.openModal()}>
            open RabbyKit
          </button>
        )}
        <button onClick={() => rabbkKitRef.current?.openModal(true)}>
          force open RabbyKit
        </button>
        {/* {connectors
          .filter((x) => x.ready && x.id !== connector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))} */}
      </div>

      {error && <div>{(error as BaseError).shortMessage}</div>}
    </div>
  );
}
