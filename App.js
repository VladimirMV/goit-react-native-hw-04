import React from "react";
import "react-native-gesture-handler";
import { StyleSheet, View } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
