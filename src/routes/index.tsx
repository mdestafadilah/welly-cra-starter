import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuth } from "../context/auth";
import { Loading } from "../components";
import routeConfig, { Route as RouteProps } from "./config";

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
        !isPrivate || (isPrivate && isAuthenticated) ? (
          // @ts-ignore
          <Component {...props} routes={subRoutes} />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default (): JSX.Element => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {routeConfig.routes.map((route, i) => (
        <RouteWithSubRoutes
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          redirect={routeConfig.redirect || route.redirect}
          {...route}
        />
      ))}
    </Switch>
  </Suspense>
);
