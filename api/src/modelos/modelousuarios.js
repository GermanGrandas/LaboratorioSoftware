"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;


//creamos el respectivo esquema

var usuarioschema = Schema({

	Tdocumento: String,
	documento: String,
	nombre: String,
	apellido: String,
	email: String,
	telefono: String,
	password: String
})

module.exports = mongoose.model("usuarios", usuarioschema);
