import { useState, useEffect } from "react";
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

const authFetcher: AuthFetcher = async (
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

type State = "loading" | "success" | "error";

interface Return<T> extends ResponseInterface<T, Error> {
  state: State;
}

const useAuthSWR = <T = any>(...args: Args): Return<T> => {
  const [state, setState] = useState<State>("loading");
  const { logout } = useAuth() as ContextProps;

  const [arg1, arg2, arg3] = args;
  const fetcher = typeof arg2 === "function" ? arg2 : authFetcher;
  const { disableAuthErrorHandling, ...opts } =
    arg3 || (typeof arg2 !== "function" && arg2) || {};
  const { error, data, ...rest } = useSWR(arg1, fetcher, {
    onError: (err) => {
      if (!disableAuthErrorHandling && err.response?.status === 401) {
        console.error("> useAuthSWR: 401 Unauthorized");
        logout();
      }
    },
    ...opts,
  });

  useEffect(() => {
    if (error) setState("error");
    if (data) setState("success");
  }, [error, data]);

  return { state, error, data, ...rest };
};

export default useAuthSWR;
export { authFetcher };
export * from "swr";
