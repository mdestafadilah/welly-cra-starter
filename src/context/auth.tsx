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
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("act")
  );

  const login = useCallback(() => {
    // ...
    setIsAuthenticated(true);
    localStorage.setItem("act", "123");
  }, [setIsAuthenticated]);

  const logout = useCallback(() => {
    // ...
    setIsAuthenticated(false);
    localStorage.removeItem("act");
  }, [setIsAuthenticated]);

  const value = useMemo(() => ({ isAuthenticated, login, logout }), [
    isAuthenticated,
    login,
    logout,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
