"use client";

import { useAccount, useSwitchChain } from "wagmi";

export function NetworkSwitcher() {
  const { chain } = useAccount();
  const { chains, error, isPending, variables, switchChain } = useSwitchChain();

  return (
    <div>
      <div>
        Connected to {chain?.name ?? chain?.id}
        {/* {chain?.unsupported && " (unsupported)"} */}
      </div>
      <br />
      {switchChain && (
        <div>
          Switch to:{" "}
          {chains.map((x) =>
            x.id === chain?.id ? null : (
              <button key={x.id} onClick={() => switchChain({ chainId: x.id })}>
                {x.name}
                {isPending && x.id === variables.chainId && " (switching)"}
              </button>
            )
          )}
        </div>
      )}

      <div>{error?.message}</div>
    </div>
  );
}
