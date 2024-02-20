const { response } = require("express");
const bcrypjs = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/generateJWT");

const loginController = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificamos si el mail existe
        const user = await User.findOne({ correo })
        if (!user) {
            return res.status(400).json({
                msg: 'El usuario y/o password no son correctos'
            })
        }
        // Verificamos si el usuario sigue activo
        if (!user.estado) {
            return res.status(400).json({
                msg: 'El usuario fue desactivado'
            })
        }
        // Verificamos el password
        const validatePassword = bcrypjs.compareSync(password, user.password);
        if (!validatePassword) {
            return res.status(400).json({
                msg: 'El usuario y/o password no son correctos'
            })
        }
        // Generar el JWT
        const token = await generateJWT(user.id);
        res.json({
            user,
            token
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}

const googleController = async (req, res = response) => {
    const { id_token } = req.body;
    res.json({
        msg: 'Token Ok',
        id_token
    })
}

module.exports = {
    loginController,
    googleController
}