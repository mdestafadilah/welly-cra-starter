import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routes from "../pages/Routes";
import { Nav } from "../components";

export default () => (
  <Router>
    <Nav />
    <Routes />
  </Router>
);
