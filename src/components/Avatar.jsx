import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AddIcon from '../assets/svg/AddIcon';
import DeleteIcon from '../assets/svg/DeleteIcon';
import uploadPhotoToServer, {firebaseStore} from '../api/uploadPhotoToServer';
import {useDispatch, useSelector} from 'react-redux';
import authSelectors from '../redux/auth/authSelectors';
import authOperations from '../redux/auth/authOperations';

export default function Avatar({ avatarImg, setAvatarImg }) {
  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);

  const addImage = async () => {
    if (avatarImg) {
      dispatch(authOperations.authUpdateAvatar(''));
      setAvatarImg('');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   console.log("result ImagePicker",result);
    if (!result.canceled) {
      const photoUrl = await uploadPhotoToServer(result.assets[0].uri, firebaseStore.avatar);
      setAvatarImg(photoUrl);

      if (user.currentUser) {
        dispatch(authOperations.authUpdateAvatar(photoUrl));
      }
    }
  };

  return (
    <View style={st.container}>
      {avatarImg && <Image style={st.img} source={{uri: avatarImg}} />}
      <TouchableOpacity style={st.btn} onPress={addImage}>
        {!avatarImg ? <AddIcon /> : <DeleteIcon />}
      </TouchableOpacity>
    </View>
  );
}


const st = StyleSheet.create({
  container: {
    position: 'relative',
    width: 120,
    height: 120,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
  img: {
    // position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 16,
    resizeMode: 'cover',
  },
  btn: {
    position: 'absolute',
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },
});
