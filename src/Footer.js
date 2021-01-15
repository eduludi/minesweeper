import React from "react";

import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <p className="by">by eduludi</p>
      <p className="links">
        <a className="link" href="https://github.com/eduludi" title="@eduludi">
          github
        </a>
        <a className="link" href="https://twitter.com/eduludi" title="@eduludi">
          twitter
        </a>
        <a
          className="link"
          href="https://instagram.com/eduludi"
          title="@eduludi"
        >
          instagram
        </a>
      </p>
    </div>
  );
}
