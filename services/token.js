var jwt = require('jsonwebtoken');
const models = require('../models');
const config = require('../secret/config.js');

async function checkToken(token) {
    var __id = null;
    try {
        const { id } = await jwt.decode(token);
        __id = id;
    } catch (e) {
        return false;
    }
    console.log(__id);
    const user = await models.Usuario.findOne({ where: { id: __id, estado: 1 } });
    if (user) {
        const token = jwt.sign({ id: __id }, config.secret, { expiresIn: '1d' });
        return { tokenReturn:token, rol: user.rol };
    } else {
        return false;
    }
}

module.exports = {

    //generar el token
    encode: async(obj) => {
        //console.log(rol);
        const token = jwt.sign({ id: obj.id, nombre: obj.nombre, email: obj.email, direccion: obj.direccion,
            rol: obj.rol }, config.secret, { expiresIn: 86400 });
        return token;
    },
    //permite decodificar el token
    decode: async(token) => {
        try {
            const { id } = await jwt.verify(token, config.secret,);
            const user = await models.Usuario.findOne({ where: { id: id } });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (e) {
            const newToken = await checkToken(token);
            return newToken;
        }

    }
}