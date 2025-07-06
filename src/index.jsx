import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/reset.css";
import "./styles/styles.css";

import { icons } from "./svg-manifest";
import { Header } from "./components/Header";
import { Main } from "./components/Main";

function lazyLoadBackgroundImage(el, iconName) {
  icons[iconName]().then((url) => {
    const path = url.default || url;
    el.style.backgroundImage = `url("${path}")`;
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      lazyLoadBackgroundImage(entry.target, entry.target.dataset.iconName);
      observer.unobserve(entry.target);
    }
  });
});

document
  .querySelectorAll("[data-icon-name]")
  .forEach((el) => observer.observe(el));

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  );
}

const root = createRoot(document.getElementById("app"));
root.render(<App />);
