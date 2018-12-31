"use strict"
var Materias = require("../modelos/modelomaterias.js");
var Usuario= require("../modelos/modelousuarios.js");

var async = require('async');

function controlmaterias(req,res){

	res.status(200).send({mensaje: "probando controlador de materias y no el de usuarios"})
}

function crearMateria(req,res){
	async.waterfall([
		function(done){
			let {data} = req.body.data;
			Materias.find({codigo : data.codigo ,nombre : data.nombre },function (err,materia) {
				if(err) {
					res.status(500).send({error : 'algo ha ocurrido'});
					return;
				}else if(materia.length !== 0 ){
					res.status(500).send({ error : 'la materia ya fue creada'});
					return
				}else{
					done();
				}
			});
		},
		function(done){
			let {user} = req.body.data;			
			Usuario.findOne({email : user},function(err,usuario){
				if(err) {
					res.status(500).send({error : 'algo ha ocurrido'});
					return;
				}else if(usuario.length === 0 ){
					res.status(500).send({error : 'algo ha ocurrido'});
					return
				}else{
					done(err,usuario);
				}	
			})
		},
		function(usuario,done){
			var materia = new Materias();
			var {data} = req.body;			
			materia.codigo = data.data.codigo;
			materia.nombre = data.data.nombre;
			materia.year = data.data.year;
			materia.datesRange = data.data.datesRange;
			materia.tipoM = data.data.tipoM;
			materia.dias = data.data.dias;
			materia.hFin = data.data.hFin;
			materia.hInicio = data.data.hInicio;
			materia.institucion = data.data.institucion;
			if (materia.tipo === 'universidad') {
				materia.creditos = data.data.creditos;
				materia.teoPrac = data.data.teoPrac;
			} else {
				materia.grado = data.data.grado;
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
		}], function(err) {
				if (err) return err;
				res.status(500).send({message : 'Algo ha ocurrido'});
				return
  	});
}

function getMaterias(req,res) {
	async.waterfall([
		function(done){
			let {data} = req.body;			
			Usuario.findOne({email : data}, function(err,usuario){
				if(err) {
					res.status(500).send({error : 'algo ha ocurrido'});
					return;
				}else if(usuario.length === 0 ){
					res.status(500).send({error : 'algo ha ocurrido'});
					return
				}else{
					done(err,usuario);
				}
			});
		},
		function(usuario,done){
			Materias.find({ creator : usuario._id}, function (err,materias) {
				if (err){
					res.status(500).send({error: "hubo un error"});
					return;
				}else{
					res.status(200).send(materias);
					return;
				}
			});
		}], function(err) {
			if (err) return err;
			res.status(500).send({message : 'Algo ha ocurrido'});
			return
  });
	
	
}
module.exports = {
	controlmaterias,
	crearMateria,
	getMaterias
}

