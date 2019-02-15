"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var asistenciaSchema = Schema ({

    totalDias : Number,
    diasAsistidos : Number,
	materia :{ type : Schema.Types.ObjectId, ref : "materias"},
	estudiante : {type : Schema.Types.ObjectId, ref : 'estudiante'}
})

module.exports = mongoose.model("asistencia", asistenciaSchema);