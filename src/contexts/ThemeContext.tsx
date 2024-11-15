import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeColor = 'orange' | 'blue';

type ThemeContextType = {
  isDark: boolean;
  themeColor: ThemeColor;
  toggleTheme: () => void;
  setThemeColor: (color: ThemeColor) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  const [themeColor, setThemeColor] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem('themeColor');
    return (saved as ThemeColor) || 'orange';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme-color', themeColor);
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, themeColor, toggleTheme, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}