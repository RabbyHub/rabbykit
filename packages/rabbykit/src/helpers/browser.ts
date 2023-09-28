//detect device whether is a mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

//detect device whether is a android device
export const isAndroid = () => {
  return /Android/i.test(navigator.userAgent);
};

//detect device whether is a ios device
export const isIOS = () => {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
};
