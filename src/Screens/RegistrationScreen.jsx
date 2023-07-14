import { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
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

;
import backgroundImg from '../assets/img/background.jpg';
import { AntDesign } from '@expo/vector-icons';



const RegistrationScreen = () => {

   const [avatar, setAvatar] = useState(null);
  const [currentFocused, setCurrentFocused] = useState('');
  const [isSecureText, setIsSecureText] = useState(true);
   const keyboardVerticalOffset = -160;
   const handleFocus = (currentFocusInput = '') => {
    setCurrentFocused(currentFocusInput);
  };

  const handleKeyboardHide = () => {
    setCurrentFocused('');
    Keyboard.dismiss();
  };
  const onLoadAvatar = async () => {
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });

    if (avatarImg.type === 'cancel') return setAvatar(null);

    setAvatar(avatarImg);
  };


  return (
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <ImageBackground source={backgroundImg} style={styles.bgContainer}>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           keyboardVerticalOffset = {keyboardVerticalOffset}
              style={styles.keyboardView}
            >
      
          <View style={styles.contentWrapper}>
            <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={avatar} />
              <TouchableOpacity
                style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
                onPress={onLoadAvatar}
              >
                <AntDesign name="pluscircleo" size={25} color={avatar ? '#e8e8e8' : '#ff6c00'}
                backgroundColor={'transparent'} fill={'#bdbdbd'}        
                />
              </TouchableOpacity>
            </View> 
            <Text style={{ ...styles.title, marginTop: 92 }}>Реєстрація</Text>
            
            <TextInput
              style={[styles.input, currentFocused === 'login' && styles.inputFocused]}
              placeholder="Логін"
              placeholderTextColor="#bdbdbd"
              autoComplete="username"
              autoCapitalize="none"
              onFocus={() => handleFocus('login')}
            />
              <TextInput
              style={[styles.input, currentFocused === 'email' && styles.inputFocused]}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#bdbdbd"
              autoComplete="email"
              autoCapitalize="none"
               onFocus={() => handleFocus('email')}
              />
              <View
              style={styles.passWrapper}
            >
                <TextInput
                style={[styles.input, currentFocused === 'password' && styles.inputFocused]}
                placeholder="Пароль"
                placeholderTextColor="#bdbdbd"
                autoComplete="password"
                autoCapitalize="none"
                secureTextEntry={isSecureText}
                 
                  onFocus={() => handleFocus('password')}
                />
                <TouchableOpacity style={styles.btnPassShow}>
                  <Text style={styles.btnPassShowText}>Показати</Text>
                </TouchableOpacity>
              </View>
            
 
              <View>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link}>
                  <Text style={styles.linkText}>
                    Вже є акаунт? <Text style={styles.linkTextUnderline}>Увійти</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            
          </View>
        </KeyboardAvoidingView>
        </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;
const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    width: '100%',
  justifyContent: "flex-end"
},


  bgContainer: {
     flex: 1,
    width: '100%',

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
  inputFocused:{
    backgroundColor:'#ffffff',
    borderColor: '#ff6c00'
  },
  
  inputLast: {
    marginBottom: 0,
  },
  passWrapper: {
    marginBottom: 40,
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
  },
  linkText: {
    color: '#1B4371',
    marginBottom: 45,
  },
  linkTextUnderline: {
    textDecorationLine: 'underline',
  },

  //
  avatarWrapper: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',

    width: 120,
    height: 120,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btnAddAvatar: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,

    alignItems: 'center',
    alignContent: 'center',

    width: 25,
    height: 25,

    color: '#ff6c00',
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  btnAddAvatarLoad: {
    position: 'absolute',
    bottom: 14,
    right: -12.5,

    alignItems: 'center',
    alignContent: 'center',

    width: 25,
    height: 25,

    color: '#ff6c00',
    backgroundColor: '#ffffff',
    borderRadius: 50,

    transform: [{ rotate: '45deg' }],
  },
  
});