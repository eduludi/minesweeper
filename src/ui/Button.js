import React from "react";

import "./Button.css";

export default function Button({
  className = "",
  label,
  selected,
  primary,
  large,
  onClick
}) {
  return (
    <button
      className={`button ${selected ? "button--selected" : ""} ${
        primary ? "button--primary" : ""
      } ${large ? "button--large" : ""} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
