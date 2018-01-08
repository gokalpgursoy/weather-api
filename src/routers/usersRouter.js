const router = require('express').Router();
const usersController = require('../controllers/usersController');
const { decodeToken } = require('../middlewares');
const { isUserAdmin } = require('../middlewares');

router.get('/info', decodeToken, usersController.getUsersInfo);
router.get('/', decodeToken, isUserAdmin, usersController.get);
router.post('/', decodeToken, isUserAdmin, usersController.post);
router.put('/', decodeToken, isUserAdmin, usersController.put);
router.delete('/', decodeToken, isUserAdmin, usersController.delete);

module.exports = router;
