
var Usuario= require("../modelos/modelousuarios.js");

var token = require('../token/token');
var correoautenticacion = require("../tokens/autenticationemail.js");
//para poder encriptar 
var bcrypt = require("bcrypt-nodejs");
var nodemailer = require("nodemailer");

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

function actualizarusuario(req,res){
	//llamamos por parametro el atributo que queremos modificar
	console.log("hola mundo")

	var id = req.params.id;

	//tomamos los datos del formulario
	var actualizar = req.body;

	if(id != req.usuariotoken.sub){

		console.log(id)
		console.log(req.usuariotoken.sub)

		return res.status(500).send({mensaje: "no tienes permisos para actualizar este usuario"})
	}

	//recorremos la base de datos con el metodo findByIdAndUpdate

	Usuario.findByIdAndUpdate(id, actualizar, (error, usuarioactualizado)=>{

		if(error){
			res.status(500).send({mensaje: "error al actualizar"})
		}
		else{
			if(!usuarioactualizado){
				res.status(404).send({mensaje:" no se ha podido generar los cambios"})
			}

			else{
				res.status(200).send(usuarioactualizado)
			}
		}
	})
}

function cambiarcontrasena(req,res){
	var parametros = req.body;
	var correo = parametros.email;
	Usuario.find({email:correo}, (error,correoencontrado)=>{
		if(error){
			console.log("hola mundo")
			res.status(404).send({mensaje: "no se puede acceder a la peticion"})
		}
		else{
			if(!correoencontrado){
				console.log("hooooooooolaaaaaaaa")
				res.status(500).send({mensaje:"el correo no existe en la base de datos"})
			}
			else{
				//definimos el transporte
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth:{
						user: 'nodejs1234npmstart@gmail.com',
						pass: '1234jhoan'
					},
					tls: {
						rejectUnauthorized : false
					}
				}
			);
				//definimos el destino
				var mailOption = {
					from: 'nodejs',
					to: 'mansleobenitez@gmail.com',
					subjet: 'test',
					text: "omita este mensaje"
				};

				//enviamos el email

				transporter.sendMail(mailOption, function(error, info){
					if(error){
						console.log(error)
						res.status(500).send({correoencontrado})
					}
					else{
						console.log("mensaje enviado")
						res.status(200).json(parametros)
					}
				})

			}

		}
	})


}


//exportamos los metodos

module.exports = {
	controladorusuario,
	crearUsuario,
	loginUsuario,
	getusuario,
	actualizarusuario,
	cambiarcontrasena
}