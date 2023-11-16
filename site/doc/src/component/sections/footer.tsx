import { LogoName } from "../logo";

export const Footer = () => {
  return (
    <div className="w-full h-28 bg-slate-800 flex items-center justify-center">
      <div className="w-full max-w-[960px] ">
        <div className="flex items-center justify-between">
          <LogoName name="Rabby Wallet" />
          <div className="flex flex-col items-end text-opacity-60 text-white text-sm font-medium font-['Lato']">
            <div className="flex items-center gap-2">
              <a
                className="text-white text-sm font-bold"
                href="https://github.com/RabbyHub/logo"
                target="_blank"
                rel="noreferrer"
              >
                Brand
              </a>
              <div>-</div>
              <a
                className="text-white text-sm font-bold"
                href="https://rabby.io/docs/privacy"
                target="_blank"
                rel="noreferrer"
              >
                Privacy Policy
              </a>
            </div>
            <div>© 2023 rabby.io All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
