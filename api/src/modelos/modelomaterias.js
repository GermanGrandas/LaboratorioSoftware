"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//creamos el respectivo esquema

var materiaschema = Schema ({

	codigo: String,
	nombre: String,
	tipoM: String,
	grado : String,
	year: String,
	datesRange: String,
	institucion: String,
	hInicio : String,
	hFin : String,
	creditos: String,
	dias: String,
	teoPrac : String,
	creator :{ type : Schema.Types.ObjectId, ref : "usuarios"},
	estudiantes : [{type : Schema.Types.ObjectId, ref : 'estudiante'}]
})

module.exports = mongoose.model("materias", materiaschema);
