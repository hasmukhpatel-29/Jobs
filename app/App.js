import {LogBox, StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MainStackNavigation} from '@navigation/mainStackNavigation';
import {colors} from './config/theme';
import {ThemeProvider} from 'app/contexts/themeContext';
import {ToastProvider} from 'app/contexts/toastContext';
import {ToastRefSetter} from '@components/CToast';
import {QueryClientProvider} from '@tanstack/react-query';
import {queryClient} from '@utils/queryClient';

const App = () => {
  // Ignore log notification by message:
  LogBox.ignoreLogs(['Warning: ...']);

  // Ignore all log notifications:
  LogBox.ignoreAllLogs();

  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <StatusBar
            translucent
            backgroundColor={colors.darkThem.transparent}
            barStyle={
              colorScheme === 'light' ? 'dark-content' : 'light-content'
            }
          />
          <SafeAreaProvider>
            <ToastProvider>
              <ToastRefSetter />
              <MainStackNavigation />
            </ToastProvider>
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

export default App;
