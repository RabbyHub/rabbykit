import Image from "next/image";
import * as React from "react";
import { ConnectButton } from "../connectButton";
import { ViewDocButton } from "../viewDocButton";
import clsx from "clsx";
import { Providers } from "../rabbykit";

const ClipText = () => {
  return (
    <span
      className=""
      style={React.useMemo(
        () => ({
          background:
            "linear-gradient(90deg, #BCFF88 5.02%, #69FFC9 28.1%, #7A9FFF 45.18%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }),
        []
      )}
    >
      Real Web3 Way
    </span>
  );
};

export function Header() {
  return (
    <section className="bg-title1  flex flex-col  items-center">
      <div
        className={clsx(
          "w-full max-w-[960px] flex items-center justify-between",
          "pt-[60px] px-[20px] ",
          "md:h-[64px] md:py-3 md:mt-[20px]"
        )}
      >
        <Image
          src="/kit-logo.svg"
          width="110"
          height="28"
          className="md:w-[132px] md:h-[33px]"
          alt="Rabbykit logo"
        />
        <Providers>
          <ConnectButton />
        </Providers>
      </div>

      <div
        className={clsx(
          "w-full max-w-[350px] text-center mt-12 mb-10",
          "text-[28px] font-bold text-white",
          "md:text-[52px] md:mt-12 md:mb-10 md:max-w-[1000px]"
        )}
      >
        <span>A </span>
        <ClipText />
        <span> to connect all wallets for all Dapp developers</span>
      </div>

      <ViewDocButton className="z-10" />

      <Image
        src={"/hero.png"}
        alt={""}
        width={1068}
        height={960}
        className={clsx("lg:mt-[-56px]")}
        priority
      />
    </section>
  );
}
