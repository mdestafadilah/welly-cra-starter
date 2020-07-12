import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import { Loading, PrivateRoute } from "../components";

const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Protected = lazy(() => import("./Protected"));
const NoMatch = lazy(() => import("./NoMatch"));

export default () => (
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
);
