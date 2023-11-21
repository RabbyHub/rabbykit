import clsx from "clsx";
import Image from "next/image";

const protocols = [
  {
    name: "EIP-6963",
    src: "/eip-6963.svg",
    width: 40,
    height: 40,
    href: "https://eips.ethereum.org/EIPS/eip-6963",
  },
  {
    name: "Wallet Connect",
    src: "/wallet-connect.svg",
    width: 40,
    height: 40,
    href: "https://walletconnect.com/",
  },

  {
    name: "Coinbase",
    src: "/coinbase.svg",
    width: 40,
    height: 40,
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
    name: "Coinbase Wallet",
    src: "/coinbase.svg",
    link: "https://www.coinbase.com/wallet",
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
];
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
];
export const ConnectIntro = () => {
  return (
    <div className="w-full bg-white pt-[100px] pb-[135px] ">
      <div className="max-w-[1120px] w-full flex flex-col items-center mx-auto">
        <div className="text-center text-title1 text-[36px] font-[510]  mb-3">
          No more wallet conflicts in exchange for a smooth user experience
        </div>
        <div className="text-center text-body text-[32px] font-normal mb-[40px]">
          Compatible with all. Varied for choice.
        </div>
      </div>

      <div className="max-w-[960px] w-full flex flex-col items-center mx-auto">
        <Image src={"/connect.png"} alt={"connect"} width={960} height={440} />

        <div className="text-center text-title1 text-2xl  mt-[100px] mb-[24px]">
          Supported Protocols
        </div>
        <div className="flex items-center gap-[18px] w-full mb-[100px]">
          {protocols.map(({ href, src, name, width, height }, idx) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={clsx(
                "gap-[12px]",
                "hover:shadow",
                "flex-1 h-32 pt-6 pb-7 bg-gray-100 rounded flex-col justify-center items-center  inline-flex"
              )}
            >
              <Image src={src} alt={name} width={width} height={height} />
              <div className="text-center text-title1 text-lg">{name}</div>
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
      <div className="text-center text-title1 text-2xl  mb-[24px]">{title}</div>

      <div className="w-full flex flex-wrap">
        {wallets.map(({ src, name, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="w-[160px] h-[120px] flex flex-col justify-center items-center gap-[12px] hover:bg-card-2 hover:rounded-md"
          >
            <Image src={src} alt={name} width={44} height={44} />
            <div className="text-[16px] font-[510] text-title1">{name}</div>
          </a>
        ))}
      </div>
    </>
  );
}
