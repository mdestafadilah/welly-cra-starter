import React from "react";
import axios from "axios";
import { SWRConfig } from "swr";
import { BrowserRouter as Router } from "react-router-dom";

import AppProviders from "../context";
import Routes from "../pages";
import { Nav } from "../components";
import conf from "../configs";

export default (): JSX.Element => (
  <SWRConfig
    value={{
      fetcher: (url: string): any =>
        axios(`${conf.API_URL}${url}`).then((res) => res.data),
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
