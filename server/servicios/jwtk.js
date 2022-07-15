'use strict'
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config");

function tokenApp(password, usuario, nombre, role) {

    const payload = {

        usuario: usuario.usuario,
        password: password,
        nombre: nombre,
        role: role,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    return jwt.sign(payload, config.SECRET_TOKEN_AUTH);

}

function validar(authorization) {

    return new Promise(resolve => {
        jwt.verify(authorization.split(" ")[1], config.SECRET_TOKEN_AUTH, async (err, decoded) => {
            if (decoded != undefined) {
                resolve(true);
            } else {
                resolve(false);
            }

        });
    });
}

module.exports = {

    tokenApp,
    validar
}