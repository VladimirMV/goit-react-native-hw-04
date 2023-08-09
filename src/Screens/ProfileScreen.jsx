import { ImageBackground,StatusBar } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { StyleSheet, View, Image, Text, FlatList,ScrollView, } from 'react-native';
import backgroundImg from '../assets/img/background.jpg';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PostsItem from "../components/PostsItem";
import {useEffect, useState } from 'react';

const ProfileScreen = ({ route }) => {
  const [avatar, setAvatar] = useState(null);
   const [posts, setPosts] = useState([
    {
      id: "nbnvbc47hth",
      postImg: 'https://vjoy.cc/wp-content/uploads/2019/10/665x495_0xac120003_3834654781562610948.jpg',
      postName: "Test post",
      postAddress: "Kiev, Ukraine",
      postLocation: { latitude: 0, longitude: 0 },
     },
      {
      id: "nbnvbc47htgdgfh",
      postImg: 'https://vjoy.cc/wp-content/uploads/2019/10/1547368009_2.jpg',
      postName: "Test post",
      postAddress: "Kiev, Ukraine",
      postLocation: { latitude: 0, longitude: 0 },
     },
      {
      id: "nbnvbc47htgdgfhgfhfhh",
      postImg: 'https://vjoy.cc/wp-content/uploads/2019/10/great-smoky-mountains-np-37-cades-cove.jpg',
      postName: "Test post",
      postAddress: "Kiev, Ukraine",
      postLocation: { latitude: 0, longitude: 0 },
    },
   ]);
//   console.log(route.params);
// useEffect(() => {
//     if (!route.params) return;

//     // Add the new route params to the existing posts array
//     setPosts((prev) => [...prev, route.params]);
//   }, [route.params]);
//  console.log("posts",posts);
  const onLoadAvatar = async () => {
    const avatarImg = await DocumentPicker.getDocumentAsync({
      type: 'image/*',
    });

    if (avatarImg.type === 'cancel') return setAvatar(null);

    setAvatar(avatarImg);
  };

  return (
    <ImageBackground source={backgroundImg} style={styles.bgContainer}>
  
      <View style={styles.container}>
       
        <ScrollView showsVerticalScrollIndicator={false}>
           
          <View style={styles.contentWrapper}>
            {/* <TouchableOpacity onPress={signOut}> */}
                <Feather name="log-out" size={24} color="#BDBDBD" marginLeft={320} marginTop={22} />
           {/* </TouchableOpacity> */}
          <View style={styles.avatarWrapper}>
            <Image style={styles.avatar}
              // source={avatar} />
            source={require("../assets/img/avatar4.jpg")}/>
            <TouchableOpacity
              style={avatar ? styles.btnAddAvatarLoad : styles.btnAddAvatar}
              onPress={onLoadAvatar}
            >
              <Feather name="plus-circle" size={25} color={avatar ? '#e8e8e8' : '#ff6c00'}
                backgroundColor={'transparent'} fill={'#bdbdbd'}        
                />
            </TouchableOpacity>
          </View>
          <View>
          <Text style={{ ...styles.title, marginTop: 92 }}>Name</Text>
        </View>
          {/* FlatList to display the posts */}
              <StatusBar hidden />
            <FlatList
              style={styles.postsWrapper}
              data={posts}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) =>
                // Render the PostsItem component only if postName exists
                item.postName && (
                  <PostsItem
                    postName={item.postName}
                    postImg={item.postImg}
                    postAddress={item.postAddress}
                    postLocation={item.postLocation}
                  />
                )
                  }
                  keyExtractor={(item, idx) => idx.toString()} // Use the index as the key for each item
             />

       {/* Additional View for navigation tabs */}
        <View style={styles.navTabs}></View>
          </View>
        </ScrollView>
         </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    //  paddingVertical: 32,
    // backgroundColor: '#fff',
    // justifyContent: "flex-end"
  },

  bgContainer: {
   
    flex: 1,
    width: '100%',
    // justifyContent: "flex-start"
  },

  contentWrapper: {
    paddingHorizontal: 16,

    width: '100%',
    height: '100%',
    marginTop: 120,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  postsWrapper: {
    marginBottom: 120,
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
