import { createContext, ReactNode, useContext, useState } from "react";

type Locale = "vi" | "en";

interface I18nContextProps {
    locale: Locale;
    setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextProps>({
    locale: "vi",
    setLocale: () => {},
});

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [locale, setLocale] = useState<Locale>("vi");
    return(
        <I18nContext.Provider value={{ locale, setLocale }}>
            {children}
        </I18nContext.Provider>
    )
};

export const useI18n = () => useContext(I18nContext);