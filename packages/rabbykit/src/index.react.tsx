"use client";
import { Chain, useConfig } from "wagmi";
import { createModal } from "./index";
import React, { useEffect, useRef, useState } from "react";
import { useRKStore } from "./store";

const Context: React.Context<ReturnType<typeof createModal> | undefined> =
  React.createContext<ReturnType<typeof createModal> | undefined>(undefined);

export const RabbyKitProvider = ({
  children,
  projectId,
  appName,
  chains,
}: React.PropsWithChildren<{
  projectId: string;
  appName: string;
  chains: Chain[];
}>) => {
  const wagmiConfig = useConfig();

  if (React.useContext(Context)) {
    throw new Error(
      "Multiple, nested usages of RabbyKitProvider detected. Please use only one."
    );
  }

  if (!wagmiConfig) {
    throw new Error("RabbyKitProvider must be mounted inside WagmiConfig");
  }
  const [value, setValue] = useState<
    ReturnType<typeof createModal> | undefined
  >(undefined);

  const rabbykitRef = useRef<ReturnType<typeof createModal>>();
  if (!rabbykitRef.current && wagmiConfig) {
    rabbykitRef.current = createModal({
      chains,
      wagmi: wagmiConfig,
      projectId,
      appName,
    });
    setValue(rabbykitRef.current);
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useRabbykitModal = () => {
  const value = React.useContext(Context);

  if (!value) {
    throw new Error(
      "useRabbykitModalStatus must be used inside RabbyKitProvider"
    );
  }

  return value;
};

export const useRabbykitModalStatus = () => {
  const value = React.useContext(Context);
  if (!value) {
    throw new Error(
      "useRabbykitModalStatus must be used inside RabbyKitProvider"
    );
  }
  const [open, setOpen] = useState(useRKStore.getState().open);
  useEffect(
    () =>
      value.subscribeModalState((e) => {
        setOpen(e);
      }),
    [value.subscribeModalState]
  );
  return open;
};
