"use strict"

var mongoose = require("mongoose");

var schema = mongoose.schema;


//creamos el respectivo esquema

var estudianteschema = Schema({

	documentoestudiante: String,
	nombre: String,
	apellido: String,
	telefono: String,
	direccion: String,
	correo: String,
	fotodelestudiante: String
})

module.exports = mongoose.model("estudiantes", estudianteschema);


//un controlador es el intermediario entre las peticiones del cliente y la base de datos, el cliente envia  unos datos por medio de una ruta, esa peticion llega al controlador, si necesita algun dato de la base de datos entonces se los pide al modelo, el modelo procesa la informacion y devuelve una respuesta al cliente

