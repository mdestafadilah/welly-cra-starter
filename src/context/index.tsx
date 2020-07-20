import React, { ReactNode } from "react";

import { AuthProvider } from "./auth";
import { UserProvider } from "./user";

interface Props {
  children: ReactNode;
}

export default ({ children }: Props): JSX.Element => (
  <AuthProvider>
    <UserProvider>{children}</UserProvider>
  </AuthProvider>
);
