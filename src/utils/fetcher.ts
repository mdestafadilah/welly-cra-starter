import axios, { AxiosPromise } from "axios";

import config from "../configs";

export default (url: string): AxiosPromise =>
  axios(`${config.API_URL}${url}`).then((res) => res.data);
