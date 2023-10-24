export type Theme = "light" | "dark" | "system";

export type Disclaimer = { term: string; privacy: string };

export type CustomButton = { name: string; logo: string; onClick: () => void };

export type RabbyKitModal = {
  open: (force?: boolean) => void;

  close: () => void;

  setTheme: (theme: Theme) => void;

  setDisclaimer: (disclaimer?: Disclaimer) => void;

  setCustomButtons: (customButtons?: CustomButton[]) => void;

  subscribeModalState: (fn: (open: boolean) => void) => () => void;
};
