"use stric" 

var mongoose = require ("mongoose");

var Schema = mongoose.Schema;

var enlace = Schema({

	tiempodeinicio: String,
	tiempofinal: String
})

module.exports = mongoose.model("enlace", enlace);
