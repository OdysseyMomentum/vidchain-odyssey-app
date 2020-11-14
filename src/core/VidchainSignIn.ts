import {Linking} from 'react-native';
import Toast from 'react-native-simple-toast';
import * as siopDidAuth from "@validatedid/did-auth";
import * as config from '../config/config';
import * as vidchain from '../apis/vidchain';
import {getEnterpriseDID} from '../utils/utils';
import {DidAuthRequestOpts, ObjectPassedBy, DidAuthResponseMode, DidAuthResponseContext, UriRequest, UrlEncodingFormat} from '../dtos/DidAuthTypes';
import {OidcClaim} from '../dtos/OidcSsi';

const STATE = "6b40f11929915f23d6e75be8";
const NONCE = "toOBpVYaObzEIYcMOBaezkJjSsYeYJngTMAFf1u0K2k";

const signInWithVidchain = async () => {
    const uriRequest = await generateJwtRequest();

    const uriDecoded = decodeURIComponent(uriRequest.urlEncoded);

    const supported = await Linking.canOpenURL(uriDecoded);
      if (supported) {
        await Linking.openURL(uriDecoded);
      } else {
        Toast.showWithGravity(
          `Don't know how to open URI: ${uriDecoded}`,
          Toast.LONG,
          Toast.CENTER,
        );
      }

}

const generateJwtRequest = async (): Promise<UriRequest> => {
    const sessionToken = await vidchain.getAuthzToken();
    const jwt: string = sessionToken.data.accessToken;
    const did: string = getEnterpriseDID(jwt);

    const claim: OidcClaim = {
        vc: {
          VerifiableIdCredential: { essential: true },
        },
      };
    //We don't generate a state, but the library will manage the state
    const requestOpts: DidAuthRequestOpts = {
        oidpUri: config.IDENTITY_PROVIDER,
        redirectUri: config.REDIRECT_URI,
        requestObjectBy: {
          type: ObjectPassedBy.VALUE,
        },
        signatureType: {
          signatureUri: `${config.API_URL}/api/v1/signatures`,
          did: did,
          authZToken: jwt,
          kid: `${did}#key-1`,
        },
        registrationType: {
          type: ObjectPassedBy.REFERENCE,
          referenceUri: `https://dev.vidchain.net/api/v1/identifiers/${did};transform-keys=jwks`,
        },
        responseMode: DidAuthResponseMode.FRAGMENT,
        responseContext:DidAuthResponseContext.RP,
        claims: claim,
      };

    //const uriRequest: UriRequest = await siopDidAuth.createUriRequest(requestOpts);
    //   console.log(uriRequest);
    const jwtRequest = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDp2aWQ6MHg4NEI2MEFkYjcwZjU1YzVjZDhlYTM5NzFBYUMyNzJjM2EwYmRCNjcwI2tleS0xIn0.eyJpYXQiOjE2MDUzNTE4NjEsImV4cCI6MTYwNTM1MjE2MSwiaXNzIjoiZGlkOnZpZDoweDg0QjYwQWRiNzBmNTVjNWNkOGVhMzk3MUFhQzI3MmMzYTBiZEI2NzAiLCJzY29wZSI6Im9wZW5pZCBkaWRfYXV0aG4iLCJyZWdpc3RyYXRpb24iOnsiandrc191cmkiOiJodHRwczovL2Rldi52aWRjaGFpbi5uZXQvYXBpL3YxL2lkZW50aWZpZXJzL2RpZDp2aWQ6MHg4NEI2MEFkYjcwZjU1YzVjZDhlYTM5NzFBYUMyNzJjM2EwYmRCNjcwO3RyYW5zZm9ybS1rZXlzPWp3a3MiLCJpZF90b2tlbl9zaWduZWRfcmVzcG9uc2VfYWxnIjoiRVMyNTZLIn0sImNsaWVudF9pZCI6Im9keXNzZXlhcHA6Ly9leGFtcGxlL2RpZC1hdXRoIiwibm9uY2UiOiJ0b09CcFZZYU9iekVJWWNNT0JhZXprSmpTc1llWUpuZ1RNQUZmMXUwSzJrIiwic3RhdGUiOiI2YjQwZjExOTI5OTE1ZjIzZDZlNzViZTgiLCJyZXNwb25zZV90eXBlIjoiaWRfdG9rZW4iLCJyZXNwb25zZV9tb2RlIjoiZnJhZ21lbnQiLCJyZXNwb25zZV9jb250ZXh0IjoicnAiLCJjbGFpbXMiOnsidmMiOnsiVmVyaWZpYWJsZUlkQ3JlZGVudGlhbCI6eyJlc3NlbnRpYWwiOnRydWV9fX19.bGuMLUICOzx0PzGKtbuVci13KVpQ9-hfU1L_-xBzfHqAiyqScYinBK4TWc78XuHoOxpTm0dZWigPnh1KnQvquAE";
    const url ="vidchain://did-auth?openid://?response_type=id_token"+
    "&client_id="+config.REDIRECT_URI+
    "&scope=openid did_authn&state="+STATE+
    "&nonce="+ NONCE+
    "&request="+ jwtRequest;
    const uriRequest: UriRequest = {
        jwt: jwtRequest,
        urlEncoded: url,
        encoding: UrlEncodingFormat.FORM_URL_ENCODED
    }

    return uriRequest;
}

export {signInWithVidchain}