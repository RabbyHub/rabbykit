export const isAndroid = () => {
  return (
    typeof navigator !== "undefined" && /Android/i.test(navigator.userAgent)
  );
};

export const isIOS = () => {
  return (
    typeof navigator !== "undefined" &&
    /iPhone|iPad|iPod/i.test(navigator.userAgent)
  );
};

export const isMobile = () => {
  return isAndroid() || isIOS();
};

export function isSafari(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /Version\/([0-9._]+).*Safari/.test(navigator.userAgent) // Source: https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts
  );
}

export enum BrowserType {
  Chrome = "chrome",
  Edge = "edge",
  Firefox = "firefox",
  Safari = "safari",
}

export function getBrowser(): BrowserType {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("edg/") > -1) return BrowserType.Edge;
  else if (ua.indexOf("chrome") > -1) return BrowserType.Chrome;
  else if (ua.indexOf("firefox") > -1) return BrowserType.Firefox;
  return BrowserType.Chrome;
}
