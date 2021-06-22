//Rutas para autenticacion
const express = require('express');
const authControllers = require('../controllers/authControllers');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', authControllers.authUsuario);
//Obteniendo datos del usuario autenticado
router.get('/',auth, authControllers.usuarioAutenticado);

module.exports = router;
