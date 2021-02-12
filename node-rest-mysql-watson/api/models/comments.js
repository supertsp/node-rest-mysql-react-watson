const { rmSync } = require('fs');
const { resolve } = require('path');

const connection = require('../../libs/connection');
const textToSpeech = require('../../libs/textToSpeech');

const fillAudio = (comment) => {
  return {
    ...comment,
    audio: `/voices/${comment.id}.wav`,
  }
}

const list = async () => {
  const { results: copy } = await connection.query(`SELECT * FROM comments`);
  const results = copy.map(fillAudio);
  return results;
};

const get = async (id) => {
  const { results: { [0]: result } } = await connection.query(`SELECT * FROM comments WHERE ?`,  { id });
  return fillAudio(result);
};

const create = async (body) => {
  const { results: { insertId: id } } = await connection.query('INSERT INTO comments SET ?', body);
  textToSpeech.synthesize(id, body.text);
  return get(id);
};

const remove = async (id) => {
  const { results: { affectedRows } } = await connection.query('DELETE FROM comments WHERE ?', { id });
  rmSync(resolve(__dirname, `../../public/voices/${id}.wav`), {force: true});
  return affectedRows;
};

module.exports = {
  list,
  get,
  create,
  remove,
}
