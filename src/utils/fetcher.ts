import axios from "axios";
import conf from "../configs";

export default (url: string): any =>
  axios(`${conf.API_URL}${url}`).then((res) => res.data);
