import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet } from 'react-native';
import { authSignUpUser } from '../redux/auth/authOperations';
import * as ImagePicker from 'expo-image-picker';
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
import backgroundImg from '../assets/img/background.jpg';
import Avatar from '../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { authStateChange } from '../redux/auth/authSlice';
import authOperations from '../redux/auth/authOperations';
import { getStorage } from 'firebase/storage';
import {storage} from '../firebase/config';

const initValues = {
  email: '',
  password: '',
  nickname: '',
};
const initFocus = { email: false, password: false, nickname: false };

const RegistrationScreen = ( ) => {
  const navigation = useNavigation();
  const [isSecureText, setIsSecureText] = useState(true);
  const [values, setValues] = useState(initValues);
  const [hasFocus, setHasFocus] = useState(initFocus);
  const [avatarImg, setAvatarImg] = useState('');
  const [currentFocused, setCurrentFocused] = useState('');
  const keyboardVerticalOffset = -160;
  const dispatch = useDispatch();

   const onChangeText = (value, name) => {
    setValues(v => ({ ...v, [name]: value }));
  };
const onInputFocus = (name) => {
    setHasFocus(p => ({ ...p, [name]: true }));
  };
const handleFocus = (currentFocusInput = '') => {
    setCurrentFocused(currentFocusInput);
  };
  const onInputBlur = (name) => {
    setHasFocus(p => ({ ...p, [name]: false }));
  };

  const onSubmitUserRegister = async () => { 
    
    dispatch(authOperations.authRegister({...values, photoURL: avatarImg}));
    setValues(initValues);
  };

  
  const handleKeyboardHide = () => {
    setCurrentFocused('');
    Keyboard.dismiss();
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.bgContainer}>
    <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
           keyboardVerticalOffset = {keyboardVerticalOffset}
              style={styles.keyboardView}
            >
      
          <View style={styles.contentWrapper}>
            {/* <View style={styles.avatarWrapper}>
              <Image style={styles.avatar} source={avatar} />
              <TouchableOpacity
                style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
                onPress={onLoadAvatar}
              >
                <Feather name="plus-circle" size={25} color={avatar ? '#e8e8e8' : '#ff6c00'}
                backgroundColor={'transparent'} fill={'#bdbdbd'}        
                />
              </TouchableOpacity>
            </View>  */}

          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Avatar avatarImg={avatarImg} setAvatarImg={setAvatarImg} />
            </View>
          </View>

            <Text style={styles.title}>Реєстрація</Text>
            
            <TextInput
              style={[styles.input, currentFocused === 'nickname' && styles.inputFocused]}
              placeholder="Логін"
              placeholderTextColor="#bdbdbd"
              autoComplete="username"
              autoCapitalize="none"
              value={values.nickname}
              onChangeText={v => onChangeText(v, 'nickname')}
              onFocus={() => onInputFocus('nickname')}
              onBlur={() => onInputBlur('nickname')}
            />
              <TextInput
              style={[styles.input, currentFocused === 'email' && styles.inputFocused]}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#bdbdbd"
              autoComplete="email"
              autoCapitalize="none"
              value={values.email}
              onChangeText={v => onChangeText(v, 'email')}
              onFocus={() => onInputFocus('email')}
              onBlur={() => onInputBlur('email')}
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
                 value={values.password}
                onChangeText={v => onChangeText(v, 'password')}
                onFocus={() => onInputFocus('password')}
                onBlur={() => onInputBlur('password')}
                />
                 <TouchableOpacity
                style={styles.btnPassShow}
                onPress={() => password !== '' && setIsSecureText(prevState => !prevState)}
              >
                <Text style={styles.btnPassShowText}>Показати</Text>
              </TouchableOpacity>
              </View>
            
 
              <View>
                <TouchableOpacity style={styles.btn} onPress={onSubmitUserRegister}>
                  <Text style={styles.btnText}>Зареєструватися</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.linkText}>
                    Вже є акаунт? <Text style={styles.linkTextUnderline}>Увійти</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            
          </View>
        </KeyboardAvoidingView>
       
    </TouchableWithoutFeedback>
     </ImageBackground>
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
    // fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',

    marginTop: 92,
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
  // avatarWrapper: {
  //   position: 'absolute',
  //   top: -60,
  //   alignSelf: 'center',

  //   width: 120,
  //   height: 120,

  //   backgroundColor: '#f6f6f6',
  //   borderRadius: 16,
  // },
  // avatar: {
  //   width: 120,
  //   height: 120,
  //   borderRadius: 16,
  // },
  avatarWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    position: 'absolute',
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