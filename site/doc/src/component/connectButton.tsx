"use client";

import { useContext } from "react";
import { RabbykitContext } from "./rabbykit";
import { useAccount, useDisconnect } from "wagmi";
import Image from "next/image";
import clsx from "clsx";
export const ConnectButton = () => {
  const kit = useContext(RabbykitContext);
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <button
      className={clsx(
        "py-[10px]",
        isConnected ? "px-[12px] bg-blue-disable" : "px-[15px] bg-blue-default",
        "hover:shadow-button-hover",
        "h-10 relative  rounded-md flex gap-[6px] items-center justify-center text-center text-white text-base"
      )}
      onClick={() => {
        if (!isConnected) {
          kit.open();
        } else {
          disconnect();
        }
      }}
    >
      <span>
        {isConnected
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : "Connect Wallet"}
      </span>
      {isConnected && (
        <Image src={"/exit.svg"} width="20" height="20" alt={"disconnect"} />
      )}
    </button>
  );
};
