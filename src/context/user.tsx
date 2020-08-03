import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

import config from "../config";

export interface ContextProps {
  name: string;
  lang: string;
  setLang: (lang: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const UserContext = createContext<Partial<ContextProps>>({});

const UserProvider = ({ children }: ProviderProps): JSX.Element => {
  const savedLang = localStorage.getItem("lang");
  const [browserLang] = navigator.language.split("-");
  const [language, setLanguage] = useState(
    savedLang || browserLang || config.DEFAULT_LANG
  );

  const setLang = useCallback((lang: string) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  }, []);

  const value = useMemo(() => ({ name: "Welly", lang: language, setLang }), [
    language,
    setLang,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = (): Partial<ContextProps> => useContext(UserContext);

export { UserProvider, useUser };
