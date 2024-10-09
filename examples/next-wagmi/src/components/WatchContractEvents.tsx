"use client";

import { useState } from "react";
import type { Log } from "viem";
import { useWatchContractEvent } from "wagmi";

import { usdcContractConfig, wagmiContractConfig } from "./contracts";
import { stringify } from "../utils/stringify";

export function WatchContractEvents() {
  const [usdcLogs, setUsdcLogs] = useState<Log[]>([]);
  useWatchContractEvent({
    ...usdcContractConfig,
    eventName: "Transfer",
    onLogs: (logs) => setUsdcLogs((x) => [...x, ...logs]),
  });

  const [wagmiLogs, setWagmiLogs] = useState<Log[]>([]);
  useWatchContractEvent({
    ...wagmiContractConfig,
    eventName: "Transfer",
    onLogs: (logs) => setWagmiLogs((x) => [...x, ...logs]),
  });

  return (
    <div>
      <details>
        <summary>{usdcLogs.length} USDC `Transfer`s logged</summary>
        {usdcLogs
          .reverse()
          .map((log) => stringify(log))
          .join("\n\n\n\n")}
      </details>

      <details>
        <summary>{wagmiLogs.length} wagmi `Transfer`s logged</summary>
        {wagmiLogs
          .reverse()
          .map((log) => stringify(log))
          .join("\n\n\n\n")}
      </details>
    </div>
  );
}
