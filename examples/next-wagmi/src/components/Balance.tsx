"use client";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import type { Address } from "viem";

export function Balance() {
  return (
    <>
      <div>
        <AccountBalance />
      </div>
      <br />
      <div>
        <FindBalance />
      </div>
    </>
  );
}

export function AccountBalance() {
  const { address } = useAccount();
  const { data, refetch } = useBalance({
    address,
  });

  return (
    <div>
      {data?.formatted}
      <button onClick={() => refetch()}>refetch</button>
    </div>
  );
}

export function FindBalance() {
  const [address, setAddress] = useState("");
  const { data, isLoading, refetch } = useBalance({
    address: address as Address,
  });

  const [value, setValue] = useState("");

  return (
    <div>
      Find balance:{" "}
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="wallet address"
        value={value}
      />
      <button
        onClick={() => (value === address ? refetch() : setAddress(value))}
      >
        {isLoading ? "fetching..." : "fetch"}
      </button>
      <div>{data?.formatted}</div>
    </div>
  );
}
