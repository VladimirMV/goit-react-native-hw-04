import { Image } from 'react-native';
import {  StyleSheet } from 'react-native';
import { Text, View } from 'react-native';

const PostScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, marginTop: 22 }}>Публікацїі</Text>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} />
        <View>
          <Text style={styles.avatarName}>Natali Romanova</Text>
          <Text style={styles.avatarEmail}>email@example.com</Text>
        </View>
      </View>
     
    </View>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingVertical: 32,

    backgroundColor: '#fff',
  },
  avatarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImg: {
    width: 60,
    height: 60,

    marginRight: 8,

    backgroundColor: '#f6f6f6',
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,

    color: '#212121',
  },
  avatarEmail: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,

    color: 'rgba(33, 33, 33, 0.8)',
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
});