import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import PostScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Feather } from "@expo/vector-icons";

import SvgNew from "../assets/svg/SvgNew";

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
          alignContent: "center",
          justifyContent: "center",
          headerShown: false,
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
          ...postsOptions,

          headerRight: () => (
            <Feather
              name="log-out"
              size={24}
              onPress={() => navigation.navigate("Login")}
              title="Return back"
              color="#BDBDBD"
              style={styles.logOut}
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} style={styles.btnTab} />
          ),
          tabBarIcon: ({ color }) => {
            return (
              <Feather
                name="grid"
                size={24}
                stroke={color}
                style={styles.btnGrid}
              />
            );
          },
        })}
      />

      {/* Second screen - "CreatePosts" */}
      <ButtomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={({ navigation }) => ({
          tabBarStyle: { display: "none" },
          ...createPostsOptions,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
              onPress={() => {
                navigation.goBack();
              }}
              title="Return back"
              headerIconColor="#212121"
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
              <Feather name="trash-2" style={styles.btnTrash} />
            ) : (
              <SvgNew fill={"#ffffff"} paddingHorizontal={30} />
            );
          },
        })}
      />

      {/* Third screen - "Profile" */}
      <ButtomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          ...createPostsOptions,
          // headerShown: false,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              size={24}
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
            return <Feather name="user" size={size} fill={color} />;
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
    color: "#212121",
    // paddingVertical: 10,
  },
  logOut: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  btnTab: {
    alignSelf: "center",
    marginRight: 30,
    width: 40,
    height: 40,
    color: "#212121",
    paddingVertical: 8,
    paddingHorizontal: 30,

    backgroundColor: "#ffffff",
    borderRadius: 20,
  },
  btnTrash: {
    color: "#dbdbdb",
    alignSelf: "center",
    alignItems: "center",
  },
  btnGrig: {
    color: "#212121",
  },
  btnNew: {
    paddingHorizontal: 22,
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
  headerIconColor: "#212121",

  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    marginLeft: -20,
    textAlign: "center",
  },
};

const postsOptions = {
  title: "Публікації ",
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

export default Home;
