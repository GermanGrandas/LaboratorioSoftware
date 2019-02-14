"use strict"



var Materias = require("../modelos/modelomaterias.js")
var Estudiantes = require("../modelos/modeloestudiantes.js");
var Usuario= require("../modelos/modelousuarios.js");

function actualizarAsistencia(req,res) {
	var parametro = req.body;
	console.log(parametro);
}

function controlestudiantes(req,res){
	var parametros= req.body.user;
	var usuario = null;
	Usuario.findOne({username : parametros},(err,result)=>{
		if(err){
			res.status(500).send({err : "algo ha ocurrido"})
			return
		}else{
			usuario = result._id
			Estudiantes.find({creator : usuario}).populate({path : 'materiapertenece' ,select: 'nombre'}).exec(
				(err, results)=>{
					if(err){
						res.status(500).send({err : "algo ha ocurrido"})
						return
					}else{
						let x = results.map(item=>{
							let dicti = {}
							dicti['documentoestudiante'] = item['documentoestudiante']
							dicti['nombre'] = item['nombre']
							dicti['apellido'] = item['apellido']
							dicti['telefono'] = item['telefono']
							dicti['direccion'] = item['direccion']
							dicti['correo'] = item['correo']
							dicti['asistencia'] = item['asistencia']
							dicti['materias'] = item['materiapertenece'].map( item=>{
								return item.nombre
							});
							return dicti
						});
						res.status(200).send(x)
						return									
					}
				}
			);
		}
	});	
}

function matricularestudiante(req,res){
	var parametros= req.body;
	Promise.all([
			Estudiantes.findOne({documentoestudiante: parametros.documentoestudiante}),
			Materias.findOne({codigodemateria: parametros.codigodemateria})

		]).then(([r1,r2])=>{
			if(r2){
				if(r1){
					if(r1.materiapertenece.indexOf(r2._id)>-1){
						res.status(500).send({mensaje:"este estudiante ya esta registrado"})
					}
					else{

						r1.materiapertenece.push(r2._id);
						Estudiantes.findByIdAndUpdate(r1._id, r1, (error, estudiantematriculado)=>{
						if(error){
							res.status(500).send({error: "hubo un error"})
							return
						}
						else if(!estudiantematriculado){
							res.status(404).send({mensaje:"no se ha podido matricular el estudiante"})
						}
						else{
							res.status(200).send(estudiantematriculado)
						}
					})
					}
				}
			}
			else{
				res.status(500).send({mensaje:"este codigo no corresponde a ninguna materia"})
			}
		})
}


function crearEstudiante(req,res){
	var parametros = req.body.data.data;
	var user = req.body.data.user
	Promise.all([
			Estudiantes.findOne({documentoestudiante: parametros.codigo}),
			Materias.findOne({nombre:parametros.materiapertenece}),
			Usuario.findOne({username : user})
		]).then( ([r1,r2,r3])=>{
			if(r1){
				res.status(500).send({error:"El estudiante ya fue creado."})
				return
			}else if(!r2){
				res.status(500).send({error:"La materia no existe"})
				return
			}else if(!r3){
				res.status(500).send({error:"El usuario no existe"})
				return
			}
			else{
				var estudiante = new Estudiantes();
				estudiante.documentoestudiante = parametros.codigo;
				estudiante.nombre=parametros.nombre;
				estudiante.apellido= parametros.apellido;
				estudiante.telefono=parametros.telefono;
				estudiante.direccion=parametros.direccion;
				estudiante.correo= parametros.correo;
				estudiante.asistencia = 0;
				//fotodelestudiante esto en standby
				estudiante.materiapertenece = r2._id;
				estudiante.creator = r3._id;
				estudiante.save((error,estudiantecreado)=>{
					if(error){
						res.status(500).send({err:"error al crear estudiante"})
						return;
					}
					else{
						var estudiantesList = r2.estudiantes;
						estudiantesList.push(estudiantecreado._id);
						Materias.findOneAndUpdate({_id :r2._id},{estudiantes : estudiantesList},
							(err,result)=>{
								if(err){
									res.status(500).send({error:"error al vincular el estudiante"})
									return;
								}else{
									res.status(200).send('ok');
									return;
								}
							})
						
					}
		
				});
			}
		});
}


