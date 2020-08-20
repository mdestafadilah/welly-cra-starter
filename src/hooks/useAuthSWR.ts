import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import useSWR, {
  ConfigInterface,
  responseInterface as ResponseInterface,
} from "swr";

import { Fn, getToken, useAuth } from "../context/auth";
import config from "../config";

interface FetcherConfig extends AxiosRequestConfig {
  logout?: Fn | false;
}

interface Fetcher {
  <T>(url: string, config?: FetcherConfig): AxiosPromise<T>;
}

const authFetcher: Fetcher = async (
  url,
  { method = "get", headers, logout, ...rest } = {}
) => {
  try {
    const res = await axios({
      method,
      url: `${config.API_URL}${url}`,
      headers: { Authorization: `Bearer ${getToken()}`, ...headers },
      timeout: 10 * 1000,
      ...rest,
    });

    return res;
  } catch (error) {
    if (logout && error.response?.status === 401) {
      console.error("> authFetcher: 401 Unauthorized");
      logout();
    }

    throw error;
  }
};

interface HookOpts extends ConfigInterface {
  disableAuthErrorHandling?: boolean;
}

type HookArgs = [string, (Fetcher | HookOpts)?, HookOpts?];

type HookState = "loading" | "success" | "error";

interface HookReturn<T, E> extends ResponseInterface<T, E> {
  state: HookState;
}

const useAuthSWR = <T = any, E = Error>(
  ...args: HookArgs
): HookReturn<T, E> => {
  const [state, setState] = useState<HookState>("loading");
  const { logout } = useAuth();

  const [arg1, arg2, arg3] = args;
  const { disableAuthErrorHandling, ...opts } =
    arg3 || (typeof arg2 !== "function" && arg2) || {};
  const fetcher =
    typeof arg2 === "function"
      ? arg2
      : (url: string): AxiosPromise<T> =>
          authFetcher(url, { logout: !disableAuthErrorHandling && logout });
  const { error, data, ...rest } = useSWR<T, E>(arg1, fetcher as any, {
    ...opts,
  });

  useEffect(() => {
    setState("loading");
    if (error) setState("error");
    if (data) setState("success");
  }, [error, data]);

  return { state, error, data, ...rest };
};

export default useAuthSWR;
export { authFetcher };
export * from "swr";
