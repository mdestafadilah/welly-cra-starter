import defaultConf from "./default";
import prodConf from "./prod";

const env = process.env.REACT_APP_ENV || "development";
const envConf: { [k: string]: any } = {
  production: prodConf,
  // more configurations...
};

export default { ...defaultConf, ...(envConf[env] || {}) };
