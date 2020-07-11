import React, { ReactNode } from "react";
import { Route, Redirect } from "react-router-dom";

interface Props {
  children: ReactNode;
  [k: string]: any;
}

const isAuthenticated = false;

export default ({ children, ...rest }: Props) => (
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
