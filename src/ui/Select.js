import React from "react";

import Button from "./Button";

import "./Select.css";

export default function Select({ items, label, value, onChange }) {
  return (
    <div className="select">
      <span className="label">{label}:</span>
      <div className="items">
        {items.map((item) => {
          return (
            <Button
              label={item}
              selected={value === item}
              onClick={() => onChange(item)}
              key={`item-${item}`}
            />
          );
        })}
      </div>
    </div>
  );
}
