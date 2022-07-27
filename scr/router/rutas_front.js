var host = "http://localhost:2111"
var deploy = "/intelagro";

var login = deploy + "/login.html";
var asistencia = deploy + "/asistencia.html";

/* CONTROL */
var phCeSodio = deploy + "/control/ph_ce_sodio.html";
var drenaje = deploy + "/control/drenaje.html";
var plagasEnfermedades = deploy + "/control/plagas_y_enfermedades.html";


export default {
    host,
    login,    
    asistencia,

    phCeSodio,
    drenaje,
    plagasEnfermedades
}