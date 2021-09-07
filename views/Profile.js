import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Button, Text, Image, Icon, Avatar } from "react-native-elements";
import { MainContext } from "../context/MainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";
import { useTag } from "../hooks/ApiHooks";
import { uploadsUrl } from "../utils/variables";

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/400/400');

  const { getFilesByTag } = useTag();
  useEffect(() => {
      (async () => {
        const file = await getFilesByTag('avatar_' + user.user_id);
        setAvatar(uploadsUrl + file.pop().filename);
      })();
  }, [user]);


  const logout = async () => {
    await AsyncStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Icon name='user' type='feather'/>
      <Text h5>Username: {user.username}</Text>
      <Image source={{uri: avatar}} style={{ width: 400, height: 400 }}/>
      <Text h5>Name: {user.full_name}</Text>
      <Text h5>Email: {user.email}</Text>
      <Button raised title={'Logout'} onPress={logout} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default Profile;
