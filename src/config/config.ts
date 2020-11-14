
const API_URL = "https://dev.vidchain.net/api/v1/";
const CALLBACK_URL = "vidchain-odyssey://"


//Legal Entity
const Entity = {
  iss: "ODYSSEY APP",
  aud: "vidchain-api",
  iat: 1605348738,
  exp: 1605349638,
  nonce: "7b9f5c6a-018c-4c16-be19-8caa266ea84c",
  apiKey: "f9fd6eb3-814a-4a42-916d-bc03df20e521",
  callbackUrl: CALLBACK_URL
};
const DID = "did:vid:0xbAE578722699A7C33C0a0C52421C54890C841199";

//Entity in Base-64
const grantType = "urn:ietf:params:oauth:grant-type:jwt-bearer";
const scope = "vidchain profile entity";
//const scope = "vidchain profile test entity";


export {
  Entity,
  grantType,
  scope,
  API_URL,
  DID,
};
