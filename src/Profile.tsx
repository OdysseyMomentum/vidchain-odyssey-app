import React from 'react';
import { View, Text, Image, Button } from 'native-base';
import {StyleSheet} from 'react-native';
import colors from './config/colors';
import {signInWithVidchain} from './core/VidchainSignIn';

const imageLogo = require('../assets/images/logo.jpg');

function Profile({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Odyssey Profile</Text>
        <Image source={imageLogo} style={styles.logo} /> 
      </View> 
    );
}

const styles = StyleSheet.create({
    logo: {
      
    },
    container: { 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: colors.black
   },
   text: {
      color: colors.white,
      fontSize: 25
   },
  });

export default Profile;