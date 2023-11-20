export type Theme = "light" | "dark" | "system";

export type themeVariables = Partial<{
  "--rk-font-family": string;

  // "--rk-modal-bg": string;
  // "--rk-modal-box-shadow": string;
  // "--rk-overlay-bg": string;
  "--rk-border-radius": string;

  "--rk-button-border-radius": string;
  "--rk-primary-button-font-size": string;
  "--rk-primary-button-font-weight": string;
  "--rk-primary-button-color": string;
  "--rk-primary-button-bg": string;
  "--rk-primary-button-border": string;

  "--rk-primary-button-hover-color": string;
  "--rk-primary-button-hover-bg": string;
  "--rk-primary-button-hover-border": string;
}>;

export type Type = "browser" | "qrCode" | "mobile" | "unused";

export type Disclaimer = { term: string; privacy: string };

export type CustomButton = { name: string; logo: string; onClick: () => void };

export type Hook = {
  onConnect?: () => void;
  onConnectError?: (error: Error) => void;
  onModalClosed?: () => void;
  onModalClosedByManualOperation?: () => void;
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
