import React from 'react';
import {StyleSheet, ScrollView, Image} from 'react-native';
import {View, Text, ListItem, List, Separator, Body, CardItem} from 'native-base';
import colors from '../config/colors';
import {CredentialId} from '../dtos/Credential';
import {Entity} from '../dtos/Entity';

// const imageLogo = require('../../assets/images/logo.jpg');

type Props = {
    credential: any;
    entity: any;
};

const Credential = (props: Props) => {
    const {credential, entity} = props;
    return (
        <View style={styles.container}>
            <CardItem style={styles.headerNotification}>
            <Body>
              <Image
                resizeMode="contain"
                source={entity.image}
                style={styles.imageHeaderJobs}
              />
            </Body>
          </CardItem>
            <View>
              <Text style={styles.titleBehindHeader} note>
                Issued by: {entity.name}
              </Text>
              {/* <Text style={styles.titleBehindHeaderDID} note>
                {credential.name}
              </Text> */}
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
};

const styles = StyleSheet.create({
    
  });

export default Credential;