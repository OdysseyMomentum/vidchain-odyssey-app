import {Linking, Platform} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as config from '../config/config';


const handleDeepLinks = async () => {
    if (Platform.OS === 'android') {
        Linking.getInitialURL().then(async (url) => {
          await handleOpenURL({url});
        });
      } else {
        Linking.addEventListener('url', handleOpenURL);
      }
}

const handleOpenURL = async (event) => {
    if (event.url !== null) {
      console.log(event.url);
    }
};

export {handleDeepLinks}