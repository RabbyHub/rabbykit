"use client";
import { useEffect, useState } from "react";
import { useNearViewport } from "../useNearViewport";
import clsx from "clsx";
import bg from "./bg-2.webp";
import bgFallback from "./bg-2.fallback.png";
import MobileBg from "./mobile-bg.webp";
import mobileBgFallback from "./mobile-bg.fallback.png";
import imageFallback from "../imageFallback.module.css";

import { ViewDocButton } from "../viewDocButton";

const list = ["PC Browser", " Mobile Wallet", "Mobile Browser"];
export const ConnectScenario = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scenario = useNearViewport<HTMLElement>();
  const desktopBackground = useNearViewport<HTMLDivElement>();
  const mobileBackground = useNearViewport<HTMLDivElement>();
  const [Carousel, setCarousel] = useState<typeof import("nuka-carousel")["default"]>();
  useEffect(() => {
    if (!scenario.visible) return;
    let active = true;
    import("nuka-carousel").then(({ default: component }) => {
      if (active) setCarousel(() => component);
    }).catch(() => {
      // The static slides and tabs remain usable if the carousel chunk fails.
    });
    return () => { active = false; };
  }, [scenario.visible]);
  const slides = ["browser", "mobile", "mobile-browser"].map((name, index) => (
    <picture key={name} hidden={!Carousel && index !== currentSlide} className={!Carousel && index !== currentSlide ? "hidden" : "block"}>
      <source srcSet={`/scenario/${name}.webp`} type="image/webp" />
      <img src={`/scenario/${name}.fallback.png`} alt={list[index].trim()} width={986} height={680} loading="lazy" decoding="async" />
    </picture>
  ));
  return (
    <section ref={scenario.ref} className="w-full pt-[100px] ">
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
            <button
              key={e}
              type="button"
              aria-pressed={index === currentSlide}
              className={clsx(
                "rounded justify-center items-center flex text-center font-[510]",
                "p-0  flex-1 h-[32px] text-[13px]",
                "lg:w-auto lg:h-auto lg:flex-auto lg:pl-[29px] lg:pr-[30px] lg:pt-2.5 lg:pb-[9px] lg:text-[18px]",
                index === currentSlide && "bg-white",
                index !== currentSlide ? "text-body" : "text-blue-default"
              )}
              onClick={() => {
                setCurrentSlide(index);
              }}
            >
              {e}
            </button>
          ))}
        </div>

        {Carousel ? (
          <Carousel
            {...Carousel.defaultProps}
            className="rounded-[8px] overflow-hidden bg-card-2"
            slideIndex={currentSlide}
            beforeSlide={(_, index) => setCurrentSlide(index)}
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
            renderBottomCenterControls={() => null}
          >{slides}</Carousel>
        ) : <div className="rounded-[8px] overflow-hidden bg-card-2">{slides}</div>}

        <div
          ref={desktopBackground.ref}
          style={{
            "--rk-background-webp": desktopBackground.visible ? `url(${bg})` : undefined,
            "--rk-background-fallback": desktopBackground.visible ? `url(${bgFallback})` : undefined,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          } as React.CSSProperties}
          className={clsx(
            imageFallback.background,
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
          ref={mobileBackground.ref}
          style={{
            "--rk-background-webp": mobileBackground.visible ? `url(${MobileBg})` : undefined,
            "--rk-background-fallback": mobileBackground.visible ? `url(${mobileBgFallback})` : undefined,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          } as React.CSSProperties}
          className={clsx(
            imageFallback.background,
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
