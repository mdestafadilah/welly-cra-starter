import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

import config from "../config";

interface ContextProps {
  name: string;
  locale: string;
  setLocale: (val: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const UserContext = createContext<Partial<ContextProps>>({});

const UserProvider = ({ children }: ProviderProps): JSX.Element => {
  const savedLocale = localStorage.getItem("locale");
  const [browserLocale] = navigator.language.split("-");
  const [locale, updateLocale] = useState(
    config.DEFAULT_LOCALE || savedLocale || browserLocale
  );

  const setLocale = useCallback((val) => {
    updateLocale(val);
    localStorage.setItem("locale", val);
  }, []);

  const value = useMemo(() => ({ name: "Welly", locale, setLocale }), [
    locale,
    setLocale,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = (): ContextProps => useContext(UserContext) as ContextProps;

export { UserProvider, useUser };
