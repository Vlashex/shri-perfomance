import React, { useRef, useEffect } from "react";
import { icons } from "../svg-manifest";

export function LazyIcon({ iconName, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;

      // Загружаем SVG и ставим background
      icons[iconName]?.().then((mod) => {
        const url = mod.default || mod;
        el.style.backgroundImage = `url("${url}")`;
      });

      observer.unobserve(el);
    });

    observer.observe(el);

    // очистка при демонтировании
    return () => observer.disconnect();
  }, [iconName]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}
