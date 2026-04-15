import {createMMKV} from 'react-native-mmkv';

const storage = createMMKV({
  id: 'client',
});

export const clientStorage = {
  setItem: (key, value) => storage.set(key, value),
  getItem: key => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  getBoolean: key => storage.getBoolean(key),
  removeItem: key => storage.delete(key),
  clearAll: () => storage.clearAll(),
};
