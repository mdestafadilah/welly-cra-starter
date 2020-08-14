import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import useSWR, {
  ConfigInterface,
  responseInterface as ResponseInterface,
} from "swr";

import { Fn, getToken, useAuth } from "../context/auth";
import config from "../config";

interface FetcherConfig extends AxiosRequestConfig {
  logout?: Fn | false;
}

type FetcherReturn = Promise<AxiosResponse | AxiosError>;

interface Fetcher {
  (url: string, config?: FetcherConfig): FetcherReturn;
}

const authFetcher: Fetcher = async (
  url,
  { method = "get", headers, logout, ...rest } = {}
) => {
  try {
    const { data } = await axios({
      method,
      url: `${config.API_URL}${url}`,
      headers: { Authorization: `Bearer ${getToken()}`, ...headers },
      timeout: 10 * 1000,
      ...rest,
    });

    return data;
  } catch (error) {
    if (logout && error.response?.status === 401) {
      console.error("> authFetcher: 401 Unauthorized");
      logout();
    }

    throw new Error(error);
  }
};

interface HookOpts extends ConfigInterface {
  disableAuthErrorHandling?: boolean;
}

type HookArgs = [string, (Fetcher | HookOpts)?, HookOpts?];

type HookState = "loading" | "success" | "error";

interface HookReturn<T> extends ResponseInterface<T, Error> {
  state: HookState;
}

const useAuthSWR = <T = any>(...args: HookArgs): HookReturn<T> => {
  const [state, setState] = useState<HookState>("loading");
  const { logout } = useAuth();

  const [arg1, arg2, arg3] = args;
  const { disableAuthErrorHandling, ...opts } =
    arg3 || (typeof arg2 !== "function" && arg2) || {};
  const fetcher =
    typeof arg2 === "function"
      ? arg2
      : (url: string): FetcherReturn =>
          authFetcher(url, { logout: !disableAuthErrorHandling && logout });
  const { error, data, ...rest } = useSWR(arg1, fetcher, { ...opts });

  useEffect(() => {
    if (error) setState("error");
    if (data) setState("success");
  }, [error, data]);

  return { state, error, data, ...rest };
};

export default useAuthSWR;
export { authFetcher };
export * from "swr";
