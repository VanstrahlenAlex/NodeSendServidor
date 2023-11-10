const express = require('express');
const router = express.Router();
const enlacesController = require('../controllers/enlacesController');
const archivosController = require('../controllers/archivosController');

const { check} = require('express-validator');
const auth = require('../middleware/auth.js');

router.post('/',
    [
        check('nombre', 'Sube un Archivo').not().isEmpty(),
        check('nombre_original', 'Sube un Archivo').not().isEmpty(),
    ],  
    auth,
    enlacesController.nuevoEnlace
);

router.get('/:url', 
    enlacesController.obtenerEnlace,
    archivosController.eliminarArchivo,

)

module.exports = router;