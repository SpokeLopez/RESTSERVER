const Role = require('../models/role');
const User = require('../models/user');

const isRoleOk = async (rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol: ${rol} no esta definido en la base de datos`);
    }
}

const existEmail = async (correo = '') => {
    const existMail = await User.findOne({ correo });
    if (existMail) {
        throw new Error(`El mail: ${correo} ya existe en la base de datos`);
    }
}

const existUserId = async (id) => {
    const existUser = await User.findById({ id });
    if (!existUser) {
        throw new Error(`El id: ${id} no existe en la base de datos`);
    }
}

module.exports = {
    isRoleOk,
    existEmail,
    existUserId
}