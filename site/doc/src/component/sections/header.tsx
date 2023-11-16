import Image from "next/image";
import * as React from "react";
import { LogoName } from "../logo";
import bg from "./bg.png";
import { ConnectButton } from "../connectButton";

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

export function Header(props) {
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
        {/* <button className="w-36 h-10 relative bg-blue-default rounded-md flex items-center justify-center text-center text-white text-base ">
          Connect Wallet
        </button> */}
        <ConnectButton />
      </div>

      <div className="w-full max-w-[1200px] text-center mt-12 mb-10">
        <span className="text-white text-6xl font-bold ">A </span>
        <ClipText />
        <span className="text-white text-6xl font-bold ">
          {" "}
          to connect all wallets for all Dapp developers
        </span>
      </div>
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
