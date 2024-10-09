"use client";

import { useInfiniteReadContracts } from "wagmi";

import { wagmiContractConfig } from "./contracts";
import { stringify } from "../utils/stringify";

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useInfiniteReadContracts({
      cacheKey: "lootTokenURIs",
      contracts(pageParam) {
        return [...new Array(10)].map(
          (_, i) =>
            ({
              ...wagmiContractConfig,

              functionName: "ownerOf",
              args: [BigInt(pageParam + i)],
            } as const)
        );
      },
      query: {
        initialPageParam: 0,
        getNextPageParam(_lastPage, _allPages, lastPageParam) {
          return lastPageParam + 1;
        },
      },
    });

  console.log("isSuccess data", data);

  return (
    <div>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          {/* @ts-expect-error */}
          {data.pages.map((data, i) => (
            <div key={i}>
              {/* @ts-expect-error */}
              {data.flatMap((x) => (
                <pre key={stringify(data)}>{stringify(data)}</pre>
              ))}
            </div>
          ))}
          <button onClick={() => fetchNextPage()}>Fetch more</button>
        </>
      )}
    </div>
  );
}
