import { KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { FlatList, Image, StyleSheet, Text, TextInput } from 'react-native';
import { View } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import CommentItem from '../components/CommentItem';
import { Keyboard } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { format } from "date-fns";
import { en } from "date-fns/locale";
import Avvvatars from 'avvvatars-react'

const CommentsScreen = ({ navigation, route: { params } }) => {
  const isFocused = useIsFocused();
const formatDate = (date) => {
  return format(Date.parse(date), "dd MMMM, yyyy | HH:mm:ss", {
    locale: en,
  });
  };
  // console.log(formatDate(new Date()));
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);


  useEffect(() => {
    const initialComments = [
      {
        autorAvatar: '',
        comment: 'Хорошая погода',
        date: formatDate(new Date()),
      },
    ];

    setComments(initialComments);

    if (isFocused) {
      navigation?.getParent('BottomNavigator')?.setOptions({
        tabBarStyle: { display: 'none' },
        headerShown: false,
      });
    }
  }, [isFocused]);

  useEffect(() => {
    navigation.setParams({ commentsCount: commentsCount });
  }, [commentsCount]);
  
  const handleAddComment = () => {
    // if (!commentText.trim()) return console.warn('Будь ласка напишіть коментар');
    const data = {
      autorAvatar: '',
      comment: commentText,
      date: formatDate(new Date()),
    };

    setComments(prev => [...prev, data]);
    handleKeyboardHide();
    setCommentText('');
  };

  const handleKeyboardHide = () => {
    Keyboard.dismiss();
  };

  return (
    // <TouchableWithoutFeedback onPress={handleKeyboardHide}>
      <View style={styles.container}>
        <Image style={styles.postImg} source={{ uri: params.postImg }} />
        <FlatList
        style={styles.commentList}
        showsVerticalScrollIndicator={false}
          data={comments}
          renderItem={({ item }) => (
            <CommentItem comment={item.comment} date={item.date} autorAvatar={item.autorAvatar} />
          )}
          keyExtractor={(item, idx) => idx.toString()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.inputCommentWrapper}>
            <TextInput
              style={styles.commentInput}
              placeholder="Коментувати..."
              placeholderTextColor="#bdbdbd"
              autoComplete="off"
              value={commentText}
              onChangeText={setCommentText}
            />
            <TouchableOpacity style={styles.commentBtn} onPress={handleAddComment}>
              <Feather
              name="arrow-up"
              size={30} style={styles.arrowUp} color = "#FFFFFF"  />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    // </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 32,


    backgroundColor: '#fff',
  },
  postImg: {
    height: 240,
    width: '100%',
    marginBottom: 28,

    backgroundColor: '#f6f6f6',

    borderRadius: 8,
  },
  commentList: {
   
   flex: 1,
    marginBottom: 28,
  },
  inputCommentWrapper: {},
  commentInput: {
    position: 'relative',
    width: '100%',
    height: 50,

    padding: 16,
   paddingBottom: 16,
    backgroundColor: '#f6f6f6',
     marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 100,
  },
  commentBtn: {
    position: 'absolute',
    right: 8,
    top: 4,

    paddingHorizontal: 6,
    paddingVertical: 6,
    backgroundColor: '#ff600c',

    borderRadius: 100,
  },

  arrowUp: {
    // height: 30,
    // width: 34,

   
  },
});
