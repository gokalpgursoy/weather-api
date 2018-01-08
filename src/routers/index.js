const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.post('/token', authController.generateToken);
router.use('/api', router);

router.use('/users', require('./usersRouter'));
router.use('/locations', require('./locationsRouter'));
router.use('/logs', require('./queryLogsRouter'));

/* eslint-disable */
router.use((err, req, res, next) => {
  return res.status(500).send({ error: err.message });
});

module.exports = router;
