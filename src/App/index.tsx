import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Global } from "@emotion/core";
import css from "@emotion/css/macro";
import normalize from "normalize.css";

import AppProviders from "../context";
import Routes from "../pages";
import { Nav } from "../components";

export default (): JSX.Element => (
  <>
    <Global
      styles={css`
        ${normalize}
      `}
    />
    <AppProviders>
      <Router>
        <Nav />
        <Routes />
      </Router>
    </AppProviders>
  </>
);
