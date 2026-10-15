export { prepareWallet } from "./rabbykit";
import { ConnectButton } from "./connectButton";
import { Providers } from "./rabbykit";

export default function WalletDemo() {
  return <Providers><ConnectButton /></Providers>;
}
