import React from "react";
import { Link, useLocation } from "react-router-dom";

export default (): JSX.Element | null => {
  const { pathname } = useLocation();

  return pathname !== "/login" ? (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/protected">Protected</Link>
        </li>
      </ul>
    </nav>
  ) : null;
};
