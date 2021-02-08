const server = require('./config/express')();
const port = server.get('port');

//IBM WATSON
const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator({
    apikey: 'ERjFGLJ68Xg8ABj1mED66Pi_hNLlvtm10AhN7nQ36031',
  }),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/edfd6ca1-9a4e-41ad-9184-e2404a0fcf52',
});

const synthesizeParams = {
  text: 'Olá Jovem Mundo!',
  accept: 'audio/wav',
  voice: 'pt-BR_IsabelaV3Voice',
};

textToSpeech.synthesize(synthesizeParams)
  .then(response => {
    // only necessary for wav formats,
    // otherwise `response.result` can be directly piped to a file
    return textToSpeech.repairWavHeaderStream(response.result);
  })
  .then(buffer => {
    fs.writeFileSync('./voices/hello_world.wav', buffer);
  })
  .catch(err => {
    console.log('error:', err);
  });

  //API SERVER
  server.listen(port, () => {
    console.log(`\n\nServer listening at \"${port}\" the port\n\n`);
  });










