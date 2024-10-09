"use client";

import { useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { useSignMessage } from "wagmi";
import { type Address } from "viem";

export function SignMessage() {
  const [recoveredAddress, setRecoveredAddress] = useState<Address>();
  const {
    data: signature,
    variables,
    error,
    isPending: isLoading,
    signMessage,
  } = useSignMessage();

  useEffect(() => {
    (async () => {
      if (variables?.message && signature) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature,
        });
        setRecoveredAddress(recoveredAddress as Address);
      }
    })();
  }, [signature, variables?.message]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const element = event.target as HTMLFormElement;
          const formData = new FormData(element);
          const message = formData.get("message") as string;
          signMessage({ message });
        }}
      >
        <input name="message" type="text" required />
        <button disabled={isLoading} type="submit">
          {isLoading ? "Check Wallet" : "Sign Message"}
        </button>
      </form>

      {signature && (
        <div>
          <div>Signature: {signature}</div>
          <div>Recovered address: {recoveredAddress}</div>
        </div>
      )}
      {error && <div>Error: {error?.message}</div>}
    </>
  );
}
