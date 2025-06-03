import { WalletResult } from "../../type";
import logo from "./logo.svg";
import { injected } from "@wagmi/connectors";
import { getInjectedName } from "../../../helpers/getInjecgedName";

export const otherInjectedWalletId = "rabbykit_other_injected_wallet";
export const otherInjectedWallet = (): WalletResult => {
  const isInjected =
    typeof window !== "undefined" && typeof window.ethereum !== "undefined";

  return {
    id: otherInjectedWalletId,
    name: "Other Wallet",
    logo,
    installed: isInjected,
    downloadUrls: {},
    connector: {
      browser: () =>
        injected({
          target: () => {
            let detectedName = getInjectedName(window.ethereum);
            detectedName =
              typeof detectedName === "string"
                ? detectedName
                : detectedName.join(",");
            if (detectedName === "Injected") {
              detectedName = Object.keys(window.ethereum)
                .filter(
                  (key) =>
                    key.startsWith("is") &&
                    window.ethereum[key] &&
                    typeof window.ethereum[key] === "boolean"
                )
                .map((key) => key.replace("is", ""))
                .join(",");
            }
            return {
              id: otherInjectedWalletId,
              name: detectedName,
              provider: window.ethereum,
            };
          },
        }),
    },
  };
};
