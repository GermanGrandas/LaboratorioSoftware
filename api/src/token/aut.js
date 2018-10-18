"use stritc"

var token = require("jwt-simple");
var momento = require("moment");
var clave = "clave_secreta";


/*------------------------
	METODO DE AUTENTICACION
==========================*/

//creamos un middleware

function autenticacion(req, res, next){

	if(!req.headers.authorization){
		res.status(403).send({mensaje: " la peticion no tiene cabecera de autenticacion"})
	}
	else{
		//quitamos las comillas " del token con el metodo replace
		//en replace debe ir una expresion regular para eliminar en este caso las comillas dobles (se inicia con  barra diagonal / y finalizamos con g) y el campo por el cual vamos a reemplazar las comillas

		var tokenenviado = req.headers.authorization.replace(/['"]+/g, '')

		//sentencia manejo de excepciones
		//la sentencia try... catch marca un bloque de instrucciones a intentar que pueden causar alguna excepcion, y declarar una o mas respuestas en caso de que una excepcion sea arrojada. si una excepcion es arrojada, la sentencia try... catch se encarga de atraparla


		try{

			var cargartoken = token.decode(tokenenviado, clave);

			//comparar la fecha actual con la expiracion del token

			if(cargartoken.exp <= momento().unix()){

				return res.status(403). send({mensaje: "el token ha expirado"})
			}

			//un bloque catch es usado para capturar todas las excepciones que pueden ser generados en el bloque try (prueba).

		}catch(excepcion){
			console.log(excepcion)
			return res.status(403).send({mensaje: "el token no es valido"})
		}

		req.usuariotoken = cargartoken;
		next();
	}
}

module.exports = {
	autenticacion
}