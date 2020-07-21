import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider as EmoThemeProvider } from "emotion-theming";

import theme from "./theme";

interface Props {
  children: ReactNode;
}

const ThemeProviders = ({ children }: Props): JSX.Element => (
  <MuiThemeProvider theme={theme}>
    <EmoThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </EmoThemeProvider>
  </MuiThemeProvider>
);

// eslint-disable-next-line import/prefer-default-export
export { ThemeProviders };