function desvincularestudiante(req,res){
	var	parametros= req.body;
	console.log("hola");
	Promise.all([
			Estudiantes.findOne({documentoestudiante: parametros.documentoestudiante}),
			Materias.findOne({codigodemateria:parametros.codigodemateria})
		]).then(([r1,r2])=>{
			if(r2){
				if(r1){
					if(r1.materiapertenece.indexOf(r2._id)>-1){
						console.log(r1.materiapertenece.indexOf(r2._id));
						r1.materiapertenece.splice(r1.materiapertenece.indexOf(r2._id),1);
						Estudiantes.findByIdAndUpdate(r1._id,r1, (error, estudiantedesvinculado)=>{
							if(error){
								res.status(500).send({error: "hubo un error"})
								return
							}
							else if(!estudiantedesvinculado){
								res.status(404).send({mensaje:"no se ha podido matricular el estudiante"})
							}
							else{
								res.status(200).send(estudiantedesvinculado)
							}
						})	
						
					}
					else{
						res.status(500).send({mensaje:"este estudiante no esta matriculado en esta materia"})
						return;
					}
				}
				else{
					res.status(500).send({mensaje:"este estudiante no existe en la base de datos"})
					return;
				}
			}
			else{
				res.status(500).send({mensaje:"este codigo de materia no existe"})
				return;
			}
	})

}	


function estudiantesMateria(req,res){
	var params = req.body
	console.log(params);
}


/*
function getestudiante(req,res){
	console.log("hola munod")
	Estudiantes.find({nombre:"Rafael"},(error, resp) =>{
		if (error){
			res.status(500).send({mensaje: "error"})
		}

		else{
			console.log(resp)
			res.status(200).json(resp)
		}
	})
}

function crearestudiantes (req,res){
	//let {nombre} = req.body;
	//console.log(req.body);
	//console.log(nombre)
	//res.status(200).send({mensaje: "ñejes"})

	var estudiante = new Estudiantes();
	var parametros = req.body;

	if (parametros.find.One)

	estudiante.documentoestudiante= parametros.documentoestudiante;
	estudiante.nombre= parametros.nombre;
	estudiante.apellido = parametros.apellido;
	estudiante.telefono = parametros.telefono;
	estudiante.direccion = parametros.direccion;
	estudiante.correo = parametros.correo;

	estudiante.save((error,estudianteguardado)=>{
		if (error){
			res.status(500).send({mensaje: "hubo un error en el guardado del estudiante"})
		}
		else{
			res.status(200).send({estudianteguardado})
		}
	})

	/*documentoestudiante: String,
	nombre: String,
	apellido: String,
	telefono: Stri	ng,
	direccion: String,
	correo: String,
	fotodelestudiante: String <-- queda pendiente la de subir foto del estudiante
}

function actualizarestudiante (req,res){
	var id= req.params.id;
	var actualizar = req.body;
                 
	Estudiantes.findByIdAndUpdate(id, actualizar, (error, EstudianteActualizado)=>{
		if(error){
			return res.status(500).send({mensaje: 'error al actualizar el estudiante'})
		}
		else{
			if(!EstudianteActualizado){
				res.status(404).send({mensaje:'No se ha podido actualizar el usuario'})
			}
			else{
				res.status(200).send({EstudianteActualizado})
			}
		}
	})
}

function Eliminarestudiante (req,res){
	var id= req.params.id;
	
	Estudiantes.findByIdAndRemove (id,(error,estudianteBorrado)=>{
		if(error){

			res.status(500).send({mensaje:"Error al borrar el estudiante"})

		}else{

			if(!estudianteBorrado){

				res.status(404).send({mensaje: "No se ha podido eliminar el estudiante"})

			}else
			{
				res.status(200).send({estudianteBorrado})
			}
		}
	})	
}
*/
module.exports = {
	controlestudiantes,
	crearEstudiante,
	matricularestudiante,
	desvincularestudiante,
	actualizarAsistencia,
	estudiantesMateria
}