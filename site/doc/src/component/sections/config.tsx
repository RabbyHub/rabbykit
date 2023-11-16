"use client";
import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import bg from "./bg-3.png";
import { ChromePicker } from "react-color";
import { useClickAway } from "react-use";

const defaultCustomColor =
  "conic-gradient(from 180deg at 50% 50%, #F77E7E 0deg, #E2EF48 73.12608897686005deg, #7AB765 127.50206708908081deg, #6DB0B0 168.7528109550476deg, #4877EF 223.12880516052246deg, #EC48EF 296.25511407852173deg, #EF4848 360deg)";

const allConfig = [
  {
    name: "Mode",
    type: "theme",
    data: [
      { name: "Light", value: "light" },
      { name: "Dark", value: "dark" },
    ],
  },
  {
    name: "Modal Background",
    type: "color",
    field: "--rk-modal-bg",
    data: [
      { value: "#F2F4F7" },
      { value: "#2C3435" },
      { value: "#000" },
      {
        value: defaultCustomColor,
      },
    ],
  },
  {
    name: " Modal border radius",
    field: "--rk-modal-border-radius",
    defaultIndex: 2,
    data: [
      { name: "20", value: "20px" },
      { name: "16", value: "16px" },
      { name: "12", value: "12px" },
      { name: "8", value: "8px" },
      { name: "4", value: "4px" },
      { name: "0", value: "0" },
    ],
  },
  {
    name: "Primary Button Text Color",
    type: "color",
    field: "--rk-primary-button-color",
    data: [
      { value: "#192945" },
      { value: "#4B4B4B" },
      { value: "#858585" },
      { value: defaultCustomColor },
    ],
  },
  {
    name: "Primary Button Background",
    type: "color",
    field: "--rk-primary-button-bg",
    data: [
      { value: "#FFF" },
      { value: "#FF8787" },
      { value: "#87B0FF" },
      { value: defaultCustomColor },
    ],
  },
  {
    name: "Primary Button border radius",
    field: "--rk-primary-button-border-radius",
    defaultIndex: 3,
    data: [
      { name: "20", value: "20px" },
      { name: "16", value: "16px" },
      { name: "12", value: "12px" },
      { name: "8", value: "8px" },
      { name: "4", value: "4px" },
      { name: "0", value: "0" },
    ],
  },
];

export const ConfigDemo = () => {
  const [theme, setTheme] = useState("light");
  const [css, setCss] = useState<Record<string, string>>({});
  const cssVar = useMemo(
    () =>
      Object.keys(css)
        .map((e) => `${e}:${css[e]};`)
        .join(""),
    [css]
  );
  return (
    <div
      className="w-full pt-[100px] pb-[110px]"
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center text-title2 text-[40px] font-[510px]">
        Streamlined Design and Easy Configuration
      </div>
      <div className="text-center text-title2 text-opacity-70 text-[36px]">
        Match your Dapp perfectly with minimal efforts
      </div>
      <div className="mx-auto w-full max-w-[960px] flex justify-between mt-[88px]">
        <div className="flex flex-col gap-[32px]">
          {allConfig.map((e) => (
            <Item
              key={e.name}
              {...e}
              onUpdate={(v) => {
                if (e.type === "theme") {
                  setTheme(v);
                } else if (e.field) {
                  setCss((preCss) => ({ ...preCss, [e.field]: v }));
                }
              }}
            />
          ))}

          <div
            style={{
              color: "#FFF",
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "normal",
              textDecorationLine: "underline",
            }}
          >
            Learn more
          </div>
        </div>

        <Preview theme={theme} cssVar={cssVar} />
      </div>
    </div>
  );
};

