const { writeFileSync } = require('fs');
const { resolve } = require('path');

const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

let textToSpeech;
let voice;
let accept;

const define = (apikey, url, definedVoice, definedAccept) => {
  textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
      apikey,
    }),
    serviceUrl: url,
  });

  voice = definedVoice;
  accept = definedAccept;
};

const synthesize = async (fileName, text) => {
  const { result: raw } = await textToSpeech.synthesize({
    text,
    voice,
    accept,
  });

  const buffer = await textToSpeech.repairWavHeaderStream(raw);
  writeFileSync(resolve(__dirname, `../public/voices/${fileName}.wav`), buffer);
  return fileName;
};

module.exports = {
  define,
  synthesize,
}