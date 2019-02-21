"use strict"

var express = require("express");

var ControladorAgenda = require("../controladores/controladorAgenda");

var api = express.Router();

api.post('/getAgenda',ControladorAgenda.getAgenda);
api.post('/addEntry',ControladorAgenda.addEntry);
api.post('/deleteEntry',ControladorAgenda.deleteEntry);
api.post('/updateEntry',ControladorAgenda.updateEntry);
module.exports=api;