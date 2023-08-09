import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import PostScreen from "../navigation/PostsNavigator";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { Feather,Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
// const navigation = useNavigation();


function MyBackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="#212121" />
    </TouchableOpacity>
  );
}
// const signOut = () => {
//    const navigation = useNavigation();
//     navigation.navigate("Login");
//     // onPress={() => navigation.navigate("Login")};
//   };
const BottomNavigator = () => {
  return (
    <Tabs.Navigator
          initialRouteName="BottomNavigator"
          id="BottomNavigator"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
            height: 40,
          maxWidth: 70,
          borderRadius: 20,
          marginRight: 15,
            marginLeft: 15,
        
        },
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveBackgroundColor: "#FFFFFF",

        tabBarStyle: {
          height: 64,
          paddingTop: 10,
          paddingBottom: 20,

          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          headerShown: false,
        },
      }}
    >
      <Tabs.Screen
        name="Posts"
        component={PostScreen}
        options={{
          title: "Публікації",
          headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
  },
            headerTintColor: "#212121",
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,

    // marginLeft: 120,

    textAlign: "center",
  },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="grid"
                size={24}
                color={focused ? "#FFFFFF" : "#BDBDBD"}
                
              />
            );
          },
          headerRight: () => (
        
             <TouchableOpacity>
              <Feather name="log-out" size={24}
                color="#BDBDBD"
                // onPress={signOut}
                 />
             </TouchableOpacity>
          ),
          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
        
      />

      <Tabs.Screen
        name="Create Posts"
        component={CreatePostsScreen}
              options={{
                  title: "Створити публікацію",
                  headerTitleAlign: 'center',
                tabBarStyle: { display: "none" },
  headerStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
      boxShadow: "0px 0.5px 0px rgba(0, 0, 0, 0.3)",
   
  },
  headerTintColor: "#212121",
  headerIconColor: "#212121",
headerTitleAlign: 'center',
  headerTitleStyle: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
  },
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name="add"
                size={30}
                color={focused ? "#FFFFFF" : "#BDBDBD"}
              />
            );
          },

          headerLeft: () => MyBackButton(),

          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerLeftContainerStyle: {
            paddingLeft: 15,
          },
        }}
      />
      <Tabs.Screen
         name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
            title: false,
            headerTitleAlign: 'center',
            // tabBarStyle: { display: "none" },

          // headerRight: () => (
          //   //  <TouchableOpacity onPress={signOut}>
          //      <Feather name="log-out" size={24} color="#BDBDBD" />
          //   //  </TouchableOpacity>
          // ),
          // headerRightContainerStyle: {
          //   paddingRight: 15,
          // },

          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={!focused ? "#BDBDBD" : color}
              />
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
    arrowLeft: {
        marginLeft: 16,
        marginRight: 42,
        paddingHorizontal: 16,
        color: "#212121",
        // paddingVertical: 10,
    },
});


export default BottomNavigator;