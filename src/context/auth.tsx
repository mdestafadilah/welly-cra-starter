import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

export interface Fn {
  (cb?: () => void): void;
}

interface ContextProps {
  isAuthenticated: boolean;
  login: Fn;
  logout: Fn;
}

interface ProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<Partial<ContextProps>>({});

const AuthProvider = ({ children }: ProviderProps): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());

  const login = useCallback((cb) => {
    // Do something...

    setIsAuthenticated(true);
    setToken("123");
    if (cb) cb();
  }, []);

  const logout = useCallback((cb) => {
    // Do something...

    setIsAuthenticated(false);
    removeToken();
    if (cb) cb();
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [
    isAuthenticated,
    login,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): ContextProps => useContext(AuthContext) as ContextProps;

const KEY = "act";
const getToken = (): string | null => localStorage.getItem(KEY);
const setToken = (val: string): void => localStorage.setItem(KEY, val);
const removeToken = (): void => localStorage.removeItem(KEY);

export { AuthProvider, useAuth, getToken };
