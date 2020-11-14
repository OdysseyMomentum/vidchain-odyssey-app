import {Linking} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as config from '../config/config';
import * as vidchain from '../apis/vidchain';
import {decodeJWT} from '../utils/jwtHandler';
import {IEnterpriseAuthZToken} from '../dtos/Tokens';

const STATE = "6b40f11929915f23d6e75be8";
const NONCE = "toOBpVYaObzEIYcMOBaezkJjSsYeYJngTMAFf1u0K2k";

const signInWithVidchain = async () => {
    const jwtRequest = await generateJwtRequest();

    const url ="vidchain://did-auth?openid://?response_type=id_token"+
    "&client_id="+config.REDIRECT_URI+
    "&scope=openid did_authn&state="+STATE+
    "&nonce="+ NONCE+
    "&request="+ jwtRequest;

    // const supported = await Linking.canOpenURL(url);
    //   if (supported) {
    //     await Linking.openURL(url);
    //   } else {
    //     Toast.showWithGravity(
    //       `Don't know how to open URI: ${url}`,
    //       Toast.LONG,
    //       Toast.CENTER,
    //     );
    //   }

}

function getEnterpriseDID(token: string): string {
    const { payload } = decodeJWT(token);
    return (payload as IEnterpriseAuthZToken).did;
  }

const generateJwtRequest = async (): Promise<string> => {
    const sessionToken = await vidchain.getAuthzToken();
    const jwt: string = sessionToken.data.accessToken;
    const did: string = getEnterpriseDID(jwt);
    return "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDp2aWQ6MHg4NEI2MEFkYjcwZjU1YzVjZDhlYTM5NzFBYUMyNzJjM2EwYmRCNjcwI2tleS0xIn0.eyJpYXQiOjE2MDUzNTE4NjEsImV4cCI6MTYwNTM1MjE2MSwiaXNzIjoiZGlkOnZpZDoweDg0QjYwQWRiNzBmNTVjNWNkOGVhMzk3MUFhQzI3MmMzYTBiZEI2NzAiLCJzY29wZSI6Im9wZW5pZCBkaWRfYXV0aG4iLCJyZWdpc3RyYXRpb24iOnsiandrc191cmkiOiJodHRwczovL2Rldi52aWRjaGFpbi5uZXQvYXBpL3YxL2lkZW50aWZpZXJzL2RpZDp2aWQ6MHg4NEI2MEFkYjcwZjU1YzVjZDhlYTM5NzFBYUMyNzJjM2EwYmRCNjcwO3RyYW5zZm9ybS1rZXlzPWp3a3MiLCJpZF90b2tlbl9zaWduZWRfcmVzcG9uc2VfYWxnIjoiRVMyNTZLIn0sImNsaWVudF9pZCI6Im9keXNzZXlhcHA6Ly9leGFtcGxlL2RpZC1hdXRoIiwibm9uY2UiOiJ0b09CcFZZYU9iekVJWWNNT0JhZXprSmpTc1llWUpuZ1RNQUZmMXUwSzJrIiwic3RhdGUiOiI2YjQwZjExOTI5OTE1ZjIzZDZlNzViZTgiLCJyZXNwb25zZV90eXBlIjoiaWRfdG9rZW4iLCJyZXNwb25zZV9tb2RlIjoiZnJhZ21lbnQiLCJyZXNwb25zZV9jb250ZXh0IjoicnAiLCJjbGFpbXMiOnsidmMiOnsiVmVyaWZpYWJsZUlkQ3JlZGVudGlhbCI6eyJlc3NlbnRpYWwiOnRydWV9fX19.bGuMLUICOzx0PzGKtbuVci13KVpQ9-hfU1L_-xBzfHqAiyqScYinBK4TWc78XuHoOxpTm0dZWigPnh1KnQvquAE"
}

export {signInWithVidchain}