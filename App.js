import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import MainNavigator from "./src/navigation/MainNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
