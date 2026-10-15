"use client";
import type CarouselType from "nuka-carousel";
import { type CSSProperties, useEffect, useState } from "react";
import clsx from "clsx";
import bg from "./bg-2.webp";
import MobileBg from "./mobile-bg.webp";
import bgFallback from "./bg-2.fallback.png";
import mobileBgFallback from "./mobile-bg.fallback.png";
import imageStyles from "../imageFallback.module.css";

import { ViewDocButton } from "../viewDocButton";
import { useNearViewport } from "../useNearViewport";

const list = ["PC Browser", " Mobile Wallet", "Mobile Browser"];
export const ConnectScenario = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sectionRef, nearViewport] = useNearViewport<HTMLElement>();
  const [desktopRef, nearDesktop] = useNearViewport<HTMLDivElement>();
  const [mobileRef, nearMobile] = useNearViewport<HTMLDivElement>();
  const [Carousel, setCarousel] = useState<typeof CarouselType>();
  const [carouselError, setCarouselError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!nearViewport) return;
    let mounted = true;
    setCarouselError(false);
    import("nuka-carousel").then((module) => {
      if (mounted) setCarousel(() => module.default);
    }).catch((reason) => {
      console.error("Unable to load the scenario carousel", reason);
      if (mounted) setCarouselError(true);
    });
    return () => { mounted = false; };
  }, [nearViewport, attempt]);
  const slides = ["browser", "mobile", "mobile-browser"].map((scenario, index) => (
    <picture key={scenario} className="block">
      <source srcSet={`/scenario/${scenario}.webp`} type="image/webp" />
      <img
        src={`/scenario/${scenario}.fallback.png`}
        alt={list[index].trim()}
        width={986}
        height={680}
        loading="lazy"
        decoding="async"
      />
    </picture>
  ));
  return (
    <section ref={sectionRef} className="w-full pt-[100px] ">
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
            afterSlide={setCurrentSlide}
            renderCenterLeftControls={() => null}
            renderCenterRightControls={() => null}
            renderBottomCenterControls={() => null}
          >
            {slides}
          </Carousel>
        ) : (
          <div className="rounded-[8px] overflow-hidden bg-card-2">
            {slides.map((slide, index) => (
              <div key={index} hidden={index !== currentSlide}>{slide}</div>
            ))}
          </div>
        )}
        {carouselError && (
          <div role="alert" className="mt-2 text-sm text-body">
            Scenario swipe could not load. <button onClick={() => setAttempt((n) => n + 1)}>Retry</button>
          </div>
        )}

        <div
          ref={desktopRef}
          style={{
            "--rk-background-webp": nearDesktop ? `url(${bg})` : undefined,
            "--rk-background-fallback": nearDesktop ? `url(${bgFallback})` : undefined,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          } as CSSProperties}
          className={clsx(
            imageStyles.background,
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
          ref={mobileRef}
          style={{
            "--rk-background-webp": nearMobile ? `url(${MobileBg})` : undefined,
            "--rk-background-fallback": nearMobile ? `url(${mobileBgFallback})` : undefined,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          } as CSSProperties}
          className={clsx(
            imageStyles.background,
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
