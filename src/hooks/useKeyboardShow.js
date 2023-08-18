import { Keyboard } from 'react-native';
import { useEffect, useState } from 'react';

export const useKeyboardShow = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setIsShowKeyboard(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsShowKeyboard(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return {isShowKeyboard, setIsShowKeyboard, keyboardHeight};
};
