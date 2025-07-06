import React from "react";
import { useState } from "react";
import { LazyIcon } from "./LazyIcon";

export function Header() {
  let [expanded, setExpanded] = useState(false);
  let [toggled, setToggled] = useState(false);

  const onClick = () => {
    if (!toggled) {
      setToggled(true);
    }

    setExpanded(!expanded);
  };

  return (
    <header className="header">
      <a href="/" aria-label="Яндекс.Дом" className="header__logo-wrapper">
        <LazyIcon
          iconName="logo"
          className="header__logo"
          style={{
            width: "6.75rem",
            height: "2.3125rem",
            marginRight: "3.25rem",
            flex: "0 0 auto",
          }}
        />
      </a>
      <button
        className="header__menu"
        aria-expanded={expanded ? "true" : "false"}
        onClick={onClick}
      >
        <LazyIcon
          style={{
            background: "50% 50% no-repeat transparent",
            height: "100%",
            width: "100%",
          }}
          iconName="headerBtn"
        />
        <span className="header__menu-text a11y-hidden">
          {expanded ? "Закрыть меню" : "Открыть меню"}
        </span>
      </button>
      <ul
        className={
          "header__links" +
          (expanded ? " header__links_opened" : "") +
          (toggled ? " header__links-toggled" : "")
        }
      >
        <li className="header__item">
          <a
            className="header__link header__link_current"
            href="/"
            aria-current="page"
          >
            Сводка
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/devices">
            Устройства
          </a>
        </li>
        <li className="header__item">
          <a className="header__link" href="/scripts">
            Сценарии
          </a>
        </li>
      </ul>
    </header>
  );
}
