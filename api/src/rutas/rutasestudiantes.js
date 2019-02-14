"use strict"

var express = require("express");

var ControladorDeEstudiantes = require("../controladores/controladorestudiantes.js");

var api = express.Router();

api.post("/estudiantes", ControladorDeEstudiantes.controlestudiantes);

api.post("/crear-estudiante", ControladorDeEstudiantes.crearEstudiante);

api.post("/matricular-estudiante",ControladorDeEstudiantes.matricularestudiante);

api.post("/desvincular-estudiante", ControladorDeEstudiantes.desvincularestudiante);

api.post("/actualizarAsistencia",ControladorDeEstudiantes.actualizarAsistencia);

api.post("/estudiantesXmateria", ControladorDeEstudiantes.estudiantesMateria);
//api.get("/estudiante",ControladorDeEstudiantes.getestudiante);

//api.put("/actualizar-estudiantes/:id", ControladorDeEstudiantes.actualizarestudiante);

//api.delete("/eliminar-estudiante/:id", ControladorDeEstudiantes.Eliminarestudiante);

module.exports=api;