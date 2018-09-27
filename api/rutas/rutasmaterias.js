"use strict"

var express = require("express");

var ControladorDeMaterias = require("../controladores/controladormaterias.js");

var api = express.Router();

api.get("/materias", ControladorDeMaterias.controlmaterias);

module.exports=api;