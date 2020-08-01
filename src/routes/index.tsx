import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuth } from "../context/auth";
import { Loading } from "../components";
import routeConfig, { Route as RouteProps } from "./config";

interface Props extends RouteProps {
  isAuthenticated?: boolean;
}

const RouteWithSubRoutes = ({
  isAuthenticated,
  isPrivate,
  redirect,
  path,
  component: Component,
  routes: subRoutes,
}: Props): JSX.Element => (
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

export default (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        {routeConfig.routes.map((route, i) => (
          <RouteWithSubRoutes
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            {...route}
            isAuthenticated={isAuthenticated}
            redirect={route.redirect || routeConfig.redirect}
          />
        ))}
      </Switch>
    </Suspense>
  );
};
