const router = require('express').Router();
const { body } = require('express-validator');
const EmailController = require('../controllers/EmailController');

router.post('/collect', [
    body('email')
        .isEmail().withMessage('Incorrect email')
        .notEmpty().withMessage('Email must be not empty'),
], EmailController.collect);

module.exports = router;