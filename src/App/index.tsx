import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Login, Home, Protected, NoMatch } from "../pages";
import { Loading, Nav, PrivateRoute } from "../components";

export default () => (
  <Router>
    <Nav />
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <PrivateRoute path="/protected">
          <Protected />
        </PrivateRoute>
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);
