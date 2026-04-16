import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {clientStorage} from '../storage';

const useGlobalStore = create(
  persist(
    set => ({
      isAuthenticated: false,
      setIsAuthenticated: value => set({isAuthenticated: value}),
      userLoginData: null,
      setUserLoginData: response => set({userLoginData: response}),
      reset: () =>
        set({
          isAuthenticated: false,
          userLoginData: null,
        }),
    }),
    {
      name: 'global-app-storage',
      storage: createJSONStorage(() => clientStorage),
    },
  ),
);

export default useGlobalStore;
