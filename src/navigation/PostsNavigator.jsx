import { createStackNavigator } from "@react-navigation/stack";
import MainPostsScreen from "../Screens/MainPostsScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import { StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

const PostNavigator = ({ navigation }) => {
  return (
    <NestedScreen.Navigator
      initialRouteName="MainPosts"
      screenOptions={{ headerShown: false }}
    >
      <NestedScreen.Screen name="MainPosts" component={MainPostsScreen} />

      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          ...screenOptions,
         headerTitleAlign: 'center',
         tabBarStyle: { display: "none" },
         marginLeft:6,
          title: "Коментарі",
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              onPress={() => navigation.navigate("MainPosts")}
              title="Return back"
              color="#212121"
              style={styles.arrowLeft}
              
            />
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          ...screenOptions,
          headerTitleAlign: 'center',
          title: "Карта",
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              onPress={() => navigation.navigate("MainPosts")}
              title="Return back"
              color="#212121"
              style={styles.arrowLeft}
            />
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

export default PostNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  arrowLeft: {
    marginLeft: 16,
    marginRight: 0,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

const screenOptions = {
  headerShown: true,
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
  headerTintColor: "#212121",
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,

    textAlign: "center",
  },
};
