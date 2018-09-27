"use strict"

function controlmaterias(req,res){

	res.status(200).send({mensaje: "probando controlador de materias y no el de usuarios"})
}

module.exports = {
	controlmaterias
}