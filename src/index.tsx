import React from "react";
import ReactDOM from "react-dom";

import AppProviders from "./context";
import { ThemeProviders } from "./styles";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <AppProviders>
    <ThemeProviders>
      <App />
    </ThemeProviders>
  </AppProviders>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
