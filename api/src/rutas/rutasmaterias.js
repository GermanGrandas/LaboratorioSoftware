"use strict"

var express = require("express");

var ControladorDeMaterias = require("../controladores/controladormaterias.js");
//var auth = require("../token/aut.js");

var api = express.Router();

api.post("/materias", ControladorDeMaterias.getMaterias);
api.post("/crear-materia",ControladorDeMaterias.crearMateria);


module.exports=api;