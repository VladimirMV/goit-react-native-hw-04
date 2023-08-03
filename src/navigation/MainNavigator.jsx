
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import BottomNavigator from "../navigation/BottomNavigator";
const Stack = createStackNavigator();
const MainNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Regestration" component={RegistrationScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
      export default MainNavigator;