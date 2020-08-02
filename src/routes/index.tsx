import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuth } from "../context/auth";
import { Loading } from "../components";
import routes, { Route as RouteProps } from "./config";

export const RouteWithSubRoutes = ({
  isPrivate,
  redirect,
  path,
  component: Component,
  routes: subRoutes,
}: RouteProps): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      path={path}
      render={(props): JSX.Element =>
        isPrivate && !isAuthenticated ? (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        ) : (
          // @ts-ignore
          <Component {...props} routes={subRoutes} />
        )
      }
    />
  );
};

export default (): JSX.Element => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {routes.map((route, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </Suspense>
);
