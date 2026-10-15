import { Providers } from './rabbykit';
import { ConnectButton } from './connectButton';

type Props = {
  onReady: (kit: { open: () => void }, connected: boolean) => void;
  onError: (error: unknown) => void;
  attempt: number;
};

export default function WalletDemo({ onReady, onError, attempt }: Props) {
  return <Providers onReady={onReady} onError={onError} attempt={attempt}><ConnectButton /></Providers>;
}
