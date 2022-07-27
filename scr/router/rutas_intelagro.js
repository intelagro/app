import componentes from "./rutas_componentes.js";
import front from "./rutas_front.js";


var rutas = [{
    name: 'login',
    path: front.login,
    component: componentes.loginApp
},
{
    name: 'asistencia',
    path: front.asistencia,
    component: componentes.asistenciaApp
},
{
    name: 'Monitoreo PH/CE/Sodio',
    path: front.phCeSodio,
    component: componentes.phCeSodioApp
},
{
    name: 'Monitoreo drenaje',
    path: front.drenaje,
    component: componentes.drenajeApp
},
{
    name: 'Manejo integrado de plagas y enfermedades',
    path: front.plagasEnfermedades,
    component: componentes.plagasEnfermedadesApp
}

]


export default {
   
    rutas
   
}