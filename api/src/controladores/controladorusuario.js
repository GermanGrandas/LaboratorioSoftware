
var Usuario= require("../modelos/modelousuarios.js");
var crypto = require('crypto');
var token = require('../token/token');
//var correoautenticacion = require("../token/tokencorreo.js");
//para poder encriptar 
var bcrypt = require("bcrypt-nodejs");
var nodemailer = require("nodemailer");
var async = require('async');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

passport.use('login',new LocalStrategy({usernameField: 'credentials[email]',passwordField: 'credentials[password]'},function(email, password, done) {	
	Usuario.findOne({ email:email}, function(err, user) {
	  if (err) return done(err);
	  if (!user) return done(null, false, { message: 'Email Incorrecto.' });
	  user.comparePassword(password, function(err, isMatch) {
		if (isMatch) {
		  return done(null, user);
		} else {
		  return done(null, false, { message: 'Contraseña Incorrecta.'});
		}
	  });
	});
  }));

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
	Usuario.findById(id, function(err, user) {
	  done(err, user);
	});
  });

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

function loginUsuario(req,res,next){
	passport.authenticate('login', function(err, user, info) {
		if (err) return next(err)
		if (!user) {
			res.status(500).json({error :info});
		  return;
		}
		req.logIn(user, function(err) {
		  if (err) return next(err);
			res.status(200).json({token: token.crearToken(user),user : user.email});
			return;
		});
	  })(req, res, next);
	/** var parametros = req.body;
	var documento=parametros.credentials.documento;
	var email=parametros.credentials.email;
	var password= parametros.credentials.password;
	
	Usuario.findOne({email:email,documento : documento}, (error, usuarioencontrado)=>{
		if(error){
			res.status(500).send({documento: "error al encontrar al usuario"})
		}
		else{
			if(!usuarioencontrado){

				res.status(404).json({err :
					{errN: " el usuario no existe o no ha sido creado"}})
			}
			else{

				bcrypt.compare(password, usuarioencontrado.password, function(error, ok){
					if(error) throw error;
					if (ok){
						if(!parametros.token){

							//Devolvemos un token de JWT
							let userC = {
								_id : usuarioencontrado._id,
								nombre : usuarioencontrado.nombre,
								apellido : usuarioencontrado.apellido,
								documento : usuarioencontrado.documento,
								email : usuarioencontrado.email,
							}
							res.status(200).json({token: token.crearToken(usuarioencontrado), userC});
						}
					}
					else{
						res.status(404).json({err: "El usuario no ha podido ingresar"})
					}
				})
			}
		}
	})
	*/

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

	if(id !== req.usuariotoken.sub){

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

function cambiarcontrasena(req,res,next){
	async.waterfall([
		function(done) {
		  crypto.randomBytes(20, function(err, buf) {
			var token = buf.toString('hex');
			done(err, token);
		  });
		},
		function(token, done) {

			Usuario.findOne({ email: req.body.credentials.email }, function(err, user) {
			  if (!user) {
				//req.flash('error', 'No account with that email address exists.');
					res.status(404).send({mensaje: "No existe un usuario con ese correo"});
					return;
			  }
			  user.resetPasswordToken = token;
			  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
	  
			  user.save(function(err) {
				done(err, token, user);
			  });
			});
		  },
		  function(token, user, done) {
			var smtpTransport = nodemailer.createTransport({
			  service: 'Gmail',
			  auth: {
				user: 'nodejs1234npmstart@gmail.com',
				pass: '1234jhoan'
			  },
			  tls: {
				  rejectUnauthorized : false
			  }
			});
			//'http://' + req.headers.host + '/reset/' + token + '\n\n' +
			var mailOptions = {
				to: user.email,
				from: 'cambiarcontrasena@docenthelper.me',
				subject: 'Cambio Contraseña de Docent Helper',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				  'http://localhost:3000/reset/' + token + '\n\n' +
				  'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			  };
			  smtpTransport.sendMail(mailOptions, function(err) {
				//req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
				if(user){
					res.status(200).send({Mensaje: "Se ha enviado un correo a la dirección de email proporcionada"});
					return;
				}
				done(err, 'done');
			  });
			}
		  ], function(err) {
			if (err) return next(err);
				res.status(400).send({Mensaje: "Algo ha ocurrido"});
				return;
		  });
}


//exportamos los metodos
function reset(req,res){
	Usuario.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
		if (!user) {
			res.status(500).send({error : 'Password reset token is invalid or has expired.'}); 
		}
		res.status(200).send({message : 'Ok'})
	  });
}

function guardarCambio(req,res){
	
	async.waterfall([
		function(done) {
			let { data , token } = req.body.data;
			
		  Usuario.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				res.status(500).send({error : 'El token enviado es inválido o no coíncide.'}); 
				return;
			}
			
			user.password = data;
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
	
			user.save(function(err) {
			  req.logIn(user, function(err) {
					done(err, user);
			  	});
				});
		  });
		},
		function(user, done) {
		  var smtpTransport = nodemailer.createTransport({
			service: 'Gmail',
			  auth: {
				user: 'nodejs1234npmstart@gmail.com',
				pass: '1234jhoan'
			  },
			  tls: {
				  rejectUnauthorized : false
			  }
		  });
		  var mailOptions = {
			to: user.email,
			from: 'cambiarcontrasena@docenthelper.me',
			subject: 'Cambio Contraseña de Docent Helper',
			text: 'Hello,\n\n' +
			  'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
		  };
		  smtpTransport.sendMail(mailOptions, function(err) {
			if(user){
				res.status(200).send({Message : 'La contraseña ha sido cambiada correctamente'});
				return;
			}
			done(err);
		  });
		}
	  ], function(err) {
				if (err) return err;
				res.status(500).send({message : 'Algo ha ocurrido'});
				return
	  });
}
module.exports = {
	controladorusuario,
	crearUsuario,
	loginUsuario,
	getusuario,
	actualizarusuario,
	cambiarcontrasena,
	reset,
	guardarCambio
}