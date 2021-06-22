//Rutas para amigos
const express = require('express');
const publicacionesControllers = require('../controllers/publicacionesControllers');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, publicacionesControllers.crearPublicacion);
router.get('/', auth, publicacionesControllers.consultarPublicaciones);;
router.put('/:id', auth, publicacionesControllers.editarPublicacion);
router.delete('/:id', auth, publicacionesControllers.eliminarPublicacion);

module.exports = router;
