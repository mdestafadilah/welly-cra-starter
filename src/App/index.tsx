import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Global } from "@emotion/core";
import css from "@emotion/css/macro";

import AppProviders from "../context";
import Routes from "../pages";
import { Nav } from "../components";
import { root } from "./styles";

export default (): JSX.Element => (
  <>
    <Global
      styles={css`
        ${root}
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
