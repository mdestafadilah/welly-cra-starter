import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";

interface Props {
  children: ReactNode;
}

export default ({ children }: Props): JSX.Element => (
  <AuthProvider>{children}</AuthProvider>
);
