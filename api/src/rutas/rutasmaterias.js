"use strict"

var express = require("express");

var ControladorDeMaterias = require("../controladores/controladormaterias.js");
//var auth = require("../token/aut.js");

var api = express.Router();

api.get("/materias", ControladorDeMaterias.controlmaterias);
api.post("/crear-materia",ControladorDeMaterias.crearMateria);


module.exports=api;