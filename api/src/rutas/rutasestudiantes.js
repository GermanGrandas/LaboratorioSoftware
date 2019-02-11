"use strict"

var express = require("express");

var ControladorDeEstudiantes = require("../controladores/controladorestudiantes.js");

var api = express.Router();

api.get("/estudiantes", ControladorDeEstudiantes.controlestudiantes);

api.post("/crear-estudiante", ControladorDeEstudiantes.crearestudiantes);

api.get("/estudiante",ControladorDeEstudiantes.getestudiante);

api.put("/actualizar-estudiantes/:id", ControladorDeEstudiantes.actualizarestudiante);

api.delete("/eliminar-estudiante/:id", ControladorDeEstudiantes.Eliminarestudiante);

module.exports=api;