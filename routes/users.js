const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUsers, postUsers, deleteUsers } = require('../controllers/users');
const { isRoleOk, existEmail, existUserId } = require('../helpers/validations');
const { validateFields } = require('../middlewares/validateFields');
const { validateToken } = require('../middlewares/validateToken');
const { isRoleAdmin, getRole } = require('../middlewares/validateRol');

const router = Router();

router.get('/', getUsers);

router.put('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    //check('id').custom(existUserId),
    validateFields
], putUsers);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener más de 6 caracteres').isLength({ min: 6 }),
    //check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(existEmail),
    check('rol').custom(isRoleOk),
    validateFields
] ,postUsers);

router.delete('/:id', [
    validateToken,
    isRoleAdmin,
    // getRole('ADMIN_ROLE','USER_ROLE','NOSE_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    // check('id').custom(existUserId),
    validateFields
],deleteUsers);

module.exports = router;