import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

interface ContextPros {
  isAuthenticated: boolean;
  user: any;
  login: () => void;
  logout: () => void;
}

interface ProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<Partial<ContextPros>>({});

const AuthProvider = ({ children }: ProviderProps): JSX.Element => {
  const act = localStorage.getItem("act");
  const [isAuthenticated, setIsAuthenticated] = useState(!!act);
  const [user, setUser] = useState({});

  const login = useCallback(() => {
    // Do something...

    setIsAuthenticated(true);
    setUser({ name: "Welly " });
    localStorage.setItem("act", "123");
  }, []);

  const logout = useCallback(() => {
    // Do something...

    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem("act");
  }, []);

  const value = useMemo(() => ({ isAuthenticated, user, login, logout }), [
    isAuthenticated,
    user,
    login,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): Partial<ContextPros> => useContext(AuthContext);

export { AuthProvider, useAuth };
