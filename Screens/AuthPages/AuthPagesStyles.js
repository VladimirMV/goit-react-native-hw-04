import { Dimensions, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgContainer: {
    width: '100%',
    height: '100%',

    flexDirection: 'row',
    alignItems: 'flex-end',

    resizeMode: 'cover',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  keyboardView: {
    width: '100%',
  },
  contentWrapper: {
    paddingHorizontal: 16,

    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    height: '60.22%',
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
  passWrapper: {
    marginBottom: 323,
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
  },
  linkTextUnderline: {
    textDecorationLine: 'underline',
  },
});

export const {
  container,
  bgContainer,
  keyboardView,
  contentWrapper,
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
} = styles;
