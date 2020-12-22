const config = require('../secret/config.js');
const { Usuario } = require('../models');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const token = require('../services/token.js');
exports.login = async(req, res, next) => {
    try {
        const user = await Usuario.findOne({where: {email: req.body.email}})
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(passwordIsValid){
                const datos = {
                    id: user.id,
                    nombre: user.nombre,
                    email: user.email,
                    direccion: user.direccion,
                    rol: user.rol
                };
                let tokenR = await token.encode(datos);
                res.status(200).json({ auth: true, user: user, tokenReturn: tokenR });

            }else{
                res.status(401).send({ auth: false, tokenReturn: null, reason:
                    "Invalid Password!" });
            }
        }else{
            res.status(404).send( 'User Not Found.');
        }


    } catch {
        res.status(500).send('error');
        //next(error);


    }


}

    