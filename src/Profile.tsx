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
}

class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      did: "",
    };
  }

  componentDidMount(){
    const {route} = this.props;
    // const {response} = route.params;
    const response = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCIsImtpZCI6ImRpZDp2aWQ6MHg2Y2Q5NkFhMEQzMmQyRjFlOWM4MzM4MTgxMzQ4MWE4ODBhMzQ0NjY4I2tleS0xIn0.eyJpYXQiOjE2MDUzNjc1MzEsImV4cCI6MTYwNTM2NzgzMSwiaXNzIjoiaHR0cHM6Ly9zZWxmLWlzc3VlZC5tZSIsInN1YiI6IkEyeElIYWVmYWdRTHVyOENfZTE3amZfSktUcl8xVXRaOXNzczJOX0taNTAiLCJub25jZSI6InE1ZmxoVHh6NnZHdE5qREN6ZVRsSFBvNkE4Z3EySEhUTlRqaFpzLW1jUjQiLCJhdWQiOiJvZHlzc2V5YXBwOi8vZXhhbXBsZS9kaWQtYXV0aCIsInN1Yl9qd2siOnsia2lkIjoiZGlkOnZpZDoweDZjZDk2QWEwRDMyZDJGMWU5YzgzMzgxODEzNDgxYTg4MGEzNDQ2Njgja2V5LTEiLCJrdHkiOiJFQyIsImNydiI6InNlY3AyNTZrMSIsIngiOiI3MTE5ZTI5YjZjZDc5NTIzMDRmN2E4NjRkODA4ZjFkNTZmZWY3Y2Y0YTdlYTIyOWFmZTJhMDI0YjlhMDE5OTRkIiwieSI6IjllYzU3NWZkZGVkNjgyNDU4MjU3ZDQ3M2ZhMDg2ZjA2NTdlNzViOWNlNDA4YzFkZWZjZmM1ZjdlOTZlMWVmYWIifSwiZGlkIjoiZGlkOnZpZDoweDZjZDk2QWEwRDMyZDJGMWU5YzgzMzgxODEzNDgxYTg4MGEzNDQ2NjgiLCJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjoiVmVyaWZpYWJsZVByZXNlbnRhdGlvbiIsInZlcmlmaWFibGVDcmVkZW50aWFsIjpbeyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSIsImh0dHBzOi8vYXBpLnZpZGNoYWluLm5ldC9jcmVkZW50aWFscy92ZXJpZmlhYmxlSWQvdjEiXSwiaWQiOiJodHRwczovL2FwaS52aWRjaGFpbi5uZXQvYXBpL3YxL3NjaGVtYXMvMjM5MSIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJWZXJpZmlhYmxlSWRDcmVkZW50aWFsIl0sImlzc3VlciI6ImRpZDp2aWQ6MHg1MjA4NDMxQzZFQzJlYzQwOTdhZUE3MTgyYkI5MmQwMTg3NjY0OThjIiwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6dmlkOjB4ODcwN0NDYTgzNUM5NjEzMzREM0Y2NDUwQzZhNjFhMEFENjU5MjQ2MCIsImZpcnN0TmFtZSI6IkV2YSIsImxhc3ROYW1lIjoiTW9ucm9lIiwiZ2VuZGVyIjoiRmVtYWxlIiwiZGF0ZU9mQmlydGgiOiIxMi8xMS8xOTcwIiwicGxhY2VPZkJpcnRoIjoiTWFkcmlkIiwiY3VycmVudEFkZHJlc3MiOiJBcmFnbyAxNzkgNGEiLCJjaXR5IjoiQmFyY2Vsb25hIiwic3RhdGUiOiJDYXRhbHXDsWEiLCJ6aXAiOiIwODAxMSJ9LCJpc3N1YW5jZURhdGUiOiIyMDE5LTExLTE3VDE0OjAwOjAwWiIsInByb29mIjp7InR5cGUiOiJFY2RzYVNlY3AyNTZrMVNpZ25hdHVyZTIwMTkiLCJjcmVhdGVkIjoiMjAxOS0xMS0xN1QxNDowMDowMFoiLCJwcm9vZlB1cnBvc2UiOiJhc3NlcnRpb25NZXRob2QiLCJ2ZXJpZmljYXRpb25NZXRob2QiOiJkaWQ6dmlkOjB4NTIwODQzMUM2RUMyZWM0MDk3YWVBNzE4MmJCOTJkMDE4NzY2NDk4YyNrZXktMSIsImp3cyI6ImV5SmhiR2NpT2lKRlV6STFOa3N0VWlJc0luUjVjQ0k2SWtwWFZDSXNJbXRwWkNJNkltUnBaRHAyYVdRNk1IZ3pZV1F6WmtZNFJUVmhRamhFTmprelF6STRRbVJFT1VJME4yVmtSREZtTnpRME5VWTRZek5HSTJ0bGVTMHhJbjAuZXlKcFlYUWlPakUxT1RFM09UazFNRFFzSW5aaklqcDdJa0JqYjI1MFpYaDBJanBiSW1oMGRIQnpPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1ERTRMMk55WldSbGJuUnBZV3h6TDNZeElpd2lhSFIwY0hNNkx5OWhjR2t1ZG1sa1kyaGhhVzR1Ym1WMEwyTnlaV1JsYm5ScFlXeHpMM1psY21sbWFXRmliR1V0YVdRdmRqRWlYU3dpYVdRaU9pSm9kSFJ3Y3pvdkwyRndhUzUyYVdSamFHRnBiaTV1WlhRdllYQnBMM1l4TDNOamFHVnRZWE12TWpNNU1TSXNJblI1Y0dVaU9sc2lWbVZ5YVdacFlXSnNaVU55WldSbGJuUnBZV3dpTENKV1pYSnBabWxoWW14bFNXUkRjbVZrWlc1MGFXRnNJbDBzSW1OeVpXUmxiblJwWVd4VGRXSnFaV04wSWpwN0ltbGtJam9pWkdsa09uWnBaRG93ZURReVlqZzVPRVV5TjBNMU5tVTNaRFZCTW1RMFJUWTBObVJDTW1RME1UaENSRFZETVRjd1l6UWlMQ0ptYVhKemRFNWhiV1VpT2lKRmRtRWlMQ0pzWVhOMFRtRnRaU0k2SWsxdmJuSnZaU0lzSW1kbGJtUmxjaUk2SWtabGJXRnNaU0lzSW1SaGRHVlBaa0pwY25Sb0lqb2lNVEl2TVRFdk1UazNNQ0lzSW5Cc1lXTmxUMlpDYVhKMGFDSTZJazFoWkhKcFpDSXNJbU4xY25KbGJuUkJaR1J5WlhOeklqb2lRWEpoWjI4Z01UYzVJRFJoSWl3aVkybDBlU0k2SWtKaGNtTmxiRzl1WVNJc0luTjBZWFJsSWpvaVEyRjBZV3h2Ym1saElpd2llbWx3SWpvaU1EZ3dNVEVpZlN3aWFYTnpkV1Z5SWpvaVpHbGtPblpwWkRvd2VETmhaRE5tUmpoRk5XRkNPRVEyT1RORE1qaENaRVE1UWpRM1pXUkVNV1kzTkRRMVJqaGpNMFlpZlN3aWFYTnpJam9pWkdsa09uWnBaRG93ZUROaFpETm1SamhGTldGQ09FUTJPVE5ETWpoQ1pFUTVRalEzWldSRU1XWTNORFExUmpoak0wWWlmUS5CN2U0WnA5akdMRFhUUkc4SUQxajBfRVZ3b1FsSV9YRHpTYWdLV21EUi1JTmpNVlNGRzExNDJhc0MxcjVSZWROdXUzU1I4VkljRTl5cmJEdzljUnVFUUEifX1dLCJwcm9vZiI6eyJ0eXBlIjoiRWNkc2FTZWNwMjU2azFTaWduYXR1cmUyMDE5IiwiY3JlYXRlZCI6IjIwMTktMDYtMjJUMTQ6MTE6NDRaIiwicHJvb2ZQdXJwb3NlIjoiYXNzZXJ0aW9uTWV0aG9kIiwidmVyaWZpY2F0aW9uTWV0aG9kIjoiZGlkOnZpZDoweDE2MDQ4QjgzRkFkYUNkQ0IyMDE5OEFCYzQ1NTYyRGYxQTNlMjg5YUYja2V5LTEiLCJqd3MiOiJleUpoYkdjaU9pSkZVekkxTmtzaWZRLmV5SnpkV0lpT2lKRlFsTkpJREl3TVRraWZRLm9nZ0UzZnQza0pZUEdHYTllQmlicGJqZ2VKWHc0ZkxiVk1vdVZvTTJOZmNEeHNsX1VVVUlhcnNTMVZwQm9ZRXM3czljQmxjNHVDMEVibkpDSGZWSkl3In19fQ.pq3vX7C7_cLfe-LRRHsivNrH50-TxtGORI9SMVQ5bj1jlv_CFf5WNggevjiWLm8jrxkoenqBqXsKF3IGgxlqwwA";
    //Validate the id token
    const validationResponse: siopDidAuth.DidAuthTypes.DidAuthValidationResponse = await validateAuthResponse(response);
    if(validationResponse){
      console.log(validationResponse);
      // this.setState({
      //   did: validationResponse.payload.did
      // });
    }
  }
  render(){
    const {did} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Odyssey Profile</Text>
        <Text style={styles.text}>{}</Text>
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