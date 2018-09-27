"use strict"

//npm install express --save
var express = require("express");

// npm install body-parser --save
var BodyParse = require("body-parser");

//la variable app es el objeto de express
// esto va a ser el motor de la aplicacion del backend porque va a recibir las peticiones http, vamos a poder crear controladores, vamos a poder crear rutas, vamos a poder crear todas las cosas fundamentales dentro de un framework de desarrollo nivel backend

var app = express();

//esto me permite convertir a objetos json los datos que llegan por peticiones http
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
//el metodo get() es una referencia de express para poder habilitar la aplicacion en el puerto establecido
//se ponen dos parametros, el primero la ruta de la aplicacion (/pruebas para este caso), el segundo una funcion con dos parametros internos, un primer parametro que es la solicitud, es decir lo que va a recibir de la peticion y luego un segundo parametro con la respuesta que es lo que va a devolver


//app.get("/pruebas", function(req,res){
	//enviamos el estado de la respuesta, existen varios estados, los mas comunes:
	//200 OK
	//404 peticion no encontrada
	//500 error interno del servidor

//	res.status(200).send({message:"bienvenido"})
//}
app.get('',(req,res)=>{
	res.status(200).send("hola mundo");
})
app.use("/api", rutaEstudiantes);
app.use("/api", rutaUsuario);
app.use("/api", rutaMaterias);

//la accion module.exports es de express.js para que el modulo pueda ser usado en otros archivos
module.exports = app;