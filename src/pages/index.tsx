import React, { ReactNode, lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuth } from "../context/auth";
import { Loading } from "../components";

const Login = lazy(() => import("./Login"));
const Home = lazy(() => import("./Home"));
const Protected = lazy(() => import("./Protected"));
const NoMatch = lazy(() => import("./NoMatch"));

interface Props {
  children: ReactNode;
  [k: string]: any;
}

const PrivateRoute = ({ children, ...rest }: Props) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

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
