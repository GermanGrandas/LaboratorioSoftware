"use strict"

var express = require("express");
var mongoose= require("mongoose");
var BodyParse = require("body-parser");
var path =require("path");


var app = express();
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(BodyParse.urlencoded({extend:false}));
app.use(BodyParse.json());


/*=========================
CARGAR RUTAS
==========================+*/
var rutaUsuario = require("./rutas/rutasusuarios.js");
var rutaMaterias = require ("./rutas/rutasmaterias.js");
var rutaEstudiantes = require("./rutas/rutasestudiantes.js")


/*==================================
RUTAS BASE
===================================*/

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "./index.html"));
  });
app.use("/api", rutaEstudiantes);
app.use("/api", rutaUsuario);
app.use("/api", rutaMaterias);

var port = process.env.PORT || 4001;

//conexion

mongoose.connect("mongodb://grandas:98020655860@ds111123.mlab.com:11123/prueba", (error, respuesta) => {

		if(error){
			throw error;
		}else{
			console.log("la conexion ha sido exitosa");
		
		//el metodo listen () es una referencia de express.js para traer dos parametros, el puerto y la accion con el puerto.

		app.listen(port, function(){
			console.log("servidor de la api en http://localhost:"+port)
			})
		}
})