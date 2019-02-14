"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//creamos el respectivo esquema

var estudianteschema = Schema({

	documentoestudiante: String,
	nombre: String,
	apellido: String,
	telefono: String,
	direccion: String,
	correo: String,
	fotodelestudiante: String,
	asistencia : Number,
	materiapertenece : [{type : Schema.Types.ObjectId, ref : 'materias'}],
	creator : { type : Schema.Types.ObjectId, ref : "usuarios"}
})

module.exports = mongoose.model("estudiante", estudianteschema);
