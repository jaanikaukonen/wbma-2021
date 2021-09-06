import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Image , Text } from 'react-native-elements';
import PropTypes from "prop-types";
import { uploadsUrl } from "../utils/variables";
import { format } from "date-fns";

const Single = ({ route }) => {
  const {params} = route;
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{width: window.innerWidth, height: 400}}
        source={{uri: uploadsUrl + params.filename}}
      />
      <Text h1>{params.title}</Text>
      <Text h4>{params.description}</Text>
      <Text h5>{format(new Date(params.time_added), 'EEEE dd MMMM yyyy')}</Text>
    </SafeAreaView>
  );
};

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40
  }
});

export default Single;
