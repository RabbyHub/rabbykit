export type Theme = "light" | "dark" | "system";

export type Disclaimer = { term: string; privacy: string };

export type CustomButton = { name: string; logo: string; onClick: () => void };

export type Hook = {
  onConnect?: () => void;
  onConnectError?: (error: Error) => void;
  onModalClosed?: () => void;
};

export type RabbyKitModal = {
  open: (params?: { forceOpen?: boolean } & Hook) => void;
  close: () => void;
  getOpenState: () => boolean;

  setTheme: (theme: Theme) => void;
  getTheme: () => Theme;

  setDisclaimer: (disclaimer?: Disclaimer) => void;
  getDisclaimer: () => Disclaimer | undefined;

  setCustomButtons: (customButtons?: CustomButton[]) => void;
  getCustomButtons: () => CustomButton[] | undefined;

  subscribeModalState: (fn: (open: boolean) => void) => () => void;
};
