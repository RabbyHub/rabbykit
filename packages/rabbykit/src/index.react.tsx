"use client";
import { useConfig } from "wagmi";
import { createModal } from "./index";
import React, { useEffect, useRef, useState } from "react";

const Context: React.Context<ReturnType<typeof createModal> | undefined> =
  React.createContext<ReturnType<typeof createModal> | undefined>(undefined);

export const RabbyKitProvider = ({
  children,
  projectId,
  appName,
}: React.PropsWithChildren<{ projectId: string; appName: string }>) => {
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
      wagmi: wagmiConfig,
      projectId,
      appName,
    });
    setValue(rabbykitRef.current);
  }

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useRkModal = () => {
  const value = React.useContext(Context);

  if (!value) {
    throw new Error("RabbyKitProvider");
  }

  return (b: boolean) => (b ? value?.openModal() : value?.closeModal());
};
