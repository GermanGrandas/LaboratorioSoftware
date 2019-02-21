"use strict"

var Agenda = require("../modelos/modeloagenda.js");
var Materias = require("../modelos/modelomaterias.js");

function getAgenda(req,res) {
    const {materia} = req.body;
    
    Agenda.find({}).populate({path : 'materia', select :'nombre'}).exec(
        (err,result)=>{
            if(err){
                res.status(500).send({error: "hubo un error"});
                return;
            }
            else{
                let list = result.map(
                    resultado =>{
                        if(resultado.materia.nombre === materia){
                            return {_id : resultado._id ,name : resultado.name,startDateTime : resultado.startDateTime ,endDateTime : resultado.endDateTime,classes : resultado.classes}
                        }else{
                            return
                        }
                    }
                );
                res.status(200).send(list);
				return;
            }
        }
    );  
}

function addEntry(req,res) {
    let { activo, newItems} = req.body.materia;
    
    
    var agenda = new Agenda();
    agenda.name = newItems.name;
    agenda.startDateTime = newItems.startDateTime;
    agenda.endDateTime = newItems.endDateTime;
    agenda.classes = newItems.classes;
    
    Materias.findOne({nombre : activo},(err,result)=>{
        if(err){
            res.status(500).send({error: "hubo un error"});
            return;
        }else{
            agenda.materia = result._id;
            agenda.save((err,resultado)=>{
                if(err){
                    res.status(500).send({error:"error al crear la agenda"})
                    return;
                }else{
                    res.status(200).send(resultado);
					return;
                }
            });
        }
    })
    
}

function deleteEntry(req,res) {
    
}

function updateEntry(req,res) {
    
}

module.exports = {
    getAgenda,
    addEntry,
    deleteEntry,
    updateEntry
}