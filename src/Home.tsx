import React, { useEffect, Component } from 'react';
import { View, Text, Button } from 'native-base';
import {StyleSheet, Image, Linking, Platform} from 'react-native';
import colors from './config/colors';
import {signInWithVidchain} from './core/VidchainSignIn';
import {isOpenIdRequest} from './utils/utils'

const imageLogo = require('../assets/images/logo.jpg');

interface Props {
  navigation: any;
}
interface State {}

class Home extends Component<Props, State> {
  componentDidMount() {
    Linking.addEventListener('url', this.handleDeepLinks);
  };
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleDeepLinks);
  };

  handleDeepLinks = async () => {
    console.log("handle");
      if (Platform.OS === 'android') {
          Linking.getInitialURL().then(async (url) => {
            await this.handleOpenURL({url});
          });
        } else {
          Linking.addEventListener('url', this.handleOpenURL);
        }
  }
  
  handleOpenURL = async (event) => {
    const {navigation} = this.props;
      if (event.url !== null && isOpenIdRequest(event.url)) {
        const splitUrl = event.url.split("#");
        const responseData = JSON.parse(splitUrl[1]);
        const authResponseToken = responseData.id_token as string;
        navigation.navigate('Profile', {
          response: authResponseToken
        });
      }
  };

  render() {
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