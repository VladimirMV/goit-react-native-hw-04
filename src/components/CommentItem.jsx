import { StyleSheet, View, Image, Text, Dimensions } from 'react-native';
// import Avvvatars from 'avvvatars-react'
const CommentItem = ({ autorAvatar, comment, date }) => {
  return (
    <View style={styles.commentItem}>
      <Image style={styles.avatar} source={require("../assets/img/avatar3.jpg")}/>
      {/* <Avvvatars value="best_user@gmail.com" /> */}
      <View style={styles.commentWrapper}>
        <Text style={styles.commentText}>{comment}</Text>
        <Text style={styles.commentDate}>{date}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  commentItem: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,

    marginRight: 16,

    backgroundColor: '#f6f6f6',
    borderRadius: 100,
    overflow: 'hidden',
  },
  commentWrapper: {
    padding: 16,
    width: '100%',

    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 6,

    width: Dimensions.get('window').width - 76,
  },
  commentText: {
    fontFamily: 'Roboto',
    fontSize: 13,
    lineHeight: 18,
    color: '#212121',
  },
  commentDate: {
    fontFamily: 'Roboto',
    fontSize: 10,
    textAlign: 'right',
    color: '#BDBDBD',
  },
});