const Item = ({
  name,
  data,
  type,
  onUpdate,
  defaultIndex = 0,
}: {
  name: string;
  type?: string;
  defaultIndex?: number;
  data: { name?: string; value: string }[];
  onUpdate: (v: string) => void;
}) => {
  const isColor = useMemo(() => type === "color", [type]);
  const [active, setActive] = useState(defaultIndex);
  const colorRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<string>();
  const ref = useRef<HTMLButtonElement>(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  return (
    <div>
      <div className="text-[20px] font-[510] text-title2">{name}</div>
      <div
        className={clsx(
          "flex items-center",
          isColor ? "gap-[8px]" : "gap-[12px]"
        )}
      >
        {data.map((e, idx) => {
          const isLast = idx === data.length - 1;
          return (
            <button
              key={e.value}
              ref={isLast ? ref : undefined}
              className={clsx(
                "relative",
                "bg-transparent p-[4px] border rounded-[8px]",
                active === idx ? "border-white" : "border-transparent"
              )}
              onClick={() => {
                setActive(idx);
                colorRef.current?.click();
                if (isColor && isLast) {
                  setOpen(true);
                } else {
                  onUpdate(e.value);
                }
              }}
            >
              <div
                style={
                  isColor
                    ? {
                        background: isLast ? color || e.value : e.value,
                      }
                    : { background: "rgba(255, 255, 255, 0.10)" }
                }
                className={clsx(
                  "rounded-[6px] relative",
                  isColor ? "w-[32px] h-[32px]" : "px-[24px] py-[10px] ",
                  "text-[15px] font-[510] text-title2"
                )}
              >
                {e.name}
              </div>
              {open && idx === data.length - 1 && (
                <ChromePicker
                  color={color}
                  onChange={(e) => {
                    const rgba = `rgba(${e.rgb.r},${e.rgb.g},${e.rgb.b},${
                      e.rgb?.a || 1
                    })`;
                    setColor(rgba);
                    onUpdate(rgba);
                  }}
                  className="absolute top-[36px] left-1/2 z-50 -translate-x-1/2"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const demoList = ["#FF8686", "#86C5FF", "#A586FF", "#FFC086", "#D3D8E0"];

function WalletItem({
  fill,
  idx,
  isSecond,
}: {
  fill: string;
  idx: number;
  className?: string;
  isSecond?: boolean;
}) {
  return (
    <div className={clsx("item", isSecond && "sub")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="wallet-icon"
        viewBox="0 0 35 34"
        fill="none"
      >
        <circle cx="17.88" cy="16.9264" r="16.9264" fill={fill} />
      </svg>
      <div className={clsx(isSecond ? "ml-[13px]" : "ml-[15px]")}>
        Wallet {idx}
      </div>
      {!isSecond && (
        <svg
          className="ml-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7.7006 3.22656L16.814 12.3399L7.7006 21.4533"
            stroke="var(--r-neutral-foot)"
            strokeWidth="1.92345"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <style jsx>{`
        .item {
          width: 100%;
          height: 64px;
          border-radius: var(--rk-primary-button-border-radius, 8.194px);
          background: var(--rk-primary-button-bg, var(--r-neutral-card-1));
          box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          padding: 10px 20px;
          color: var(--rk-primary-button-color, var(--r-neutral-title-1));
          font-family: SF Pro;
          font-size: 16px
          font-style: normal;
          font-weight: 590;
          line-height: normal;
        }
        .wallet-icon {
          width: 28px;
          height: 28px;
        }

        .item.sub {
          width: 206px;
          height: 56px;
          background: transparent;
          color: var(--r-neutral-body);
          font-family: SF Pro;
          font-size: 15px;
          font-style: normal;
          font-weight: 510;
          line-height: normal;
          border: 0.5px solid var(--r-neutral-line);
        }
      `}</style>
    </div>
  );
}

const Preview = ({ theme, cssVar }: { theme?: string; cssVar?: string }) => {
  return (
    <div className={clsx("modal flex flex-col items-center", theme)}>
      <div className="title mb-[20px]">Select your wallet to login</div>
      <div className="flex flex-col gap-[15px] w-full">
        {demoList.map((fill, idx) => (
          <WalletItem fill={fill} idx={idx} key={idx} />
        ))}
      </div>

      <div className="second">
        The following wallets are not installed or in conflict with others
      </div>
      <div className="flex justify-between w-full max-w-[454px] ">
        <WalletItem fill={"#D9D9D9"} idx={6} isSecond />
        <WalletItem fill={"#D9D9D9"} idx={7} isSecond />
      </div>

      <style jsx>
        {`
          .modal {
            --fallback-modal-border-radius: 12px;
            --r-neutral-body: #3e495e;
            --r-neutral-bg-2: #f2f4f7;
            --r-neutral-title-1: #192945;
            --r-neutral-foot: #6a7587;
            --r-neutral-card-1: #fff;
            --r-neutral-line: #d3d8e0;
            ${cssVar}
          }
          .modal.dark {
            --r-neutral-body: #d3d8e0;
            --r-neutral-bg-2: #3d4251;
            --r-neutral-title-1: #f7fafc;
            --r-neutral-foot: #babec5;
            --r-neutral-card-1: rgba(255, 255, 255, 0.06);
            --r-neutral-line: rgba(255, 255, 255, 0.1);
          }
          .modal {
            padding: 20px;
            width: 460px;
            height: 540px;
            overflow: hidden;
            border-radius: var(
              --rk-modal-border-radius,
              var(--fallback-modal-border-radius)
            );
            border: 2.048px solid rgba(255, 255, 255, 0.1);
            background: var(--rk-modal-bg, var(--r-neutral-bg-2));
            position: relative;
          }

          .modal:before {
            position: absolute;
            content: "";
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
          }
          .title {
            color: var(--r-neutral-title-1);
            text-align: center;
            font-size: 18px;
            font-style: normal;
            font-weight: 510;
            line-height: normal;
          }

          .second {
            width: 100%;
            margin-top: 20px;
            margin-bottom: 10px;
            color: var(--r-neutral-foot);
            font-family: SF Pro;
            font-size: 13.209px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
          }
        `}
      </style>
    </div>
  );
};
