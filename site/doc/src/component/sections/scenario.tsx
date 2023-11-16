"use client";
import Carousel from "nuka-carousel";
import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";
import bg from "./bg-2.png";
import Link from "next/link";

const list = ["PC Browser", " Mobile Wallet", "Mobile Browser"];
export const ConnectScenario = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<(targetIndex: number) => void>();
  return (
    <section className="w-full pt-[100px]">
      <div className="max-w-[986px] w-full mx-auto flex flex-col items-center">
        <div className="text-center text-title1 text-[40px] font-[510] mb-[12px]">
          Tailored for every Dapp scenario
        </div>
        <div className="text-center text-body text-[30px] mb-[44px]">
          Provide users with a better experience connecting wallets.
        </div>

        <div className="p-1 bg-gray-300 rounded-md justify-start items-start gap-2.5 inline-flex cursor-pointer mb-[40px]">
          {list.map((e, index) => (
            <div
              key={e}
              className={clsx(
                "pl-[29px] pr-[30px] pt-2.5 pb-[9px]  rounded justify-center items-center flex",
                "text-center  text-[18px] font-[510]",
                index === currentSlide && "bg-white",
                index !== currentSlide ? "text-body" : "text-blue-default"
              )}
              onClick={() => {
                sliderRef.current?.(index);
              }}
            >
              {e}
            </div>
          ))}
        </div>

        <Carousel
          className="rounded-[8px] overflow-hidden"
          renderCenterLeftControls={() => null}
          renderCenterRightControls={() => null}
          renderBottomCenterControls={({ currentSlide, goToSlide }) => {
            setCurrentSlide(currentSlide);
            sliderRef.current = goToSlide;
            return null;
          }}
        >
          <Image
            src={"/scenario/browser.png"}
            alt={""}
            width={986}
            height={680}
          />
          <Image
            src={"/scenario/mobile.png"}
            alt={""}
            width={986}
            height={680}
          />
          <Image
            src={"/scenario/mobile-browser.png"}
            alt={""}
            width={986}
            height={680}
          />
        </Carousel>

        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className={clsx(
            "w-full h-[260px] flex flex-col items-center justify-center  bg-black ",
            "gap-[40px] rounded-[12px] mt-[170px] mb-[178px]"
          )}
        >
          <div className="text-[32px] font-[700] text-title2">
            View the Docs and Get Rabby Kit for your Dapp
          </div>

          <Link
            href="/docs/en/getting-started/overview"
            className="w-[224px] h-[52px]  bg-blue-default rounded-md justify-center items-center inline-flex text-center text-title2 text-[20px] font-[510]"
          >
            View the Docs
          </Link>
        </div>
      </div>
    </section>
  );
};
