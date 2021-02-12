const express = require('express');
const cors = require('cors');
const comments = require('./api/routes/comments');
const connection = require('./libs/connection');
const textToSpeech = require('./libs/textToSpeech');

require('dotenv').config();

const server = express();

server.use(express.json());
server.use(cors());
server.use(express.static('./public'));
server.use(process.env.API_BASE_PATH, comments);

connection.define({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  schema: process.env.MYSQL_SCHEMA,
  port: process.env.MYSQL_PORT,
});

textToSpeech.define(
  process.env.TEXT_TO_SPEECH_APIKEY,
  process.env.TEXT_TO_SPEECH_URL,
  process.env.TEXT_TO_SPEECH_VOICE,
  process.env.TEXT_TO_SPEECH_ACCEPT,
);

const runningServer = server.listen(process.env.SERVER_PORT ?? 8080, () => {
  console.log(`\n\nServer listening at http://localhost:${runningServer.address().port}\n `);
});
