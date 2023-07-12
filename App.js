import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
// import LoginScreen from "./Screens/AuthPages/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/AuthPages/RegistrationScreen/RegistrationScreen";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <LoginScreen /> */}
      <RegistrationScreen />
      {/* <Text>Open up App.js to start working on your app!!!</Text> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
