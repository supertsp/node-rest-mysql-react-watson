const model = require('../models/comments');

const list = async (request, response) => {
  try {
    response.send(await model.list());
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const get = async ({ params: { commentId } }, response) => {
  try {
    response.send(await model.get(commentId));
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const create = async ({ body }, response) => {
  try {
    const inserted = await model.post(body);
    response.set('Location', `/api/v1/comments/${inserted.id}`);
    response.status(201).json(inserted);
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const remove = async ({ params: { commentId } }, response) => {
  try {
    const affectedRows = await model.destroy(commentId);
    response.send({
      message: `${affectedRows} comments successfully deleted`,
      success: true,
    });
  } catch (e) {
    response.status(500).send(e.message);
  }
};

module.exports = {
  list,
  get,
  create,
  remove,
}
