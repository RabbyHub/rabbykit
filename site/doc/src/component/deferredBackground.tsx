import { useEffect, useRef, useState } from 'react';

export function DeferredBackground({ src, fallbackSrc }: { src: string; fallbackSrc: string }) {
  const image = useRef<HTMLImageElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px' });
    if (image.current) observer.observe(image.current);
    return () => observer.disconnect();
  }, []);
  return <picture className="contents">
    <source srcSet={visible ? src : undefined} type="image/webp" />
    <img ref={image} src={visible ? fallbackSrc : undefined} alt="" aria-hidden="true"
      decoding="async" className="absolute inset-0 -z-10 h-full w-full object-fill" />
  </picture>;
}
