const { response } = require("express")

const isRoleAdmin = (req, res = response, next) => {
    if(!req.user){
        return res.status(500).json({
            msg: 'El token es necesario para realizar esta operación'
        });
    }
    const { rol, nombre } = req.user;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no tiene permisos para esta operación`
        });
    }
    next();
}

const getRole = (...roles) => {
    return (req, res = response, next) => {
        if (!req.user) {
            return res.status(500).json({
                msg: 'El rol es necesario para realizar esta operación'
            });
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `La petición requiere uno de estos roles: ${roles}`
            })
        }
         next();
    }
}

module.exports = {
    isRoleAdmin,
    getRole
}