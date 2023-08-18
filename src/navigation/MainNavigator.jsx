import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import BottomNavigator from "../navigation/BottomNavigator";

   import { authStateChangeUser } from '../redux/auth/authOperations';
   import { selectStateChange } from '../redux/auth/authSelectors';

const Stack = createStackNavigator();



const MainNavigator = () => {
    const { currentUser } = useSelector((state) => state.auth);
    console.log("currentUser",currentUser);
const dispatch = useDispatch();


// dispatch(authStateChange({ stateChange: true }));
// const stateChange = false;
//   useEffect(() => {
//     dispatch(currentUser);
//   }, []);
    
    return (
        <NavigationContainer>
            {!currentUser ? (
                <Stack.Navigator
                    initialRouteName="Login"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Regestration" component={RegistrationScreen} />
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator
                    initialRouteName="BottomNavigator"
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}
      export default MainNavigator;