"use strict"

var mongoose = require("mongoose");

var schema = mongoose.schema;


//creamos el respectivo esquema

var materiaschema = Schema ({

	codigodemateria: String,
	nombredemateria: String,
	fechadeinicio: Date,
	Fechadefinalizacion: Date,
	horario: String //por ahora
})

module.exports = mongoose.model("materias", materiasschema);
