const { Router } = require('express');
const controller = require('../controllers/comments');

const router = Router();

router.get('/', controller.list);
router.get('/:commentId', controller.get);
router.post('/', controller.create);
router.delete('/:commentId', controller.remove);
// router.put('/:commentId', controller.update);

module.exports = router;