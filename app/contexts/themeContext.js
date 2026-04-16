import React, {createContext, useContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import {DefaultTheme, DarkTheme} from '@react-navigation/native';
import {colors} from '@config/theme';

const LightTheme = {
  ...DefaultTheme,
  colors: colors?.lightThem,
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: colors?.darkThem,
};

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(
    Appearance.getColorScheme() === 'dark',
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setIsDarkTheme(colorScheme === 'dark');
    });

    return () => listener.remove();
  }, []);

  const theme = isDarkTheme ? 'dark' : 'light';
  const colorScheme = isDarkTheme ? CustomDarkTheme : LightTheme;
  const color = isDarkTheme ? CustomDarkTheme.colors : LightTheme.colors;

  return (
    <ThemeContext.Provider value={{theme, colorScheme, color}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
