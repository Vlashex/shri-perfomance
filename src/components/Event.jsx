import React, { useEffect } from "react";
import { useRef } from "react";
import { iconUrls } from "../svg-manifest";

export default function Event(props) {
  const ref = useRef();

  const { onSize, icon } = props;

  useEffect(() => {
    const width = ref.current.offsetWidth;
    const height = ref.current.offsetHeight;
    if (onSize) {
      onSize({ width, height });
    }
  });

  return (
    <li ref={ref} className={"event" + (props.slim ? " event_slim" : "")}>
      <button className="event__button">
        <img
          width={24}
          height={24}
          loading="lazy"
          className={`event__icon`}
          src={iconUrls[icon]}
          alt=""
        />
        <h4 className="event__title">{props.title}</h4>
        {props.subtitle && (
          <span className="event__subtitle">{props.subtitle}</span>
        )}
      </button>
    </li>
  );
}
