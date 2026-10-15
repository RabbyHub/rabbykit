import { useCallback, useEffect, useRef, useState } from 'react';

type WalletKit = { open: () => void };

export default function WalletEntry() {
  const [Demo, setDemo] = useState<typeof import('./walletDemo').default>();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<'load' | 'initialize'>();
  const [attempt, setAttempt] = useState(0);
  const request = useRef<Promise<void>>();
  const pendingOpen = useRef(false);

  const load = useCallback(() => {
    if (!request.current) {
      setError(undefined);
      request.current = import('./walletDemo')
        .then((module) => { setDemo(() => module.default); })
        .catch((error) => {
          console.error('Failed to load the wallet demo', error);
          setError('load');
        });
    }
    return request.current;
  }, []);

  const onReady = useCallback((kit: WalletKit, connected: boolean) => {
    if (pendingOpen.current) {
      pendingOpen.current = false;
      if (!connected) kit.open();
    }
    setReady(true);
    setError(undefined);
  }, []);
  const onError = useCallback((error: unknown) => {
    console.error('Failed to initialize the wallet demo', error);
    setError('initialize');
  }, []);

  useEffect(() => {
    try {
      // This is a restoration hint; wagmi validates and reconnects the stored session.
      const state = JSON.parse(localStorage.getItem('wagmi.store') || 'null')?.state;
      const connections = state?.connections;
      if (typeof state?.current === 'string' && connections?.__type === 'Map' &&
          Array.isArray(connections.value) && connections.value.some((entry: unknown) =>
            Array.isArray(entry) && entry[0] === state.current &&
            Array.isArray(entry[1]?.accounts) && entry[1].accounts.length > 0)) {
        setMounted(true);
        void load();
      }
    } catch {
      // Unavailable or malformed storage must not prevent a manual connection.
    }
  }, [load]);

  return <>
    {mounted && Demo && <div hidden={!ready}>
      <Demo onReady={onReady} onError={onError} attempt={attempt} />
    </div>}
    {(!ready || error) && <button
      className="py-[10px] px-[15px] bg-blue-default hover:shadow-button-hover h-10 rounded-md text-white text-base"
      aria-busy={mounted && !ready && !error}
      onPointerEnter={() => { void load(); }}
      onPointerDown={() => { void load(); }}
      onFocus={() => { void load(); }}
      onClick={() => {
        if (error === 'load') {
          window.location.reload();
          return;
        }
        pendingOpen.current = true;
        setMounted(true);
        if (error === 'initialize') setError(undefined);
        setAttempt((value) => value + 1);
        void load();
      }}
    >{error === 'load' ? 'Reload to retry' : error ? 'Try again' : mounted && !ready ? 'Loading…' : 'Connect Wallet'}</button>}
    {error && <span role="alert" className="ml-3 text-sm text-title2">
      {error === 'load' ? 'Wallet demo could not be downloaded.' : 'Wallet demo could not be initialized.'}
    </span>}
  </>;
}
