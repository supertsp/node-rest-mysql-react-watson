module.exports = server => {
    const controller = server.controllers.comments;

    server.route('/api/v1/comments')
        .get(controller.list)
        .post(controller.save);

    server.route('/api/v1/comments/:commentId')
        .delete(controller.delete)
        .put(controller.update)

}