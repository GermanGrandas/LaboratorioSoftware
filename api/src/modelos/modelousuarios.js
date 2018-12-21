"use strict"

var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var Schema = mongoose.Schema;


//creamos el respectivo esquema

var usuarioschema = Schema({
	username : String,
	Tdocumento: String,
	documento: String,
	nombre: String,
	apellido: String,
	email: String,
	genero: String,
	password: String,
	fNacimiento : String,
	pNacimiento : String,
	dNacimiento : Date,
	cNacimiento : String,
	resetPasswordToken: String,
  	resetPasswordExpires: Date
})
usuarioschema.pre('save', function(next) {
	var user = this;
	var SALT_FACTOR = 5;
  
	if (!user.isModified('password')) return next();
  
	bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
	  if (err) return next(err);
  
	  bcrypt.hash(user.password, salt, null, function(err, hash) {
		if (err) return next(err);
		user.password = hash;
		next();
	  });
	});
  });

usuarioschema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
	  if (err) return cb(err);
	  cb(null, isMatch);
	});
  };

module.exports = mongoose.model("usuarios", usuarioschema);
