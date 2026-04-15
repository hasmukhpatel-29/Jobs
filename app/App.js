import {LogBox, StatusBar, useColorScheme,} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MainStackNavigation} from '@navigation/mainStackNavigation';
import {colors} from './config/theme';
import {ThemeProvider} from '@context/themeContext';

const App = () => {
  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...']);

  // Ignore all log notifications:
  LogBox.ignoreAllLogs();

  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <StatusBar
          translucent
          backgroundColor={colors.darkThem.transparent}
          barStyle={colorScheme === 'light' ? 'dark-content' : 'light-content'}
        />
        <SafeAreaProvider>
          <MainStackNavigation />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
