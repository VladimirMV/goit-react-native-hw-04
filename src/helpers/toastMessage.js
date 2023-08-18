import Toast from 'react-native-toast-message';

export const toastError = (e) => {
  Toast.show({
    type: 'error',
    text1: 'Error:',
    text2: e.message,
  });
};
