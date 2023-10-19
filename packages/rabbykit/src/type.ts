export type Theme = "light" | "dark" | "system";

export type RabbyKitModal = {
  open: (force?: boolean) => void;

  close: () => void;

  setTheme: (theme: Theme) => void;

  subscribeModalState: (fn: (open: boolean) => void) => () => void;
};
