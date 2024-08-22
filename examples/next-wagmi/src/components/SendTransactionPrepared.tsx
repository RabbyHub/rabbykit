"use client";

import { useState } from "react";
import { parseEther, stringify } from "viem";
import {
  // useSimulateContract,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

import { useDebounce } from "../hooks/useDebounce";

export function SendTransactionPrepared() {
  const [to, setTo] = useState("");
  const debouncedTo = useDebounce(to);

  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value);

  // const { data: config } = useSimulateContract({
  //   to: debouncedTo as any,
  //   value: (debouncedValue
  //     ? parseEther(value as `${number}`)
  //     : undefined) as any,
  //   enabled: Boolean(debouncedTo && debouncedValue),
  // });
  const {
    data,
    error,
    isPending: isLoading,
    isError,
    sendTransaction,
  } = useSendTransaction();
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash: data });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendTransaction?.({
            to: debouncedTo as any,
            value: (debouncedValue
              ? parseEther(value as `${number}`)
              : parseEther("0")) as any,
          });
        }}
      >
        <input
          placeholder="address"
          onChange={(e) => setTo(e.target.value)}
          value={to}
        />
        <input
          id="value"
          placeholder="value (ether)"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button disabled={!sendTransaction} type="submit">
          Send
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
      {isError && <div>Error: {error?.message}</div>}
    </>
  );
}
