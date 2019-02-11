
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

function crearUsuario(req,res,next){
			var usuario = new Usuario();

			var parametros = req.body;
			var {user} = parametros;
			usuario.Tdocumento= user.Tdocumento;
			usuario.documento= user.documento;
			usuario.nombre = user.nombre;
			usuario.apellido = user.apellido;
			usuario.genero = user.genero;
			usuario.fNacimiento = user.fechaNacimiento;
			usuario.pNacimiento = user.paisNacimiento;
			usuario.dNacimiento = user.regionNacimiento;
			usuario.cNacimiento = user.ciudadNacimiento;
			usuario.email = user.email;
			usuario.username= usuario.nombre+"."+usuario.apellido;

			if(!user.password){
				res.status(500).json({error :'No se encontró una contraseña'});
		  	return;
				
			}else{
				usuario.password=user.password;
			}
			Promise.all([
				Usuario.findOne({email:usuario.email}),
				Usuario.findOne({documento : usuario.documento}),
				Usuario.findOne({username : usuario.username})
			]).then(([r1,r2,r3])=>{
				if(r1) {
					res.status(500).send({error: "El email ingresado ya se encuentra registrado"});
					return
				}else if(r2){
					res.status(500).send({error: "El Documento ingresado ya se encuentra registrado"});
					return
				}else if(r3){
					usuario.username = usuario.username+String(Math.floor(Math.random()*999) + 100);
					usuario.save((err, usuarioguardado)=>{
						if (err){
							res.status(500).send({mensaje: "hubo un error en el guardado de usuario"})
							return
						}
						else{
							res.status(200).send({usuarioguardado});
					}});
				}
				else{
					usuario.save((err, usuarioguardado)=>{
						if (err){
							res.status(500).send({mensaje: "hubo un error en el guardado de usuario"})
							return
						}
						else{
							res.status(200).send({usuarioguardado});
						}
					})
				}
			});
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
			res.status(200).json({token: token.crearToken(user),user : user.username});
			return;
		});
	  })(req, res, next);
}

function actualizarusuario(req,res){
	var id = req.params.id;
	var actualizar = req.body;
	if(id !== req.usuariotoken.sub){
		console.log(req.usuariotoken.sub)
		return res.status(500).send({mensaje: "no tienes permisos para actualizar este usuario"})
	}
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
				from: 'cambiarcontrasena@docenthelper.com',
				subject: 'Cambio Contraseña de Docent Helper',
				text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
				  'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
				  'http://docentHelper.com/reset/' + token + '\n\n' +
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
	actualizarusuario,
	cambiarcontrasena,
	reset,
	guardarCambio
}