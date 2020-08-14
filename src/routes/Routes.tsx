import React, { Suspense, memo } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { useAuth } from "../context/auth";
import { Route as RouteProps } from ".";
import { Loading } from "../components";

const RouteWithSubRoutes = memo(
  ({
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
          isPrivate && redirect && !isAuthenticated ? (
            <Redirect
              to={{
                pathname: redirect,
                state: { from: props.location },
              }}
            />
          ) : (
            // @ts-ignore
            <Component routes={subRoutes} {...props} />
          )
        }
      />
    );
  }
);

const Routes = ({ routes }: RouteProps): JSX.Element => (
  <Suspense fallback={<Loading />}>
    <Switch>
      {routes?.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </Switch>
  </Suspense>
);

export default memo(Routes);
