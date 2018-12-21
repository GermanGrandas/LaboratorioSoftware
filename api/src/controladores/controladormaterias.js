"use strict"
var Materias = require("../modelos/modelomaterias.js");


function controlmaterias(req,res){

	res.status(200).send({mensaje: "probando controlador de materias y no el de usuarios"})
}

function crearMateria(req,res){

	var materia = new Materias();
	var {data} = req.body;
	materia.codigodematerias = data.data.codigo;
	materia.nombredemateria = data.data.nombre;
	materia.year = data.data.year;
	materia.fechadeinicio = data.data.fInicio;
	materia.tipo = data.data.tipoM.value;
	materia.dias = data.data.dias;
	materia.Fechadefinalizacion = data.data.fFin;
	materia.horario = data.data.horario;
	materia.institucion = data.data.institucion;
	if (materia.tipo === 'Universidad') {
		materia.creditos = data.data.creditos;
		materia.teoPrac = data.data.teoPrac.value;
	} else {
		materia.grado = data.data.grado;
	}
	materia.creator = data.user;
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

