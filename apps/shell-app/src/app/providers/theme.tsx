import React, { useCallback, useState } from "react";

export enum ThemeMode {
    Light = "Light",
    Dark = "Dark"
}

interface IThemeContext {
    theme: ThemeMode;
    changeTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = React.createContext<IThemeContext>(null);

export function useThemeContext() {
    const [theme, setTheme] = useState(() => {
        const sessionTheme = sessionStorage.getItem('theme');

        if (sessionTheme) {
            return sessionTheme as ThemeMode;
        }
        
        return ThemeMode.Light;
    });

    const themeContextValue: IThemeContext = {
        theme,
        changeTheme: useCallback((theme: ThemeMode) => {
            sessionStorage.setItem('theme', theme);
            setTheme(theme);
        }, [theme])
    };

  return themeContextValue;
}

interface Props {
    children: React.ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  const themeContextValue = useThemeContext();
  return <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>;
}