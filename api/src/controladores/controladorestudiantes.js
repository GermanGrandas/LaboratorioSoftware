"use strict"


var Estudiantes = require("../modelos/modeloestudiantes.js");

function controlestudiantes(req,res){
	res.status(200).send({mensaje:"probando controlador de estudiantes para diferenciar del de materias y usuarios"})
}
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
	var estudiante = Estudiantes();
	var parametros = req.body;
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
	telefono: String,
	direccion: String,
	correo: String,
	fotodelestudiante: String <-- queda pendiente la de subir foto del estudiante*/
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

module.exports = {
	controlestudiantes,
	crearestudiantes,
	actualizarestudiante,
	getestudiante,
	Eliminarestudiante
}