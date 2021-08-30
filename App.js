import React from "react";
import {  ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import List from "./components/List";

const image = { uri: "https://reactjs.org/logo-og.png" };

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.headerImg}>
          <ImageBackground
            source={image}
            resizeMode={"cover"}
            style={styles.imageArea}
          />
        </View>
        <View style={styles.feed}>
          <List />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },

  headerImg: {
    flex: 2
  },

  imageArea: {
    flex: 1
  },

  feed: {
    flex: 3
  }
});

export default App;
