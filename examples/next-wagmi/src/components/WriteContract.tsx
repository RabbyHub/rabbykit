"use client";

import { BaseError } from "viem";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";

import { wagmiContractConfig } from "./contracts";
import { stringify } from "../utils/stringify";

export function WriteContract() {
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
          const formData = new FormData(e.target as HTMLFormElement);
          const tokenId = formData.get("tokenId") as string;
          write({
            ...wagmiContractConfig,
            functionName: "mint",
            args: [BigInt(tokenId)],
          });
        }}
      >
        <input name="tokenId" placeholder="token id" />
        <button disabled={isLoading} type="submit">
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
