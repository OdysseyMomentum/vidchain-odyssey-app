import React from 'react';
import {StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {View, Text, ListItem, List, Separator, Body, CardItem} from 'native-base';
import colors from '../config/colors';
import {CredentialId} from '../dtos/Credential';
import {Entity} from '../dtos/Entity';
import getEntityByDID from './Entities';

// const imageLogo = require('../../assets/images/logo.jpg');

type Props = {
    navigation: any;
    route: any;
};
type State = {
  entity: Entity;
  credential: any;
}

const imageDefault = require('../../assets/images/validated_white.png');
const iconDefault = require('../../assets/images/icon_notification.png');

class Credential extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      entity: {
        name: 'Validated ID',
        image: Image.resolveAssetSource(imageDefault).uri,
        icon: Image.resolveAssetSource(iconDefault).uri,
      },
      credential: {}
    }
  }

  async componentDidMount(){
    const {route} = this.props;
    const {credential, issuerDid} = route.params;

    const entity = await getEntityByDID(issuerDid);

    this.setState({
      credential,
      entity: entity
    });
  }

  goBack() {
    const {navigation} = this.props;
    navigation.navigate('Home');
  }

  render() {
    const {entity, credential} = this.state;
    return (
        <View style={styles.container}>
            <CardItem style={styles.headerNotification}>
            <Body>
              <Image
                resizeMode="contain"
                source={{uri: entity.image}}
                style={styles.imageHeader}
              />
            </Body>
          </CardItem>
            <View>
              <Text style={styles.titleBehindHeader} note>
                Issued by: {entity.name}
              </Text>
            </View>
            <ScrollView>         
            <List>
                <Separator bordered>
                  <Text style={styles.text}>Decentralized Identifier</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.id}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Name</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.firstName}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Last name</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.lastName}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Full name</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.fullName}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Date of Birth</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.dateOfBirth}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Place of Birth</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.placeOfBirth}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Nationality</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.nationality}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Gender</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.gender}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Document Type</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.documentType}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Document Number</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.documentNumber}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Personal Number</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.personalNumber}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Date of Expiry</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.dateOfExpiry}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>State Issuer</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.stateIssuer}</Text>
                </ListItem>
                <Separator bordered>
                  <Text style={styles.text}>Issuing Authority</Text>
                </Separator>
                <ListItem>
                  <Text>{credential.issuingAuthority}</Text>
                </ListItem>
              </List>
              </ScrollView> 
              </View>  
    );
            }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerNotification: {
    backgroundColor: colors.primary,
  },
  text: {
    color: colors.black,
    fontSize: 14,
    fontFamily: 'TTNorms-Bold',
  },
  imageHeader: {
    alignSelf: 'center',
    width: 120,
    height: 120,
  },
  titleBehindHeader: {
    color: colors.primary,
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'TTNorms-Regular',
  },
  icon: {
    color: colors.white,
    fontSize: 25,
    marginRight: '2%',
  },
  
    
  });

export default Credential;