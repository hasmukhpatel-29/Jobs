import React from 'react';
import {useToastInternal} from 'app/contexts/toastContext';

let toastInstance = null;

const Toast = {
  setRef(ref) {
    toastInstance = ref;
  },
  show(options) {
    if (toastInstance) {
      toastInstance.show(options);
    }
  },
  hide() {
    if (toastInstance) {
      toastInstance.hide();
    }
  },
};

export default Toast;

export const ToastRefSetter = () => {
  const toast = useToastInternal();
  React.useEffect(() => {
    Toast.setRef(toast);
  }, [toast]);

  return null;
};
