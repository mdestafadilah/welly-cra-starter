import defaultConfig from "./default";
import prodConfig from "./prod";

interface Config {
  [k: string]: any;
}

const env = process.env.REACT_APP_ENV || "development";
const envConfig: Config = {
  production: prodConfig,
  // more configurations...
};

export default { ...defaultConfig, ...(envConfig[env] || {}) };
