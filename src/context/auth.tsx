import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

interface Props {
  children: ReactNode;
}

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const act = localStorage.getItem("act");
  const [isAuthenticated, setIsAuthenticated] = useState(!!act);
  const [user, setUser] = useState({});

  const login = useCallback(() => {
    // ...

    setIsAuthenticated(true);
    setUser({ name: "Welly " });
    localStorage.setItem("act", "123");
  }, [setIsAuthenticated]);

  const logout = useCallback(() => {
    // ...

    setIsAuthenticated(false);
    setUser({});
    localStorage.removeItem("act");
  }, [setIsAuthenticated]);

  const value = useMemo(() => ({ isAuthenticated, user, login, logout }), [
    isAuthenticated,
    user,
    login,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
