const webpush = require("web-push");

const publicVapidKey = "BFmTVy4ED9ZQCgXqqg04MyUqy93deMvI8UkKYJIxxLOynGMeDlW3Xp5I5EdXEOZkmn1eb_RNGBS0TKR2B7mW8Sk";
const privateVapidKey = "gk_nqVOL9d1yKA2HjX4jJJm_nCgPqSrPm6DZClX3IY0";

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

function send(titulo,mensaje,sub){
    const payload = JSON.stringify({ title: titulo,body:mensaje,icon:"../templete/img/logo.jpeg"});     
    webpush
    .sendNotification(JSON.parse(sub), payload)
    .catch(err => console.error(err));     
}

module.exports = {
send

}
