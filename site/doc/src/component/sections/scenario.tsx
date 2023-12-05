"use client";
import Carousel from "nuka-carousel";
import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";
import bg from "./bg-2.png";
import MobileBg from "./mobile-bg.png";

import { ViewDocButton } from "../viewDocButton";

const list = ["PC Browser", " Mobile Wallet", "Mobile Browser"];
export const ConnectScenario = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<(targetIndex: number) => void>();
  return (
    <section className="w-full pt-[100px] ">
      <div
        className={clsx(
          "max-w-[986px] w-full mx-auto flex flex-col items-center",
          "px-[20px]",
          "lg:px-0"
        )}
      >
        <div
          className={clsx(
            "text-center text-title1  font-[510] mb-3",
            "text-[20px]",
            "lg:text-[36px]"
          )}
        >
          Tailored for every Dapp scenario
        </div>
        <div
          className={clsx(
            "text-center text-body ",
            "text-[15px] mb-[20px]",
            "lg:text-[32px] lg:mb-[44px]"
          )}
        >
          Provide users with a better experience connecting wallets
        </div>

        <div
          className={clsx(
            "bg-gray-300 rounded-md justify-start items-start inline-flex cursor-pointer",
            "p-[2px] mb-[32px] w-full ",
            "lg:p-1  lg:gap-2.5  lg:mb-[40px] lg:w-auto "
          )}
        >
          {list.map((e, index) => (
            <div
              key={e}
              className={clsx(
                "rounded justify-center items-center flex text-center font-[510]",
                "p-0  flex-1 h-[32px] text-[13px]",
                "lg:w-auto lg:h-auto lg:flex-auto lg:pl-[29px] lg:pr-[30px] lg:pt-2.5 lg:pb-[9px] lg:text-[18px]",
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
          className="rounded-[8px] overflow-hidden bg-card-2"
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
            priority
          />
          <Image
            src={"/scenario/mobile.png"}
            alt={""}
            width={986}
            height={680}
            priority
          />
          <Image
            src={"/scenario/mobile-browser.png"}
            alt={""}
            width={986}
            height={680}
            priority
          />
        </Carousel>

        <div
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className={clsx(
            "w-full  flex-col items-center justify-center  bg-black hidden rounded-[8px]",
            "gap-[40px] rounded-[12px] mt-[170px] mb-[178px] h-[260px] lg:flex"
          )}
        >
          <div className="text-[32px] font-[700] text-title2">
            View the Docs and Get Rabby Kit for your Dapp
          </div>

          <ViewDocButton />
        </div>

        <div
          style={{
            backgroundImage: `url(${MobileBg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
          className={clsx(
            "w-full min-h-[140px] flex flex-col items-center justify-center bg-black gap-[18px] rounded-[4px] my-[96px]",
            "lg:hidden"
          )}
        >
          <div className="mx-[10px] text-[16px] text-center font-[700] text-title2 ">
            View the Docs and Get Rabby Kit <br />
            for your Dapp
          </div>
          <ViewDocButton sm />
        </div>
      </div>
    </section>
  );
};
