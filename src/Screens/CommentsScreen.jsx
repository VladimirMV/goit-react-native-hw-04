import { KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FlatList, Image, StyleSheet, Text, TextInput } from 'react-native';
import { View } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import CommentItem from '../components/CommentItem';
import { Keyboard } from 'react-native';
import { format } from "date-fns";
import { en } from "date-fns/locale";
import {useDispatch, useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import postsSelectors from '../redux/posts/postsSelectors';
import authSelectors from '../redux/auth/authSelectors';
import postOperation from '../redux/posts/postsOperation';
import KeyboardContainer from '../components/KeyboardContainer';

const CommentsScreen = ({ navigation, route: { params } }) => {

const formatDate = (date) => {
  return format(Date.parse(date), "dd MMMM, yyyy | HH:mm:ss", {
    locale: en,
  });
  };
//   // console.log(formatDate(new Date()));
//   const [commentText, setCommentText] = useState('');
//   const [comments, setComments] = useState([]);
//   const [allComments, setAllComments] = useState([]);
//   const [commentsCount, setCommentsCount] = useState(0);


//   useEffect(() => {
//     const initialComments = [
//       {
//         autorAvatar: '',
//         comment: 'Хорошая погода',
//         date: formatDate(new Date()),
//       },
//     ];

//     setComments(initialComments);

//     if (isFocused) {
//       navigation?.getParent('BottomNavigator')?.setOptions({
//         tabBarStyle: { display: 'none' },
//         headerShown: false,
//       });
//     }
//   }, [isFocused]);

//   useEffect(() => {
//     navigation.setParams({ commentsCount: commentsCount });
//   }, [commentsCount]);
  
//   const handleAddComment = () => {
//     // if (!commentText.trim()) return console.warn('Будь ласка напишіть коментар');
//     const data = {
//       autorAvatar: '',
//       comment: commentText,
//       date: formatDate(new Date()),
//     };

//     setComments(prev => [...prev, data]);
//     handleKeyboardHide();
//     setCommentText('');
//   };

  // const handleKeyboardHide = () => {
  //   Keyboard.dismiss();
  // };
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const route = useRoute();
  const { postId, imgUri } = route.params;
  const comments = useSelector(postsSelectors.getComments);
  const sortedComments = [...comments].sort(
    (a, b) => b.dateForSort - a.dateForSort
  );
  console.log('sortedComments::', sortedComments);
  const { userId } = useSelector(authSelectors.getUser);
  useEffect(() => {
    dispatch(postOperation.getAllCommentsByPostId(postId));

    return () => {
      dispatch(postOperation.getAllPosts());
      dispatch(postOperation.getOwnPosts());
    };
  }, [dispatch, postId]);

  const createPost = () => {
    dispatch(postOperation.addCommentByPostID(postId, comment));
    setComment('');
  };

  return (
    // <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <KeyboardContainer>
      <View style={s.container}>
        <FlatList
          style={{paddingHorizontal: 16}}
          data={sortedComments}
          ListHeaderComponent={
            <View style={{paddingVertical: 32}}>
              <Image
                style={s.image}
                source={{uri: imgUri}}
              />
            </View>}
          renderItem={({item}) => {
            const isOwner = item.authorId === userId;
            console.log('item::', item);
            return (
              <View style={[s.containerItem, {flexDirection: isOwner ? 'row-reverse' : 'row'}]}>
                <Image
                  source={{uri: item.userAvatar}}
                  style={[s.authorAvatar, {[isOwner ? 'marginLeft' : 'marginRight']: 16}]}
                />
                <View
                  style={[s.commentWrapper, {[isOwner ? 'borderTopRightRadius' : 'borderTopLeftRadius']: 0}]}
                >
                  <Text style={s.commentAuthor}>{item.comment}</Text>
                  <Text style={[s.commentDate, {textAlign: isOwner ? 'left' : 'right'}]}>
                    {item.date}
                  </Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 24 }}/>}
          ListEmptyComponent={<View style={{
            height: 50,
            backgroundColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
          }}><Text>У вас ще не має коментарів</Text></View>}
          ListFooterComponent={() => <View style={{ height: 30 }}/>}
        />
        <View
          style={s.containerFooter}
        >
          <View>
            <TextInput
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              style={s.commentInput}
            />
            <TouchableOpacity
              style={s.iconWrapper}
              onPress={createPost}
              activeOpacity={0.7}
            >
             <Feather
              name="arrow-up"
              size={30}  color = "#FFFFFF"  />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardContainer>
  );
}
export default CommentsScreen;
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
  },

  containerItem: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,

    backgroundColor: ' rgba(0, 0, 0, 0.03)',
    borderRadius: 16,
  },
  commentAuthor: {

    marginBottom: 8,

    // fontFamily: fontFamily.roboto400,
    fontSize: 13,
    lineHeight: 18,

    color: '#212121',
  },
  commentDate: {
    // fontFamily: fontFamily.roboto400,
    fontSize: 10,
    lineHeight: 12,

    color: '#BDBDBD',
  },

  containerFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,

    backgroundColor: '#FFFFFF',
  },
  commentInput: {
    position: 'relative',

    // fontFamily: fontFamily.inter500,
    height: 50,
    padding: 16,
    paddingRight: 50,

    fontSize: 16,
    lineHeight: 19,

    backgroundColor: '#F6F6F6',
    color: '#212121',

    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },
  iconWrapper: {
    position: 'absolute',
    right: 8,
    bottom: 8,

    width: 34,
    height: 34,
  },
});
