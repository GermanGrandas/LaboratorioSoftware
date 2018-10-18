"use strict"

//requerimos la dependencia jwt-simple para crear el token

//npm install jwt-simple --save
var token = require("jwt-simple");

//moment: esta dependencia nos permite hacer registro de fecha de creacion del token y la fecha de expiracion de ese mismo token

//npm install moment --save 
var momento=require("moment");

//con esta clave secreta podemos decodificar el token

var clavesecreta = "clave_secreta";

/*==========================
Metodo del token
===========================*/

exports.crearToken= function(usuarioencontrado){
	var cargartoken= {
		// se usa para guardar la id del objeto
		sub: usuarioencontrado._id,
		nombre: usuarioencontrado.nombre,
		correo: usuarioencontrado.correo,
		// unix() formato timestamp actual
		now: momento().unix(),
		exp: momento().add(1, "days").unix()
	}
	//devolvemos el token codificado
	return token.encode(cargartoken, clavesecreta)
	  
}