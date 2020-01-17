import * as request from "request";

const refreshTokens = {
  // guest102
  nonSubscriber:
    "3b46970318ae295282a1d5b4d6155ffb24993716c32ae91adb15f88f21bd5480db4df4a9e1f295d157e128aa5ba77c8ecd48389b2f07c4578e317760927836fdd57069c2142a947c32f2ab32220f33f73faa960f942caa15e4fe",
  // guest109
  subscriber:
    "fa42c6581809ad4af689ffcff2bb23f4741229bab81813bef6633a2ccb97a8cd9c2a3f5ed0c57acc841e5fc61a803f8a060c6897f195c7949bd4cbc55baa4cca39899d4535777bd07dfdf4bb1edb63d1ca7ca133c5c0d83f0326"
};

export const jwt: { [key: string]: string | null } = {
  nonSubscriber: null,
  subscriber: null,
};

const login = function(refreshToken): Promise<string> {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: "https://api30.milesplit.com/api/refresh-tokens",
        body: { token: refreshToken },
        json: true
      },
      function(err, httpResponse, json) {
        // If there was an error
        if (err) {
          return reject(err);
        } else if (json.token) {
          return resolve(json.token);
        } else {
          reject("There was no token in the response. " + JSON.stringify(json));
        }
      }
    );
  });
};

export const getTokens = async function() {
  if (jwt.nonSubscriber !== null) {
    return true;
  }
  return Promise.all([
    login(refreshTokens.nonSubscriber),
    login(refreshTokens.subscriber)
  ]).then(async function(tokens: string[]) {
    jwt.nonSubscriber = tokens[0];
    jwt.subscriber = tokens[1];
  });
};

