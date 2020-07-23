import axios, { AxiosPromise } from "axios";

import config from "../config";

export default (url: string): AxiosPromise =>
  axios(`${config.API_URL}${url}`).then((res) => res.data);
