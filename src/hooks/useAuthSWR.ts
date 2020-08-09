import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import useSWR, {
  ConfigInterface,
  responseInterface as ResponseInterface,
} from "swr";

import { getToken, useAuth, ContextProps } from "../context/auth";
import config from "../config";

interface AuthFetcher {
  (url: string, config?: AxiosRequestConfig): Promise<
    AxiosResponse | AxiosError
  >;
}

export const authFetcher: AuthFetcher = async (
  url,
  { method = "get", headers, ...rest } = {}
) => {
  try {
    const { data } = await axios({
      method,
      url: `${config.API_URL}${url}`,
      headers: { Authorization: `Bearer ${getToken()}`, ...headers },
      ...rest,
    });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

interface Opts extends ConfigInterface {
  disableAuthErrorHandling?: boolean;
}

type Args = [string, (AuthFetcher | Opts)?, Opts?];

export default <T = any>(...args: Args): ResponseInterface<T, Error> => {
  const { logout } = useAuth() as ContextProps;
  const [arg1, arg2, arg3] = args;
  const fetcher = typeof arg2 === "function" ? arg2 : authFetcher;
  const opts = arg3 || (typeof arg2 !== "function" && arg2) || {};
  const res = useSWR(arg1, fetcher, {
    onError: (error) => {
      if (!opts.disableAuthErrorHandling && error.response?.status === 401) {
        console.error("> useAuthSWR: 401 Unauthorized");
        logout();
      }
    },
    ...opts,
  });

  return res;
};
