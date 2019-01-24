"use strict"

//cargamos la dependencia de express
var express = require("express");

//cargamos el modulo del controlador
var ControladorDeUsuarios = require("../controladores/controladorusuario.js");
//var authentication = require("../token/aut.js");

//cargar el router de express js y con esto podemos crear rutas para nuestra API
var api = express.Router();

//creamos la ruta con el metodo get, para pasar el metodo que va a tener que cargar la pagina cuando hagamos la peticion http de esa ruta

api.get("/usuarios" ,ControladorDeUsuarios.controladorusuario)


api.get('/',(req,res)=>{
	res.status(404).send("no usado");
})
//creamos la ruta para crear usuarios y usamos el metodo POST. el metodo post sirve para crear informacion

api.post("/crear-usuarios", ControladorDeUsuarios.crearUsuario)


api.post("/login", ControladorDeUsuarios.loginUsuario)

api.post("/recuperar-contrasena", ControladorDeUsuarios.cambiarcontrasena)

api.get('/resetP/:id', ControladorDeUsuarios.reset)
api.post('/resetP',ControladorDeUsuarios.guardarCambio)
api.put("/actualizar-usuario/:id", ControladorDeUsuarios.actualizarusuario)
//exportamos api

module.exports= api;