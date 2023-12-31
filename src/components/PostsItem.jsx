import SvgComment from "../assets/svg/SvgComment";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const PostsItem = ({ postImg, postName, postAddress, postLocation }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.postItem}>
      {/* Display the post image */}
      <Image style={styles.postImg} source={{ uri: postImg }} />

      <Text style={styles.postTitle}>{postName}</Text>

      <View style={{ ...styles.postsAdditionWrapper, ...styles.directionRow }}>
        {/* Button to navigate to the "Comments" screen */}
        <TouchableOpacity
          style={{ ...styles.comment, ...styles.directionRow }}
          onPress={() => navigation.navigate("Comments", { postImg })}
        >
          {/*  icon for comments */}
          <Feather name="message-circle" size={24} color={"#BDBDBD"} />

          <Text style={styles.commentText}>Comments</Text>
        </TouchableOpacity>

        {/* Button to navigate to the "Map" screen */}
        <TouchableOpacity
          style={{ ...styles.location, ...styles.directionRow }}
          onPress={() => navigation.navigate("Map", { postLocation })}
        >
          <Feather
            name="map-pin"
            size={24}
            color={postLocation ? "#ff6c00" : "#bdbdbd"}
          />

          <Text style={styles.locationText}>{postAddress}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PostsItem;

const styles = StyleSheet.create({
  //post
  // postsWrapper: {
  //   paddingTop: 32,
  // },
  postItem: {
    marginBottom: 32,
  },
  postImg: {
    height: 240,
    

    marginBottom: 8,

    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  postTitle: {
    fontFamily: "Roboto",
    fontWeight: 500,
    fontSize: 16,

    marginBottom: 8,

    color: "#212121",
  },
  directionRow: {
    flexDirection: "row",
  },
  postsAdditionWrapper: {
    justifyContent: "space-between",
  },
  commentText: {
    fontFamily: "Roboto",
    fontSize: 16,
    marginLeft: 6,

    color: "#bdbdbd",
  },
  locationText: {
    fontFamily: "Roboto",
    fontSize: 16,
    textDecorationLine: "underline",

    marginLeft: 4,

    color: "#212121",
  },
});
