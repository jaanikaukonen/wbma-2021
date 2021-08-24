import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <List/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
});

export default App;
