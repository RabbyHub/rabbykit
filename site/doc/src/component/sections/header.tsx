import Image from "next/image";
import * as React from "react";
import { LogoName } from "../logo";
import bg from "./bg.png";
import { ConnectButton } from "../connectButton";
import { ViewDocButton } from "../viewDocButton";

const ClipText = () => {
  return (
    <span
      style={React.useMemo(
        () => ({
          background:
            "linear-gradient(90deg, #BCFF88 5.02%, #69FFC9 28.1%, #7A9FFF 45.18%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "SF Pro",
          fontSize: 60,
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "normal",
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
    <section
      className="bg-foot  flex flex-col  items-center"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full max-w-[960px] h-[64px] flex items-center justify-between py-3">
        <LogoName name="Rabby Kit" />
        <ConnectButton />
      </div>

      <div className="w-full max-w-[1200px] text-[52px] text-center mt-12 mb-10">
        <span className="text-white font-bold ">A </span>
        <ClipText />
        <span className="text-white font-bold ">
          {" "}
          to connect all wallets <br /> for all Dapp developers
        </span>
      </div>

      <ViewDocButton className="mb-10" />

      <Image
        src={"/hero.png"}
        alt={""}
        width={960}
        height={660}
        className="mb-6"
      />
    </section>
  );
}
