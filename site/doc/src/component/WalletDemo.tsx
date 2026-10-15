import React from "react";
import { Providers } from "./rabbykit";
import { ConnectButton } from "./connectButton";

export type WalletDemoProps = {
  openOnReady?: boolean;
  fallback?: React.ReactNode;
  onError?: () => void;
};

export default function WalletDemo({ openOnReady, fallback, onError }: WalletDemoProps) {
  return <Providers fallback={fallback} onError={onError}><ConnectButton openOnReady={openOnReady} onError={onError} /></Providers>;
}
