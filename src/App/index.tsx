import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Home } from "../pages";
import { Loading } from "../components";

export default () => (
  <Router>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);
