import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { useFont } from '../hooks/useFont';

export default function KeyboardContainer({ children, style = {}, keyboardStyle = {} }) {
  const { isReady, onLayoutRootView } = useFont();

  if (!isReady) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      style={[{ flex: 1, maxHeight: '100%' }, keyboardStyle]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[{flex: 1}, style]} onLayout={onLayoutRootView}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/*<View style={{flex: 1}}>*/}
          {children}
          {/*</View>*/}
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}
