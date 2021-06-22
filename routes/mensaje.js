//Rutas para amigos
const express = require('express');
const mensajeController = require('../controllers/mensajeController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/:receptorid', auth, mensajeController.enviarMensaje);
// router.get('/', auth, mensajeController.consultarPublicaciones);;
// router.put('/:id', auth, mensajeController.editarPublicacion);
// router.delete('/:id', auth, publicacionesControllers.eliminarPublicacion);

module.exports = router;
