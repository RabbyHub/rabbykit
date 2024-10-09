"use client";

import { useState } from "react";
import { BaseError } from "viem";
import {
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { wagmiContractConfig } from "./contracts";
import { useDebounce } from "../hooks/useDebounce";
import { stringify } from "../utils/stringify";

export function WriteContractPrepared() {
  const [tokenId, setTokenId] = useState("");
  const debouncedTokenId = useDebounce(tokenId);

  const {
    writeContract: write,
    data,
    error,
    isPending: isLoading,
    isError,
  } = useWriteContract();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <>
      <h3>Mint a wagmi</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.({
            ...wagmiContractConfig,
            functionName: "mint",
            // enabled: Boolean(debouncedTokenId),
            args: [BigInt(debouncedTokenId)],
          });
        }}
      >
        <input
          placeholder="token id"
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button disabled={!write} type="submit">
          Mint
        </button>
      </form>

      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  );
}
