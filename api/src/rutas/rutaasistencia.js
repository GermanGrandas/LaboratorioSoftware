"use strict"

var express = require("express");

var ControladorAsistencia = require("../controladores/controladorasistencia");

var api = express.Router();

api.post('/getAsistencia',ControladorAsistencia.getAsistencia);
api.post('/updateAsistencia',ControladorAsistencia.updateAsistencia);
api.post('/createAsistencia',ControladorAsistencia.createAsistencia);
module.exports=api;