"use strict"
var Materias = require("../modelos/modelomaterias.js");


function controlmaterias(req,res){

	res.status(200).send({mensaje: "probando controlador de materias y no el de usuarios"})
}

function crearMateria(req,res){

	var materia = new Materias();
	var {data} = req.body;
	materia.codigodematerias = data.codigo;
	materia.nombredemateria = data.nombre;
	materia.year = data.year;
	materia.fechadeinicio = data.fInicio;
	materia.tipo = data.tipoM.value;
	materia.dias = data.dias;
	materia.Fechadefinalizacion = data.fFin;
	materia.horario = data.horario;
	materia.institucion = data.institucion;
	if (materia.tipo === 'Universidad') {
		materia.creditos = data.creditos;
		materia.teoPrac = data.teoPrac.value;
	} else {
		materia.grado = data.grado;
	}
	materia.save((error, materiacreada)=>{
		if (error){
			res.status(500).send({mensaje: "hubo un error en el guardado de usuario"})
			}
		else{
			res.status(200).send({materiacreada})
			}
	})
	
}

module.exports = {
	controlmaterias,
	crearMateria
}

