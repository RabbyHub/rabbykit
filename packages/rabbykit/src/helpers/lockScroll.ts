export const lockScroll = () => {
  const lockScrollElement = document.body || document.documentElement;
  let lockScrollElementStyleCache: Record<string, string> = {};

  const lock = () => {
    lockScrollElementStyleCache.position = lockScrollElement.style.position;
    lockScrollElementStyleCache.overflow = lockScrollElement.style.overflow;

    lockScrollElement.style.position = "sticky";
    lockScrollElement.style.overflow = "hidden";
  };

  const unlock = () => {
    lockScrollElement.style.position = lockScrollElementStyleCache.position;
    if (lockScrollElementStyleCache.overflow) {
      lockScrollElement.style.overflow = lockScrollElementStyleCache.overflow;
    } else {
      lockScrollElement.style.removeProperty("overflow");
    }
  };
  return { lock, unlock };
};
