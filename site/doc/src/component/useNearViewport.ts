import { useEffect, useRef, useState } from "react";

export function useNearViewport<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px" });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}
