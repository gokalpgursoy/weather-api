const router = require('express').Router();
const queryLogsController = require('../controllers/queryLogsController');
const { decodeToken } = require('../middlewares');

router.get('/:id', decodeToken, queryLogsController.get);
router.post('/', decodeToken, queryLogsController.post);

module.exports = router;
