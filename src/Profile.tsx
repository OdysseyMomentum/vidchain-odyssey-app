import React, {Component} from 'react';
import { View, Text } from 'native-base';
import {StyleSheet, Image} from 'react-native';
import * as siopDidAuth from "@validatedid/did-auth";
import colors from './config/colors';
import {validateAuthResponse} from './core/Validator';

const imageLogo = require('../assets/images/logo.jpg');

interface Props {
  navigation: any;
  route: any;
}
interface State {
  did: string;
  credential: any
}

class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      did: "",
      credential: {}
    };
  }

  async componentDidMount(){
    const {route} = this.props;
    const {response} = route.params;
    //Validate the id token
    const validationResponse: siopDidAuth.DidAuthTypes.DidAuthValidationResponse = await validateAuthResponse(response);
    console.log(validationResponse.signatureValidation);

    if(validationResponse.signatureValidation){
      const payload: siopDidAuth.DidAuthTypes.DidAuthResponsePayload = validationResponse.payload as siopDidAuth.DidAuthTypes.DidAuthResponsePayload;
      const did = payload.did;
      const verifiableCredential: siopDidAuth.OidcSsi.VerifiableCredential = payload.vp.verifiableCredential[0] as siopDidAuth.OidcSsi.VerifiableCredential;
      const credential: siopDidAuth.OidcSsi.CredentialSubject = verifiableCredential.credentialSubject;

      this.setState({
        did: did,
        credential: credential
      });
    }
  }
  render(){
    const {did} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Odyssey Profile</Text>
        <Text style={styles.text}>Hi {did}</Text>
        <Text style={styles.text}>You have just received a credential.</Text>
        <Image source={imageLogo} style={styles.logo} /> 

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
  });

export default Profile;