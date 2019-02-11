var express = require("express");
var session = require('express-session');
var mongoose= require("mongoose");
var BodyParse = require("body-parser");
var path =require("path");
var passport = require('passport');

var app = express();


app.use(BodyParse.urlencoded({extended:false}));
app.use(BodyParse.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'iusoiuahdj',
				  proxy: true,
                  resave: true,
                  saveUninitialized: true }));
app.use("/images",express.static(path.join(__dirname, 'images')));
app.use("/static",express.static(path.join(__dirname, 'static')));
/*=========================
CARGAR RUTAS
==========================+*/
var rutaUsuario = require("./rutas/rutasusuarios.js");
var rutaMaterias = require ("./rutas/rutasmaterias.js");
var rutaEstudiantes = require("./rutas/rutasestudiantes.js")


/*==================================
RUTAS BASE
===================================*/

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

//app.use("/api", rutaEstudiantes);
app.use("/api", rutaUsuario);
app.use("/api", rutaMaterias);
app.use("/api", rutaEstudiantes);

var port = process.env.PORT || 4000;

//conexion
var config = require('../../src/config/config');
var url = config.dbUrl;


mongoose.connect(url,{useNewUrlParser: true}, (error, respuesta) => {
	if(error){
		throw error;
	}else{
		console.log("la conexion ha sido exitosa");
		app.listen(port, function(){
			console.log("servidor en http://localhost:"+port)
		});
	}
});
