/**
 * Archivo de configuración de la aplicación
 * @module config
 */

 module.exports = {
	 dbUrl : "mongodb://grandas:98020655860@ds111123.mlab.com:11123/prueba",
	 captchaDev : "6LdwoGoUAAAAAOIjSUoj1TO5KKeDEt-TBKs2oHXz",
     particlesParams : {
        "particles": {
	        "number": {
	            "value": 160,
	            "density": {
	                "enable": false
	            }
	        },
	        "size": {
	            "value": 10,
	            "random": true
	        },
	        "move": {
	            "direction": "bottom",
	            "out_mode": "out"
	        },
	        "line_linked": {
	            "enable": false
	        }
	    },
	    "interactivity": {
	        "events": {
	            "onclick": {
	                "enable": true,
	                "mode": "remove"
	            }
	        },
	        "modes": {
	            "remove": {
	                "particles_nb": 10
	            }
	        }
	    }
	} 
}