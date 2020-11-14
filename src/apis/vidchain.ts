import axios from 'axios';
import * as config from "../config/config";
import {handleError, handleSuccess} from '../utils/handleApiResponse';
import {strB64enc} from '../utils/utils';

async function getAuthzToken() {
    const body = {
      grantType: config.grantType,
      assertion: strB64enc(config.Entity),
      scope: config.scope,
    };
    try {
      const response = await axios.post(`${config.API_URL}/sessions`, body);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }


export { getAuthzToken };