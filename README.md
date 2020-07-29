# Welly CRA Starter

A React CSR starter for my personal projects along with these [awesome features](#features).

<img width="776" alt="demo" src="https://user-images.githubusercontent.com/21308003/88076666-ee3cd900-cbac-11ea-8674-c8aaf967cd18.png">

⚡️ Try yourself: https://welly-cra-starter.netlify.app

## Features

- ⚛️ Based on [create-react-app](https://github.com/facebook/create-react-app).
- 🧑🏻‍💻 Developing with [TypeScript](https://www.typescriptlang.org).
- 🚏 Routing with [react-router](https://reactrouter.com).
- 🗄️ Integrating [swr](https://swr.vercel.app/) and [axios](https://github.com/axios/axios) for data fetching.
- 👩🏻‍🎤 Styling with [emotion-js](https://emotion.sh/docs/introduction).
- 🧑🏻‍🎨 Integrating [Material-UI](https://material-ui.com).
- 🌏 Integrating [react-intl](https://formatjs.io/docs/react-intl) to support multiple languages.
- 👮🏻 Code quality checking with [ESlint superset](https://github.com/wellyshen/eslint-config-welly) and [Stylelint](https://stylelint.io/).
- 👷🏻 Code formatting with [Prettier](https://prettier.io) (integrated with linters).

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
│   ├── config              // App configuration (by environments)
│   ├── context             // React context (for global states)
│   ├── utils               // App utilities
│   ├── langs               // Multiple language files (e.g. en, fr etc.)
│   ├── styles              // Global styles (e.g. theme, colors etc.)
│   ├── types               // Global type definitions
│   ├── assets              // Static files (e.g. images, fonts etc.)
│   ├── index.tsx           // App entry
│   ├── serviceWorker.js    // See: https://create-react-app.dev/docs/making-a-progressive-web-app
│   └── setupTests.js       // Jest setup file
├── .env                    // See: https://create-react-app.dev/docs/adding-custom-environment-variables
└── tsconfig.json           // TypeScript configuration
```

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
