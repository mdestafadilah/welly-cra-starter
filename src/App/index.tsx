import React from "react";
import { SWRConfig } from "swr";
import { BrowserRouter as Router } from "react-router-dom";

import fetcher from "../utils/fetcher";
import AppProviders from "../context";
import Routes from "../pages";
import { Nav } from "../components";

export default (): JSX.Element => (
  <SWRConfig
    value={{
      refreshInterval: 3000,
      fetcher,
    }}
  >
    <AppProviders>
      <Router>
        <Nav />
        <Routes />
      </Router>
    </AppProviders>
  </SWRConfig>
);
