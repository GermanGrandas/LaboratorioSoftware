
var Usuario= require("../modelos/modelousuarios.js");

//para poder encriptar 
var bcrypt = require("bcrypt-nodejs")
var token = require('../token/token');


function controladorusuario(req,res){
	res.status(200).send({mensaje: "probando controlador de usuarios"})
}

function crearUsuario(req,res){

	var usuario = new Usuario();

	var parametros = req.body;
	usuario.nombre = parametros.user.nombre;
	usuario.apellido= parametros.user.apellido;
	usuario.documento= parametros.user.documento;
	usuario.tipodedocumento= parametros.user.Tdocumento;
	usuario.email = parametros.user.email;
	
	if(parametros.user.password){
		bcrypt.hash(parametros.user.password, null, null, function(error, hash){
			usuario.password=hash;
			if (parametros.user.nombre != null){
				usuario.save((error, usuarioguardado)=>{
					if (error){
						console.log(error)
						res.status(500).send({mensaje: "hubo un error en el guardado de usuario"})
					}
					else{
						console.log(usuarioguardado);
						
						res.status(200).send({usuarioguardado})

					}
				})
			}
		})
	}
	}

function loginUsuario(req,res){
	var parametros = req.body;
	var documento=parametros.credentials.documento;
	var email=parametros.credentials.email;
	var password= parametros.credentials.password;
	
	Usuario.findOne({email:email,documento : documento}, (error, usuarioencontrado)=>{
		if(error){
			res.status(500).send({documento: "error al encontrar al usuario"})
		}
		else{
			if(!usuarioencontrado){

				res.status(404).json({err: " el usuario no existe o no ha sido creado"})
			}
			else{

				bcrypt.compare(password, usuarioencontrado.password, function(error, ok){
					if(error) throw error;
					if (ok){
						if(!parametros.token){

							//Devolvemos un token de JWT
							res.status(200).json({token: token.crearToken(usuarioencontrado)});
						}
					}
					else{
						res.status(404).json({err: "El usuario no ha podido ingresar"})
					}
				})
			}
		}
	})


}

function getusuario(req,res){
	Usuario.find({nombre:"Jhoan Sebastian"},(error, resp) =>{
		if (error){
			res.status(500).send({mensaje: "error"})
		}

		else{
			console.log(resp)
			res.status(200).json(resp)
		}
	})
}





//exportamos los metodos

module.exports = {
	controladorusuario,
	crearUsuario,
	loginUsuario,
	getusuario
}