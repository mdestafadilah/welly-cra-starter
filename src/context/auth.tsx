import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

interface Fn {
  (cb: () => void): void;
}

export interface ContextPros {
  isAuthenticated: boolean;
  login: Fn;
  logout: Fn;
}

interface ProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<Partial<ContextPros>>({});

const AuthProvider = ({ children }: ProviderProps): JSX.Element => {
  const act = localStorage.getItem("act");
  const [isAuthenticated, setIsAuthenticated] = useState(!!act);

  const login = useCallback((cb) => {
    setIsAuthenticated(true);
    localStorage.setItem("act", "123");

    if (cb) cb();
  }, []);

  const logout = useCallback((cb) => {
    // Do something...

    setIsAuthenticated(false);
    localStorage.removeItem("act");

    if (cb) cb();
  }, []);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [
    isAuthenticated,
    login,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): Partial<ContextPros> => useContext(AuthContext);

export { AuthProvider, useAuth };
