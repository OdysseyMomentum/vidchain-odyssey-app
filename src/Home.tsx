import React from 'react';
import { View, Text, Image, Button } from 'native-base';
import {StyleSheet, Linking} from 'react-native';
import colors from './config/colors';

const imageBackground= require('../assets/images/background.jpeg');
function Home({ navigation }) {
    return (
      <View style={styles.container}>
          {/* <Image source={imageBackground} style={styles.backgroundImage} /> */}
        <Text>Odyssey</Text>
        <Button style={styles.button} onPress={() => this.continue()}>
            <Text style={styles.textButton}>SignIn with Vidchain</Text>
        </Button>
      </View>
    
        
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'stretch', // or 'stretch'
    },
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
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