import clsx from "clsx";
import Image from "next/image";

const protocols = [
  {
    name: "EIP-6963",
    src: "/eip-6963.svg",
    href: "https://eips.ethereum.org/EIPS/eip-6963",
  },
  {
    name: "Wallet Connect",
    src: "/wallet-connect.svg",
    href: "https://walletconnect.com/",
  },

  {
    name: "Coinbase",
    src: "/coinbase.svg",
    href: "https://docs.cloud.coinbase.com/wallet-sdk/docs/injected-provider-guidance",
  },
];

const extensionWallets = [
  {
    name: "Bitget",
    src: "/wallets/bitget.svg",
    link: "https://web3.bitget.com/en",
  },
  {
    name: "Brave Wallet",
    src: "/wallets/brave.svg",
    link: "https://brave.com/zh/wallet/",
  },
  {
    name: "Coinbase Wallet",
    src: "/coinbase.svg",
    link: "https://www.coinbase.com/wallet",
  },
  {
    name: "Coin98 Wallet",
    src: "/wallets/coin98.svg",
    link: "https://coin98.com/wallet",
  },
  {
    name: "Core",
    src: "/wallets/core.svg",
    link: "https://join.core.app/",
  },
  {
    name: "Enkrypt Wallet",
    src: "/wallets/enkrypt.svg",
    link: "https://www.enkrypt.com/",
  },
  {
    name: "Frame",
    src: "/wallets/frame.svg",
    link: "https://frame.sh/",
  },
  {
    name: "OneKey",
    src: "/wallets/onekey.svg",
    link: "https://onekey.so/",
  },
  {
    name: "Phantom",
    src: "/wallets/phantom.svg",
    link: "https://phantom.app/",
  },
  {
    name: "Taho",
    src: "/wallets/taho.svg",
    link: "https://taho.xyz/",
  },
  {
    name: "TokenPocket",
    src: "/wallets/token-pocket.svg",
    link: "https://www.tokenpocket.pro/",
  },
  {
    name: "XDEFI Wallet",
    src: "/wallets/xdefi.svg",
    link: "https://www.xdefi.io/",
  },
  {
    name: "Zerion Wallet",
    src: "/wallets/zerion.svg",
    link: "https://zerion.io/",
  },
  {
    name: "MetaMask",
    src: "/wallets/metamask.svg",
    link: "https://metamask.io/",
  },
  {
    name: "Rabby Wallet",
    src: "/wallets/rabby.svg",
    link: "https://rabby.io/",
  },
  {
    name: "Rainbow",
    src: "/wallets/rainbow.svg",
    link: "https://www.rainbowkit.com",
  },
  {
    name: "Trust Wallet",
    src: "/wallets/trust.svg",
    link: "https://trustwallet.com/",
  },
  {
    name: "OKX Wallet",
    src: "/wallets/okx.svg",
    link: "https://www.okx.com/web3",
  },
].sort((a, b) => a.name.localeCompare(b.name));

const mobileWallets = [
  {
    name: "Bitget",
    src: "/wallets/bitget.svg",
    link: "https://web3.bitget.com/en",
  },
  {
    name: "Coinbase Wallet",
    src: "/coinbase.svg",
    link: "https://www.coinbase.com/wallet",
  },
  {
    name: "Coin98 Wallet",
    src: "/wallets/coin98.svg",
    link: "https://coin98.com/wallet",
  },
  {
    name: "Core",
    src: "/wallets/core.svg",
    link: "https://join.core.app/",
  },
  {
    name: "TokenPocket",
    src: "/wallets/token-pocket.svg",
    link: "https://www.tokenpocket.pro/",
  },
  {
    name: "imToken",
    src: "/wallets/imtoken.svg",
    link: "https://token.im/",
  },
  {
    name: "MetaMask mobile",
    src: "/wallets/metamask-mobile.svg",
    link: "https://metamask.io/",
  },
  {
    name: "Rainbow",
    src: "/wallets/rainbow.svg",
    link: "https://www.rainbowkit.com",
  },
  {
    name: "Trust Wallet",
    src: "/wallets/trust.svg",
    link: "https://trustwallet.com/",
  },
  {
    name: "WalletConnect",
    src: "/wallet-connect.svg",
    link: "https://walletconnect.com/",
  },
  {
    name: "Zerion Wallet",
    src: "/wallets/zerion.svg",
    link: "https://zerion.io/",
  },
].sort((a, b) => a.name.localeCompare(b.name));

