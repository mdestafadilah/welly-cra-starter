import React, { useState, memo } from "react";
import { SWRConfig } from "swr";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router } from "react-router-dom";

import { useUser, ContextProps } from "../context/user";
import { fetcher } from "../utils";
import messages from "../langs";
import { Routes, routes } from "../routes";
import { AppBar, Drawer } from "../components";

const config = {
  refreshInterval: 3000,
  fetcher,
};

const App = (): JSX.Element => {
  const { lang } = useUser() as ContextProps;
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = (val: boolean) => (): void => {
    setShowDrawer(val);
  };

  return (
    // @ts-ignore
    <IntlProvider locale={lang} messages={messages[lang]}>
      <SWRConfig value={config}>
        <Router>
          <AppBar onClickIcon={toggleDrawer(true)} />
          <Drawer open={showDrawer} onClose={toggleDrawer(false)} />
          <Routes routes={routes} />
        </Router>
      </SWRConfig>
    </IntlProvider>
  );
};

export default memo(App);
