"use strict"

function controlestudiantes(req,res){
	res.status(200).send({mensaje:"probando controlador de estudiantes para diferenciar del de materias y usuarios"})
}

module.exports = {
	controlestudiantes
}