export const ConnectIntro = () => {
  return (
    <div
      className={clsx(
        "w-full bg-white",
        "py-[40px] ",
        "lg:pt-[100px] lg:pb-[135px]"
      )}
    >
      <div className="max-w-[1120px] w-full flex flex-col items-center mx-auto">
        <div
          className={clsx(
            "text-center text-title1",
            "text-[20px] font-[510] mb-3 px-[20px]",
            "lg:text-[36px] "
          )}
        >
          No more wallet conflicts in exchange for a smooth user experience
        </div>
        <div
          className={clsx(
            "text-center text-body font-normal ",
            "text-[15px] mb-[24px]",
            "lg:text-[32px] lg:mb-[40px]"
          )}
        >
          Compatible with all. Varied for choice
        </div>
      </div>

      <div
        className={clsx(
          "max-w-[960px] w-full flex flex-col items-center mx-auto",
          "lg:px-0"
        )}
      >
        <Image
          src={"/connect.png"}
          alt={"connect"}
          width={960}
          height={440}
          className="px-[20px] lg:px-0"
        />
        <div
          className={clsx(
            "text-center text-title1",
            "text-[15px] mt-[40px] mb-[16px] ",
            "lg:text-2xl  lg:mt-[100px] lg:mb-[24px] "
          )}
        >
          Supported Protocols
        </div>

        <div className="flex items-center gap-[18px] w-full mb-[100px] px-[20px] ">
          {protocols.map(({ href, src, name }, idx) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={clsx(
                " flex-1 bg-gray-100 rounded flex-col justify-center items-center inline-flex",
                "hover:shadow",
                "gap-[8px] w-[112px] h-[88px]",
                "lg:gap-[12px] lg:h-32 lg:pt-6 lg:pb-7 "
              )}
            >
              <Image
                src={src}
                alt={name}
                width={32}
                height={32}
                className={clsx("w-[32px] h-[32px]", "lg:w-[40px] lg:h-[40px]")}
              />
              <div
                className={clsx(
                  "text-center text-title1",
                  "text-[13px]",
                  "lg:text-[18px]"
                )}
              >
                {name}
              </div>
            </a>
          ))}
        </div>

        <SupportedWallets
          wallets={extensionWallets}
          title="Supported Extension Wallets"
        />

        <div className="mt-[50px]" />

        <SupportedWallets
          wallets={mobileWallets}
          title="Supported Mobile Wallets"
        />
      </div>
    </div>
  );
};

function SupportedWallets({
  wallets,
  title = "Supported Extension Wallets",
}: {
  wallets: { src: string; name: string; link: string }[];
  title?: string;
}) {
  return (
    <>
      <div
        className={clsx(
          "text-center text-title1 ",
          "text-[15px] mb-[8px]",
          "lg:text-2xl  lg:mb-[24px]"
        )}
      >
        {title}
      </div>

      <div className="w-full flex flex-wrap">
        {wallets.map(({ src, name, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noreferrer"
            className={clsx(
              " flex flex-col justify-center items-center  hover:bg-card-2 hover:rounded-md",
              "w-[118px] h-[88px] gap-[8px]",
              "lg:w-[160px] lg:h-[120px] lg:gap-[12px]"
            )}
          >
            <Image
              src={src}
              alt={name}
              width={32}
              height={32}
              className="w-[32px] h-[32px] lg:w-[44px] lg:h-[44px]"
            />
            <div className="text-[13px] lg:text-[16px] font-[510] text-title1">
              {name}
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
