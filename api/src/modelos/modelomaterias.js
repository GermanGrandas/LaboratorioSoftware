"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//creamos el respectivo esquema

var materiaschema = Schema ({

	codigodemateria: String,
	nombredemateria: String,
	year: String,
	fechadeinicio: Date,
	tipo: String,
	creditos: String,
	dias: String,
	institucion: String,
	Fechadefinalizacion: Date,
	horario: String,
	grado : String,
	teoPrac : String,
	creator :{ type : Schema.Types.ObjectId, ref : "usuarios"}
})

module.exports = mongoose.model("materias", materiaschema);
