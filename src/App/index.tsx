import React from "react";
import { SWRConfig } from "swr";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";

import { useUser } from "../context/user";
import { fetcher } from "../utils";
import messages from "../langs";
import Routes from "../pages";
import { AppBar } from "../components";

const config = {
  refreshInterval: 3000,
  fetcher,
};

export default (): JSX.Element => {
  const lang = useUser().lang as string;

  return (
    // @ts-ignore
    <IntlProvider locale={lang} messages={messages[lang]}>
      <SWRConfig value={config}>
        <Router>
          <AppBar />
          <Routes />
        </Router>
      </SWRConfig>
    </IntlProvider>
  );
};
