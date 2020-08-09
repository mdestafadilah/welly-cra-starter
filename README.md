# Welly CRA Starter

A React CSR starter for my personal projects along with these [awesome features](#features).

<img width="776" alt="demo" src="https://user-images.githubusercontent.com/21308003/88076666-ee3cd900-cbac-11ea-8674-c8aaf967cd18.png">

⚡️ Try yourself: https://welly-cra-starter.netlify.app

## Tech Stack

- Based on [create-react-app](https://github.com/facebook/create-react-app).
- Developing with [TypeScript](https://www.typescriptlang.org).
- Routing with [react-router](https://reactrouter.com).
- Integrating [swr](https://swr.vercel.app/) and [axios](https://github.com/axios/axios) to handle API data.
- Styling with [emotion-js](https://emotion.sh/docs/introduction).
- Integrating [Material-UI](https://material-ui.com).
- Integrating [react-intl](https://formatjs.io/docs/react-intl) to support internationalization (i18n).
- Code quality checking with [ESlint superset](https://github.com/wellyshen/eslint-config-welly) and [Stylelint](https://stylelint.io/).
- Code formatting with [Prettier](https://prettier.io) (integrated with linters).

## Script Commands

| Script             | Description                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| `start`            | Runs the app in development mode at http://localhost:3000.              |
| `build`            | Builds the app for production to the `build` folder.                    |
| `type-check`       | Runs type checking for `.tsx?` files.                                   |
| `type-check:watch` | Runs type checking watcher in an interactive mode.                      |
| `lint`             | Lints all `.css`, `.js`, `.tsx?` files with auto fixing.                |
| `lint:code`        | Lints all `.js`, `.tsx?` files with auto fixing.                        |
| `lint:style`       | Lints all `.css`, `.tsx?` files with auto fixing.                       |
| `test`             | Runs the test watcher in an interactive mode.                           |
| `test:cov`         | Runs the test once with code coverage reports to the `coverage` folder. |
| `clean`            | Removes the `build` and `coverage` folders.                             |
| `clean:build`      | Removes the `build` folder.                                             |
| `clean:cov`        | Removes the `coverage` folder.                                          |

## App Structure

```
.
├── .vscode                 // Google Chrome debugging configuration for VSCode
├── public                  // See: https://create-react-app.dev/docs/using-the-public-folder
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src                     // App source code
│   ├── App                 // App root component
│   ├── components          // Reusable components
│   ├── pages               // Page components
│   ├── routes              // Routes configuration and component
│   ├── config              // App configuration (by environments)
│   ├── context             // React context (for global states)
│   ├── hooks               // Custom hooks
│   ├── utils               // App utility functions
│   ├── langs               // Language files of react-intl (e.g. en, fr etc.)
│   ├── styles              // Global styles (e.g. theme, colors etc.)
│   ├── types               // Global type definitions
│   ├── assets              // Static files (e.g. images, fonts etc.)
│   ├── index.tsx           // App entry
│   ├── serviceWorker.js    // See: https://create-react-app.dev/docs/making-a-progressive-web-app
│   └── setupTests.js       // Jest setup file
├── .env                    // See: https://create-react-app.dev/docs/adding-custom-environment-variables
└── tsconfig.json           // TypeScript configuration
```

## Performance Guide

- Lazy load (a.k.a code-splitting) **heavy component** by [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy).
- Prevent unnecessary re-rendering by [React.memo](https://reactjs.org/docs/react-api.html#reactmemo).
- Memorize **heavy computing** by [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback) or [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) hooks.

> 💡 See the [Performance Optimization](https://reactjs.org/docs/hooks-faq.html#performance-optimizations) doc to learn more.

## Setup App Configuration by Environment

We can setup the configuration based on the `development`, `testing` and `production`. The project uses the [base](https://github.com/wellyshen/welly-cra-starter/blob/master/src/config/base.ts) for the `development` and it's also the default configuration.

```js
// Use the base configuration by default
yarn build
// or
REACT_APP_ENV=dev yarn build

// Use the testing configuration
REACT_APP_ENV=test yarn build

// Use the production configuration
REACT_APP_ENV=prod yarn build
```

## Adding New Pages

This starter integrates the [Route Config](https://reactrouter.com/web/example/route-config) and [Redirects (Auth)](https://reactrouter.com/web/example/auth-workflow) for you to handle routes without struggle. You can add new a page via the `./src/routes/config.ts` as below:

```js
import { lazy } from "react";

// Code-splitting pages for performance optimization
const Login = lazy(() => import("../pages/Login"));
const Home = lazy(() => import("../pages/Home"));
const Protected = lazy(() => import("../pages/Protected"));
const NoMatch = lazy(() => import("../pages/NoMatch"));

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/",
    exact: true,
    component: Home,
  },
  {
    isPrivate: true,
    redirect: "/login",
    path: "/protected",
    component: Protected,
  },
  {
    component: NoMatch,
  },
];
```

For nested pages, just reuse the pattern that we already built.

```js
// Routes config
import { lazy } from "react";

const TopPage = lazy(() => import("../pages/TopPage"));
const SubPage = lazy(() => import("../pages/SubPage"));
const NoMatch = lazy(() => import("../pages/NoMatch"));

const routes = [
  {
    path: "/top-page",
    component: TopPage,
    // Setup the nested page
    routes: [
      {
        path: "/top-page/sub-page",
        component: SubPage,
      },
    ],
  },
  {
    component: NoMatch,
  },
];

// TopPage component
import React from "react";

import { Routes } from "./routes";

const TopPage = ({ routes }) => (
  <div className="container">
    {/* Render the nested routes */}
    <Routes routes={routes} />
  </div>
);
```

## Handling API Data

### Fetching Data

The `useAuthSWR` hook integrates [swr](https://swr.vercel.app) and [axios](https://github.com/axios/axios) to handle the **auth-token** and **auth error handling** for you. Just use it as [normal](https://github.com/vercel/swr#api), it will automatically logout user when the token is invalid.

```js
import React from "react";

import useAuthSWR from "../hooks/useAuthSWR";

const App = () => {
  // It has the same API plus some useful options
  // If auth-token is invalid, it will redirect user to login page automatically
  const { data, error } = useAuthSWR("/api/foo", {
    disableAuthErrorHandling: true, // Disable internal auth error handling, default = false
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <div>hello {data.name}!</div>;
};
```

### Posting Data

The `useAuthSWR` hook also exports the `fetcher` (based on [axios](https://github.com/axios/axios)), which includes the **API entry point** and **auth-token** already.

```js
import React from "react";

import useAuthSWR, { authFetcher } from "../hooks/useAuthSWR";

const App = () => {
  const url = "/api/foo";
  const { data, mutate } = useAuthSWR(url);

  const handleSubmit = async () => {
    try {
      const newName = "Welly";
      const config = {
        method: "post",
        data: {
          name: newName,
        },
      };

      await authFetcher(url, config);
      // Update the local data immediately and revalidate (refetch)
      mutate(url, { ...data, name: newName });
    } catch (error) {
      // Error handling
    }
  };

  // ...
};
```

- `url` - API route name.
- `config` - The same with [axios config](https://github.com/axios/axios#request-config).

## Utils

### Date-time Format

Format date and time via the [Date Formatting APIs](https://formatjs.io/docs/react-intl/api/#date-formatting-apis) of react-intl.

```js
import React from "react";
import { useIntl } from "react-intl";

import dateTimeFormat from "../utils/dateTimeFormat";

const App = () => {
  const intl = useIntl();

  const options = {
    date: true,
    time: true,
    dateConfig: {
      // Some configs...
    },
    timeConfig: {
      // Some configs...
    },
  };
  // Default dateTime = "MM/DD/YYYY HH:MM AM"
  const dateTime = dateTimeFormat(
    1596860669, // Unix timestamp
    intl,
    options
  );

  // ...
};
```

- `dateConfig` - See the [doc](https://formatjs.io/docs/react-intl/api/#formatdate).
- `timeConfig` - See the [doc](https://formatjs.io/docs/react-intl/api/#formattime).
