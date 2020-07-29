import baseConfig from "./base";
import testConfig from "./test";
import prodConfig from "./prod";

interface Config {
  [k: string]: any;
}

const env = process.env.REACT_APP_ENV || "dev";
const envConfig: Config = {
  test: testConfig,
  prod: prodConfig,
  // More environment configurations...
};

export default { ...baseConfig, ...(envConfig[env] || {}) };
