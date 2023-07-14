import {useState } from 'react';
import {  StyleSheet } from 'react-native';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import backgroundImg from '../assets/img/background.jpg';

const LoginScreen = () => {
  const [currentFocused, setCurrentFocused] = useState('');
  const [isSecureText, setIsSecureText] = useState(true);
  const keyboardVerticalOffset = -220;
  const handleFocus = (currentFocusInput = '') => {
 
    setCurrentFocused(currentFocusInput);
  };

  const handleKeyboardHide = () => {
    setCurrentFocused('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
       <ImageBackground source={backgroundImg} style={styles.bgContainer}>
      <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
          keyboardVerticalOffset = {keyboardVerticalOffset}
            > 
       
           <View style={styles.contentWrapper}>
            
              <Text style={styles.title}>Увійти</Text>
              <TextInput
                 style={[styles.input, currentFocused === 'email' && styles.inputFocused]}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#bdbdbd"
              autoComplete="email"
              autoCapitalize="none"
              onFocus={() => handleFocus('email')}
              />
             <View
              style={styles.passWrapper}>
                <TextInput
                  style={[styles.input, currentFocused === 'password' && styles.inputFocused]}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                autoComplete="password"
                autoCapitalize="none"
                onFocus={() => handleFocus('password')}
                secureTextEntry={isSecureText}
                />
                <TouchableOpacity style={styles.btnPassShow}>
                  <Text style={styles.btnPassShowText}>Показати</Text>
                </TouchableOpacity>
              </View>
            

        
              <View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                  <Text style={styles.linkText}>
                    Немає акаунту? <Text style={styles.linkTextUnderline}>Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
              </View>
          
          </View>
        
        </KeyboardAvoidingView>
        </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
 keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
},

  bgContainer: {
     flex: 1,
    width: '100%',
   resizeMode: 'cover',
  },

  contentWrapper: {
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',

    marginTop: 32,
    marginBottom: 32,
    color: '#212121',
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 16,
    marginBottom: 16,

    color: '#212121',
    backgroundColor: '#f6f6f6',

    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
  },
  inputLast: {
    marginBottom: 0,
  },
  inputFocused:{
    backgroundColor:'#ffffff',
    borderColor: '#ff6c00'
  },
  passWrapper: {
    marginBottom: 43,
  },
  btnPassShow: {
    position: 'absolute',
    right: 0,
    top: 0,
    alignSelf: 'center',

    padding: 16,

    backgroundColor: 'transparent',
  },
  btnPassShowText: {
    color: '#1B4371',
  },

  btn: {
    alignItems: 'center',
    padding: 16,

    backgroundColor: '#ff6c00',
    borderRadius: 100,
  },
  btnText: {
    color: '#ffffff',
  },

  link: {
    alignItems: 'center',

    marginTop: 16,
    marginBottom: 111,
  },
  linkText: {
    color: '#1B4371',
  },
  linkTextUnderline: {
    textDecorationLine: 'underline',
  },
});