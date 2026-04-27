
import Toast from '@components/CToast';
import {QueryClient} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      },
    },
  },
});
