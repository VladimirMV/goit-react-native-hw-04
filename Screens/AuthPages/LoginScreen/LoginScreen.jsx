import { useEffect, useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  container,
  bgContainer,
  contentWrapper,
  keyboardView,
  title,
  input,
  inputLast,
  passWrapper,
  btnPassShow,
  btnPassShowText,
  btn,
  btnText,
  link,
  linkText,
  linkTextUnderline,
} from '../AuthPagesStyles';
import backgroundImg from '../../../assets/img/background.jpg';

const LoginScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };
  const handleKeyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={container}>
        <ImageBackground source={backgroundImg} style={bgContainer}>
          <View style={contentWrapper}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={keyboardView}
            >
              <Text style={title}>Увійти</Text>
              <TextInput
                style={{ ...input }}
                placeholder="Адреса електронної пошти"
                onFocus={handleFocus}
              />
              <View style={{ ...passWrapper, marginBottom: isShowKeyboard ? 323 : 43 }}>
                <TextInput
                  style={{ ...input, ...inputLast }}
                  placeholder="Пароль"
                  onFocus={handleFocus}
                />
                <TouchableOpacity style={btnPassShow}>
                  <Text style={btnPassShowText}>Показати</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>

            {!isShowKeyboard && (
              <View>
                <TouchableOpacity style={btn}>
                  <Text style={btnText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={link}>
                  <Text style={linkText}>
                    Немає акаунту? <Text style={linkTextUnderline}>Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
