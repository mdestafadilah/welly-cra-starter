import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import AppProviders from "../context";
import Routes from "../pages";
import { Nav } from "../components";

export default () => (
  <AppProviders>
    <Router>
      <Nav />
      <Routes />
    </Router>
  </AppProviders>
);
