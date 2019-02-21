"use strict"

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var agendaSchema = Schema ({

    name : String,
    startDateTime : Date,
    endDateTime : Date,
	materia :{ type : Schema.Types.ObjectId, ref : "materias"},
	classes : String
})

module.exports = mongoose.model("agenda", agendaSchema);