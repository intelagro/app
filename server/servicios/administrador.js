const Administrador = require("../modelos/usuarios");
const config = require("../config");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function administrador() {

    Administrador.findOne({
        id: config.ADMINISTRADOR.id
    }, (err, respuesta) => {
        if (err) console.log(`administrador error ${err}`);

        if (respuesta == null) {
            bcrypt.hash(config.ADMINISTRADOR.password, saltRounds, function (err, hash) {

                const Admin = new Administrador({
                    nombre: config.ADMINISTRADOR.nombre,
                    password: hash,
                    usuario: config.ADMINISTRADOR.usuario,
                    role: config.ADMINISTRADOR.role,
                    nombre:config.ADMINISTRADOR.nombre

                });


                Admin.save((err) => {

                    if (err) console.log(`administrador error ${err}`);
                    console.log(`administrador Agregado`);

                });

            });

        } else {

            console.log(`administrador ya configurado`);

        }
    });
}


module.exports = {

    administrador
}