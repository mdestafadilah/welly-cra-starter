import React from "react";
import { SWRConfig } from "swr";
import { BrowserRouter as Router } from "react-router-dom";

import { fetcher } from "../utils";
import AppProviders from "../context";
import Routes from "../pages";
import { AppBar } from "../components";

export default (): JSX.Element => (
  <SWRConfig
    value={{
      refreshInterval: 3000,
      fetcher,
    }}
  >
    <AppProviders>
      <Router>
        <AppBar />
        <Routes />
      </Router>
    </AppProviders>
  </SWRConfig>
);
