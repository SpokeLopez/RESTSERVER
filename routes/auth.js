const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validateFields');
const { loginController, googleController } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], loginController);

router.post('/google', [
    check('id_token', 'Token de Google es requerido').not().isEmail(),
    validateFields
], googleController);

module.exports = router;