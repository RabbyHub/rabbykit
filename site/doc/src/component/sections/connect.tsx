import Image from "next/image";

const protocols = [
  {
    name: "EIP-6963",
    src: "/eip-6963.svg",
    width: 48,
    height: 48,
  },
  {
    name: "Wallet Connect",
    src: "/wallet-connect.svg",
    width: 40,
    height: 40,
  },

  {
    name: "Coinbase",
    src: "/coinbase.svg",
    width: 40,
    height: 40,
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
    link: "https://www.coinbase.com/",
  },
  {
    name: "MetaMask",
    src: "/wallets/metamask.svg",
    link: "https://metamask.io/",
  },
  {
    name: "Rabby",
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
    link: "https://www.coinbase.com/",
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
        <div className="text-center text-title1 text-4xl  mb-3">
          No more wallet conflicts in exchange for a smooth user experience
        </div>
        <div className="text-center text-body text-4xl font-normal mb-[40px]">
          Compatible with all. Varied for choice.
        </div>
      </div>

      <div className="max-w-[960px] w-full flex flex-col items-center mx-auto">
        <Image src={"/connect.png"} alt={"connect"} width={960} height={440} />

        <div className="text-center text-title1 text-2xl  mt-[100px] mb-[24px]">
          Supported Protocols
        </div>
        <div className="flex items-center gap-[18px] w-full">
          {protocols.map(({ src, name, width, height }) => (
            <div className="flex-1 h-32 pt-6 pb-7 bg-gray-100 rounded flex-col justify-center items-center gap-3 inline-flex">
              <div className="w-12 h-12 relative flex-col justify-start items-start flex" />
              <Image src={src} alt={name} width={width} height={height} />
              <div className="text-center text-title1 text-lg font-bold ">
                {name}
              </div>
            </div>
          ))}
        </div>

        <SupportedWallets
          wallets={extensionWallets}
          title={"Extension wallet"}
        />

        <SupportedWallets wallets={mobileWallets} title={"Mobile wallet"} />
      </div>
    </div>
  );
};

function SupportedWallets({
  wallets,
  title,
}: {
  wallets: { src: string; name: string; link: string }[];
  title: string;
}) {
  return (
    <>
      <div className="text-center text-title1 text-2xl  mt-[100px] mb-[24px]">
        Supported Wallets
      </div>
      <div className="w-[200px] h-[44px] inline-flex items-center justify-center gap-[6px] bg-card-2 mb-[16px]">
        <Image src={"/browser.svg"} alt={""} width={20} height={20} />
        <div className="text-center text-body text-[15px] font-[510]">
          {title}
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {wallets.map(({ src, name, link }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="w-[160px] h-[120px] flex flex-col justify-center items-center gap-[12px] hover:bg-card-2 hover:rounded-md"
          >
            <Image src={src} alt={name} width={52} height={52} />
            <div className="text-[18px] font-[510] text-title1">{name}</div>
          </a>
        ))}
      </div>
    </>
  );
}
