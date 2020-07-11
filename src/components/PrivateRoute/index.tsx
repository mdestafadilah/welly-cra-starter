import React, { ReactType } from "react";
import { Route } from "react-router-dom";

interface Props {
  component: ReactType;
  [key: string]: any;
}

export default ({ component: Component, ...rest }: Props) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);
