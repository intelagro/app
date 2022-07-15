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
}

]


export default {
   
    rutas
   
}