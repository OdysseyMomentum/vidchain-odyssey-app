import React from 'react';
import { View, Text, Button } from 'native-base';
import {StyleSheet, Image} from 'react-native';
import colors from './config/colors';
import {signInWithVidchain} from './core/VidchainSignIn';
import {handleDeepLinks} from './core/ManageDeepLinks';

const imageLogo = require('../assets/images/logo.jpg');

function Home({ navigation }) {
    handleDeepLinks();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Odyssey</Text>
        <Image source={imageLogo} style={styles.logo} />
        <Button style={styles.button} onPress={() => signInWithVidchain()}>
            <Text style={styles.textButton}>Sign In with Vidchain</Text>
        </Button>
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
    button: {
        backgroundColor: colors.primary,
        color: colors.white,
        alignSelf: 'center',
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,
      },
      textButton: {
        color: colors.white,
        alignSelf: 'center',
        fontFamily: 'TTNorms-Regular',
      },
  });

export default Home;