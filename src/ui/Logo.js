import React from "react";

import "./Logo.css";

export default function Select({ items, label, value, onChange }) {
  return (
    <h1 className="logo">
      <span className="icon" role="img" aria-label="logo">
        💣
      </span>
      <span className="title">
        mine<em>sweeper</em>
      </span>
    </h1>
  );
}
