import { FlatList, Image } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

import { useEffect, useState } from "react";
import PostsItem from "../components/PostsItem";

const MainPostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([
    {
      id: "",
      postImg: null,
      postName: "",
      postAddress: "",
      postLocation: { latitude: 0, longitude: 0 },
    },
  ]);
  // console.log("route.params", route.params);
  // useEffect hook to update posts when route.params changes
  useEffect(() => {
    if (!route.params) return;

    // Add the new route params to the existing posts array
    setPosts((prev) => [...prev, route.params]);
  }, [route.params]);

  return (
    <View style={styles.container}>
      {/* Profile section */}
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatarImg} />
        <View>
          <Text style={styles.avatarName}>Natali Romanova</Text>
          <Text style={styles.avatarEmail}>email@example.com</Text>
        </View>
      </View>

      {/* FlatList to display the posts */}
      <FlatList
        style={styles.postsWrapper}
        data={posts}
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
  );
};

export default MainPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 16,
    paddingTop: 32,

    backgroundColor: "#fff",
  },
  avatarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  avatarImg: {
    width: 60,
    height: 60,

    marginRight: 8,

    backgroundColor: "#f6f6f6",
    borderRadius: 16,
  },
  avatarName: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,

    color: "#212121",
  },
  avatarEmail: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,

    color: "rgba(33, 33, 33, 0.8)",
  },
});
