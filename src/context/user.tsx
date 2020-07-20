import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";

interface Val {
  lang: string;
  setLang: (lang: string) => void;
}

interface Props {
  children: ReactNode;
}

const UserContext = createContext<Partial<Val>>({});

const UserProvider = ({ children }: Props): JSX.Element => {
  const savedLang = localStorage.getItem("lang");
  const locale = navigator.languages[0].split("-")[0];
  const [language, setLanguage] = useState(savedLang || locale || "en");

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

const useUser = (): Partial<Val> => useContext(UserContext);

export { UserProvider, useUser };
