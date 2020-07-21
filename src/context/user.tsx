import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

export interface ContextPros {
  lang: string;
  setLang: (lang: string) => void;
}

interface ProviderProps {
  children: ReactNode;
}

const UserContext = createContext<Partial<ContextPros>>({});

const UserProvider = ({ children }: ProviderProps): JSX.Element => {
  const savedLang = localStorage.getItem("lang");
  const browserLang = navigator.language.split("-")[0];
  const [language, setLanguage] = useState(savedLang || browserLang || "en");

  const setLang = useCallback((lang: string) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  }, []);

  const value = useMemo(() => ({ lang: language, setLang }), [
    language,
    setLang,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = (): Partial<ContextPros> => useContext(UserContext);

export { UserProvider, useUser };