'use strict'
const express = require('express');
const api = express.Router();
const nomina = require('../controladores_api/api_nomina');



api.post('/nomina', nomina.registros);





module.exports = api