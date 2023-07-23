import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import PostScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

import SvgArrowLeft from "../assets/svg/SvgArrowLeft";
import SvgLogOut from "../assets/svg/SvgLogOut";

import SvgGrid from "../assets/svg/SvgGrid";
import SvgNew from "../assets/svg/SvgNew";
import SvgUser from "../assets/svg/SvgUser";
import { TouchableOpacity } from "react-native";

const ButtomTabs = createBottomTabNavigator();

const Home = () => {
  console.log("home сработал");
  return (
    <ButtomTabs.Navigator
      // Настройки для всей нижней панели
      screenOptions={() => ({
        tabBarActiveTintColor: "#ff6c00",
        tabBarInactiveTintColor: "#212121",
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
            height: 64,
            paddingTop: 10,
            paddingBottom: 20,
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          },
          null,
        ],
      })}
    >
      {/* Первый экран - "Posts" */}
      <ButtomTabs.Screen
        name="Posts"
        component={PostScreen}
        options={({ navigation }) => ({
          ...postsOptions,
          headerRight: () => (
            <SvgLogOut
              onPress={() => navigation.navigate("Login")}
              title="Return back"
              color="#fff"
              style={styles.logOut}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.btnTab} />
          ),
          tabBarIcon: ({ color }) => {
            return <SvgGrid stroke={color} />;
          },
        })}
      />
      {/* Второй экран - "CreatePosts" */}
      <ButtomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation, route }) => ({
          ...createPostsOptions,
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => {
                navigation.navigate("Posts");
              }}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                backgroundColor: "#ff6c00",
              }}
            />
          ),
          tabBarIcon: () => {
            return <SvgNew fill={"#ffffff"} focused={"boolean"} />;
          },
        })}
      />

      {/* Третий экран - "Profile" */}
      <ButtomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation, route }) => ({
          ...createPostsOptions,
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => navigation.navigate("Posts")}
              title="Return back"
              color="#fff"
              style={styles.arrowLeft}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                ...styles.btnTab,
                marginRight: 0,
              }}
            />
          ),
          tabBarIcon: ({ focused, color, size }) => {
            return <SvgUser size={size} fill={color} />;
          },
        })}
      />
    </ButtomTabs.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({
  arrowLeft: {
    marginLeft: 16,
    marginRight: 42,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 60,
    marginRight: 16,
    paddingVertical: 10,
  },
  btnTab: {
    alignSelf: "center",
    marginRight: 30,
    width: 70,
    height: 40,

    paddingVertical: 8,
    paddingHorizontal: 8,

    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
});

const createPostsOptions = {
  title: "Створити публікацію",
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

const postsOptions = {
  title: "Публікації",
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

    marginLeft: 120,

    textAlign: "center",
  },
};
