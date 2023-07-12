import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
  btnAddAvatarSvg: {
    fill: '#ff6c00',
    stroke: '#ff6c00',
    backgroundColor: '#ffffff',
  },
  btnAddAvatarSvgLoad: {
    fill: '#bdbdbd',
    stroke: '#e8e8e8',
    backgroundColor: '#ffffff',
  },
});

export const {
  avatarWrapper,
  avatar,
  btnAddAvatar,
  btnAddAvatarLoad,
  btnAddAvatarSvg,
  btnAddAvatarSvgLoad,
} = styles;
