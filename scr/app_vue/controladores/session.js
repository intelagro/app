import rutas from "../../router/rutas_front.js";
import funciones from "./funciones.js";
export default {
    inicio(nombre, cat_usuarios_licencias_id, token, usuario, vigente, modulos, catalogos) {
        if (!localStorage.getItem("ses_uuid")) {
            localStorage.setItem("ses_uuid", funciones.generateUUID());
        }
       this.mountCatalogos(catalogos);

        localStorage.setItem('ses_usuario', usuario);
        localStorage.setItem('ses_nombre', nombre);
        localStorage.setItem('ses_token', token);
        localStorage.setItem('ses_vigente', vigente);
        localStorage.setItem("modulos", JSON.stringify(modulos));
        localStorage.setItem('cat_usuarios_licencias_id', cat_usuarios_licencias_id);

        location.href = rutas.host + rutas.asistencia;

    },
    redirect() {
        location.href = rutas.host + rutas.informes;
        location.href = rutas.host + rutas.campo;
        location.href = rutas.host + rutas.devices;

    },
    imei() {
        if (localStorage.getItem("ses_uuid")) {
            return localStorage.getItem("ses_uuid");
        } else {
            this.salir();
        }
    },
    token() {
        if (localStorage.getItem("ses_token")) {
            return localStorage.getItem("ses_token");
        } else {
            this.salir();
        }
    },
    usuario() {
        if (localStorage.getItem("ses_usuario")) {
            return localStorage.getItem("ses_usuario");
        } else {
            this.salir();
        }
    },
    nombre() {
        if (localStorage.getItem("ses_nombre")) {
            return localStorage.getItem("ses_nombre");
        } else {
            this.salir();
        }
    },
    licencia() {

        if (localStorage.getItem("cat_usuarios_licencias_id")) {
            return localStorage.getItem("cat_usuarios_licencias_id");
        } else {
            this.salir();
        }

    },
    salir() {

        if (localStorage.getItem("registroActividades") &&
            localStorage.getItem("registroCosecha") &&
            localStorage.getItem("registroRequisicion")) {

            if (localStorage.getItem("registroActividades") == "" &&
                localStorage.getItem("registroCosecha") == "" &&
                localStorage.getItem("registroRequisicion") == ""
            ) {

                localStorage.clear();
                setTimeout(() => {
                    location.href = rutas.host + rutas.login;
                }, 100);
            } else {
                alert("Existen Registros Guardados Revisa y Envialos");
            }
        } else {
            localStorage.clear();
            setTimeout(() => {
                location.href = rutas.host + rutas.login;
            }, 100);
        }

    },
    compareRole(page) {
        if (localStorage.getItem("role")) {
            if (localStorage.getItem("role") == page) {
                return true;
            } else {
                this.salir();
            }
        } else {
            this.salir();

        }
    },
    mountStorage() {


    },
    mountCatalogos(catalogos) {
          console.log(catalogos);
        localStorage.setItem(
            "cat_actividades",
            JSON.stringify(catalogos.actividades)
        );
        localStorage.setItem(
            "cat_boquillas",
            JSON.stringify(catalogos.boquillas)
        );
        localStorage.setItem("cat_alcance", JSON.stringify(catalogos.alcance));
        localStorage.setItem(
            "cat_trabajadores",
            JSON.stringify(catalogos.trabajadores)
        );
        localStorage.setItem(
            "cat_funcionalidad",
            JSON.stringify(catalogos.funcionalidad)
        );
        localStorage.setItem("cat_lotes", JSON.stringify(catalogos.lotes));
        localStorage.setItem("cat_medidas", JSON.stringify(catalogos.medidas));
        localStorage.setItem("cat_metodos", JSON.stringify(catalogos.metodos));
        localStorage.setItem("cat_tipos", JSON.stringify(catalogos.tipos));
        localStorage.setItem("cat_unidades", JSON.stringify(catalogos.unidades));
        localStorage.setItem("cat_recetas", JSON.stringify(catalogos.recetas));
        localStorage.setItem("cat_productos", JSON.stringify(catalogos.productos));

    },

}
