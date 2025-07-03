import React, { useRef, useEffect } from "react";
import { icons } from "./svg-manifest";

export function LazySelect({
  iconName,
  className,
  style = {},
  children,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !iconName) return;

    // Можно сразу загружать, если ленивость не критична
    icons[iconName]?.().then((mod) => {
      const url = mod.default || mod;
      el.style.backgroundImage = `url("${url}")`;
    });
  }, [iconName]);

  return (
    <select
      {...props}
      ref={ref}
      className={className}
      style={style}
      aria-hidden="true"
    >
      {children}
    </select>
  );
}
