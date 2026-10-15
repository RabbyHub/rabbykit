"use client";

import { useInfiniteReadContracts } from "wagmi";

import { wagmiContractConfig } from "./contracts";
import { stringify } from "../utils/stringify";

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useInfiniteReadContracts({
      cacheKey: "lootTokenURIs",
      contracts(pageParam: number) {
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
        select: (data) => data.pages.flat(),
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
          {data.map((result, resultIndex) => (
            <pre key={resultIndex}>{stringify(result)}</pre>
          ))}
          <button onClick={() => fetchNextPage()}>Fetch more</button>
        </>
      )}
    </div>
  );
}
