"use client";
import * as React from "react";

import clsx from "clsx";
import { Providers, RabbykitContext } from "./rabbykit";
const KitProviderWrapper = (Com: () => React.JSX.Element) => () =>
  (
    <Providers>
      <Com />
    </Providers>
  );

export const TestDarkMode = KitProviderWrapper(() => {
  const kit = React.useContext(RabbykitContext);
  return (
    <>
      <button
        className={clsx(
          "py-[10px]",
          "px-[15px]",
          "h-10 relative bg-blue-default rounded-md flex gap-[6px] items-center justify-center text-center text-white text-base "
        )}
        onClick={() => {
          kit.setTheme("light");
          kit.open({ forceOpen: true });
        }}
      >
        Light Mode
      </button>
      <button
        className={clsx(
          "py-[10px]",
          "px-[15px]",
          "h-10 relative bg-blue-default rounded-md flex gap-[6px] items-center justify-center text-center text-white text-base "
        )}
        onClick={() => {
          kit.setTheme("dark");
          kit.open({ forceOpen: true });
        }}
      >
        Dark Mode
      </button>
    </>
  );
});
