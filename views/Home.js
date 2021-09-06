import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PropTypes from 'prop-types';
import List from "../components/List";

const image = { uri: "https://reactjs.org/logo-og.png" };

const Home = ({ navigation }) => {
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
        <List navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};

Home.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default Home;
