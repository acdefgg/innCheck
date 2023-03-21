const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check')
const indexController = require('../controllers/indexController.js');


router.get('/',
    indexController.get);

router.post('/',
    check('query')
        .isInt()
        .withMessage('Укажите корректный ИНН!'),
    indexController.post);


module.exports = router;
