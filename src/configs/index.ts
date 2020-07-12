import defaultConf from "./default";

const env = process.env.REACT_APP_ENV || "development";
const envConf = require(`./${env}`).default;

export default { ...defaultConf, ...envConf };
