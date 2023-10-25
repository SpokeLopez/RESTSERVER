const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGOCON);
        console.log('Database OK!!');
    } catch (error) {
        console.log(error);
        new Error('Error en la base de datos');
    }
}

module.exports = {
    dbConnection
}