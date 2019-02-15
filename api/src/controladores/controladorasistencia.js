"use strict"

var Asistencia = require("../modelos/modeloasistencia.js");
var Materias = require("../modelos/modelomaterias.js");
var Estudiantes = require("../modelos/modeloestudiantes.js");

function getAsistencia(req,res){
    let {documentoestudiante} = req.body.estudiante;    
    Asistencia.find({})
    .populate({path :'estudiante',select : 'documentoestudiante'})
    .populate({path : 'materia',select : 'nombre'})
    .exec((err,resultados)=>{
        if(err){
            res.status(500).send({error: "hubo un error"});
            return;
        }else{
            let data = resultados.map(items =>{
                if(items.estudiante.documentoestudiante === documentoestudiante){
                    let sData = {}
                    sData['documentoestudiante'] = documentoestudiante;
                    sData['nombreMateria'] = items.materia.nombre;
                    sData['porcentaje'] = (items.diasAsistidos/items.totalDias)*100;
                    return sData
                    }
                });
            res.status(200).send(data);
            return;
        }
    })
}
function updateAsistencia(req,res){
    let {documentoestudiante , materia } = req.body.estudiante;
    
    Promise.all([
        Asistencia.find({}),
        Materias.findOne({nombre : materia}),
        Estudiantes.findOne({documentoestudiante})
    ]).then(([r1,r2,r3])=>{
            let data = r1.map(
                item =>{
                    if(item.estudiante.equals(r3._id)){
                        item.diasAsistidos = item.diasAsistidos+1;
                        return item
                    }
                }
            )
            Asistencia.findOneAndUpdate({id : r1._id},data[0],(err, result)=>{
                if(err){
                    res.status(500).send({error: "hubo un error"});
					return;
                }else{
                    Asistencia.find({}).populate({path :'estudiante',select : '_id'}).exec(
                        (err,resultados)=>
                        {
                            let data = resultados.map(items =>{
                                if(items.estudiante._id.equals(r3._id)){
                                    let sData = {}
                                    sData['documentoestudiante'] = documentoestudiante;
                                    sData['nombreMateria'] = r2.nombre;
                                    sData['porcentaje'] = (items.diasAsistidos/items.totalDias)*100;
                                    return sData
                                }
                                
                            });
                            res.status(200).send(data);
					        return;
                        }
                    ); 
                }
            });
    });
}

function createAsistencia(req,res) {
    let {documentoestudiante , materias } = req.body.estudiante;
    materias.map(
        materia =>{
            Materias.findOne({nombre : materia}).populate({path : 'estudiantes', select : ['_id','documentoestudiante']})
            .exec(
                (err,resultado)=>{
                    resultado.estudiantes.map(
                        estudiante =>{
                            if(estudiante.documentoestudiante ===documentoestudiante){
                                let asistencia = new Asistencia()
                                asistencia.totalDias = resultado.dias;
                                asistencia.diasAsistidos = 1;
                                asistencia.materia = resultado._id;
                                asistencia.estudiante = estudiante._id;
                                asistencia.save((err,guardado)=>{
                                    if(err){
                                        res.status(500).send({error: "hubo un error"});
					                    return;
                                    }else{
                                        let sData = {}
                                        sData['documentoestudiante'] = documentoestudiante;
                                        sData['nombreMateria'] = resultado.nombre;
                                        sData['porcentaje'] = (guardado.diasAsistidos/guardado.totalDias)*100;
                                        res.status(200).send([sData]);
                                        return;
                                    }
                                })
                            }
                        }
                    )
                }
            )
            
        }
    )
}
module.exports = {
	getAsistencia,
    updateAsistencia,
    createAsistencia
}