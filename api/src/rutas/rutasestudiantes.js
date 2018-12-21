"use strict"

var express = require("express");

var ControladorDeEstudiantes = require("../controladores/controladorestudiantes.js");

var api = express.Router();

api.get("/estudiantes", ControladorDeEstudiantes.controlestudiantes);

module.exports=api;