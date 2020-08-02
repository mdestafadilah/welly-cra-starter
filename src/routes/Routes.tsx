import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuth } from "../context/auth";
import { Route as RouteProps } from ".";

const RouteWithSubRoutes = ({
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

export default ({ routes }: RouteProps): JSX.Element => (
  <Switch>
    {routes?.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} />
    ))}
  </Switch>
);