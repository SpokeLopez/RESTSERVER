const { response, request } = require ('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req = request, res = response) =>{
    const { limit = 5, desde = 0 } = req.query;
    const [total, usuarios] = await Promise.all([
        User.countDocuments({ estado: true }),
        User.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limit)),
    ])
    res.json({
        total,
        usuarios
    })
}

const putUsers = async (req, res = response) =>{
    const { id } = req.params;
    const { password, google, correo, ...resto} = req.body;

    //Comparar data vs base de datos.
    if(password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({
        msg: "PUT API",
        user
    })
}

const postUsers = async (req, res = response) =>{
    
    const {nombre, correo, password, rol} = req.body;
    const user = new User({ nombre, correo, password, rol });
    
    //Encriptar las password, se agregan las veces en la función
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
    await user.save();
    res.json({
        user
    })
}

const deleteUsers = async (req, res = response) =>{
    const { id } = req.params;
    // Eliminamos el usuario de la base de datos
    // const user = await User.findByIdAndDelete(id);

    // Cambiamos el status del usuario en la base de datos a false
    const user = await User.findByIdAndUpdate(id, { estado: false });
    
    // Obtenemos el usuario que hace la consulta
    // const userAuth = req.user;
    res.json(user)
}

module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
}