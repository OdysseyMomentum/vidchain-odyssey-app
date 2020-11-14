import {decode as atob, encode} from 'base-64';
import {WALLET_ERRORS} from './handleApiResponse';

/**
 * Decodes a Base64 string in an UTF-8 string format
 * @param input Base64 encoded string to decode
 */
function strB64dec(input) {
    try {
      return JSON.parse(atob(input));
    } catch (error) {
      throw new Error(WALLET_ERRORS.DECODING_BASE64_ERROR);
    }
  }
  /**
   * Encoded  a Base64 string in an UTF-8 string format
   * @param input Base64 encoded string to decode
   * change
   */
  function strB64enc(input) {
    try {
      return encode(JSON.stringify(input));
    } catch (error) {
      throw new Error(WALLET_ERRORS.DECODING_BASE64_ERROR);
    }
  }

export {strB64dec, strB64enc}
  