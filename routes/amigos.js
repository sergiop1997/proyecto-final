const express = require('express');
const amigosController = require('../controllers/amigosController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/solicitud/:idamigo', auth, amigosController.enviarSolicitudAmigo);
router.patch('/solicitud/rechazar/:idamigo', auth,amigosController.rechazarSolicitudAmigo);
router.patch('/solicitud/aceptar/:idamigo',auth ,amigosController.aceptarSolicitudAmigo);
router.get('/',auth, amigosController.listarMisAmigos);
router.delete('/:idamigo',auth, amigosController.eliminarMiAmigo);
module.exports = router;
