import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SvgArrowLeft from "../assets/svg/SvgArrowLeft";
import SvgLogOut from "../assets/svg/SvgLogOut";
import SvgGrid from "../assets/svg/SvgGrid";
import SvgNew from "../assets/svg/SvgNew";
import SvgUser from "../assets/svg/SvgUser";
import SvgTrash from "../assets/svg/SvgTrash";
import PostScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";

const ButtomTabs = createBottomTabNavigator();

const Home = () => {
  return (
    <ButtomTabs.Navigator
      // Settings for the entire bottom tab bar
      id="home"
      screenOptions={{
        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ff6c00",
        tabBarInactiveTintColor: "#212121",
      }}
    >
      {/* First screen - "Posts" */}
      <ButtomTabs.Screen
        name="Posts"
        component={PostScreen}
        options={({ navigation }) => ({
          title: "Posts",
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

      {/* Second screen - "CreatePosts" */}
      <ButtomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          title: "Create a post",
          headerLeft: () => (
            <SvgArrowLeft
              onPress={() => {
                navigation.goBack();
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
          tabBarIcon: ({ focused }) => {
            return focused ? (
              <SvgTrash style={styles.btnSvgTrash} />
            ) : (
              <SvgNew fill={"#ffffff"} />
            );
          },
        })}
      />

      {/* Third screen - "Profile" */}
      <ButtomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
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
    marginRight: 16,
    paddingVertical: 10,
  },
  btnTab: {
    alignSelf: "center",
    alignItems: "center",

    marginRight: 30,
    width: 70,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  btnSvgTrash: {
    stroke: "#dbdbdb",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default Home;
