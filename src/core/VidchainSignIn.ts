import {Linking} from 'react-native';
import Toast from 'react-native-simple-toast';

const signInWithVidchain = async () => {
    const url ="";
    const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.showWithGravity(
          `Don't know how to open URI: ${url}`,
          Toast.LONG,
          Toast.CENTER,
        );
      }

}

export {signInWithVidchain}