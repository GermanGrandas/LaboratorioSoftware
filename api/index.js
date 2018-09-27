"use strict"

//utilizamos mongoose como libreria para intermediar con la base de datos de mongodb
//cargamos la libreria utilizando require


var mongoose= require("mongoose");
 

/*===========================
MODULO EXPRESS
============================*/

var app=require("./app.js");
//esto es para establecer la variable de entorno PORT( puerto http)
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