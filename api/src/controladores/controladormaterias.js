"use strict"
var Materias = require("../modelos/modelomaterias.js");
var Usuario= require("../modelos/modelousuarios.js");

var async = require('async');

function controlmaterias(req,res){

	res.status(200).send({mensaje: "probando controlador de materias y no el de usuarios"})
}

function crearMateria(req,res){
		let {data} = req.body.data;
		let {user} = req.body.data;
		Promise.all([
			Materias.findOne({codigo : data.codigo}),
			Materias.findOne({nombre : data.nombre})
		]).then(([r1,r2])=>{				
			if(r1) {
				res.status(500).send({error: "El Código de Materia ingresado ya se encuentra registrado"});
				return
			}else if(r2){
				res.status(500).send({error: "El Nombre de materia ingresado ya se encuentra registrado"});
				return
			}
			else{
				Usuario.findOne({email : user},function(err,usuario){
					
					if(err) {
						res.status(500).send({error : 'algo ha ocurrido'});
						return;
					}else if(!usuario){
						res.status(500).send({error : 'algo ha ocurrido'});
						return
					}else{
						var materia = new Materias();
						materia.codigo = data.codigo;
						materia.nombre = data.nombre;
						materia.year = data.year;
						materia.datesRange = data.datesRange;
						materia.tipoM = data.tipoM;
						materia.dias = data.dias;
						materia.hFin = data.hFin;
						materia.hInicio = data.hInicio;
						materia.institucion = data.institucion;
						if (materia.tipo === 'universidad') {
							materia.creditos = data.creditos;
							materia.teoPrac = data.teoPrac;
						} else {
							materia.grado = data.grado;
						}
						materia.creator = usuario._id;
						materia.save((error, materiacreada)=>{
							if (error){
								console.error(error);
								res.status(500).send({error: "hubo un error en el guardado de la materia"});
								return;
								}else{
								res.status(200).send({ok : 'se ha guardado exitosamente'});
								return;
								}
						});
					}});
				}
			});
}

function getMaterias(req,res) {
	let {data} = req.body;
	Usuario.findOne({email : data}, function(err,usuario){
		if(err) {
			res.status(500).send({error : 'algo ha ocurrido'});
			return;
		}else if(!usuario){
			res.status(500).send({error : 'algo ha ocurrido'});
			return
		}else{
			Materias.find({ creator : usuario._id}, function (err,materias) {
			if (err){
				res.status(500).send({error: "hubo un error"});
				return;
			}else{
				res.status(200).send(materias);
				return;
			}
			});}
		});
}

function getMateria(req,res) {
	let {data} = req.body;
	Materias.findOne({nombre : data.materiaName}, (err,materia)=>{
		if(err) {
			res.status(500).send({error : 'algo ha ocurrido'});
			return;
		}else if(!materia){
			res.status(500).send({error : 'No se encontró la materia'});
			return
		}else{
			Usuario.findOne({email : data.user}, (err,usuario)=>{
				if(err) {
					res.status(500).send({error : 'algo ha ocurrido'});
					return;
				}else if(!usuario){
					res.status(500).send({error : 'usuario no encontrado'});
					return
				}else{
					if(materia.creator.equals(usuario._id)){
						res.status(200).send(materia);
						return;
					}else{
						res.status(500).send({error: "La materia no es del usuario ingresado"});
						return;
					}
				}
			});
		}
	});
}
module.exports = {
	controlmaterias,
	crearMateria,
	getMaterias,
	getMateria
}

