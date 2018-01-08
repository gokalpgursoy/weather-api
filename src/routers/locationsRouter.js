const router = require('express').Router();
const locationsController = require('../controllers/locationsController');
const { decodeToken } = require('../middlewares');
const { isUserAdmin } = require('../middlewares');

router.get('/', decodeToken, locationsController.get);
router.post('/', decodeToken, isUserAdmin, locationsController.post);
router.put('/', decodeToken, isUserAdmin, locationsController.put);
router.delete('/', decodeToken, isUserAdmin, locationsController.delete);

module.exports = router;
