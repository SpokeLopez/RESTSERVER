const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateToken = async (req = request, res = response, next) => {
    const token = req.header('x-token');
    if(!token) {
        return res.status(401).json({
            msg: 'No existe un token en la petición'
        })
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'El usuario no existe en base de datos'
            })
        }
        // Verificamos si el user tiene estado true para poder hacer consultas
        if(!user.estado) {
            return res.status(401).json({
                msg: 'El usuario esta deshabilitado'
            })
        }

        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            msg: 'Token invalido'
        })
    }
}

module.exports = {
    validateToken
}