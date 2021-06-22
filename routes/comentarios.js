//Rutas para amigos
const express = require('express');
const comentarioControllers = require('../controllers/comentarioControllers');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/:idpublicacion', auth, comentarioControllers.crearComentario);
router.get('/publicacion/:idpublicacion', auth, comentarioControllers.consultarComentariosPublicacion);
router.put('/:id', auth, comentarioControllers.editarComentario);
router.delete('/:id', auth, comentarioControllers.eliminarComentario);

module.exports = router;
