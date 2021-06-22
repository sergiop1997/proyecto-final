//Rutas para amigos
const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const auth = require('../middleware/auth');

//Crear usuario
router.post('/', usuarioController.crearUsuario);
//Editar usuario
router.put('/', auth, usuarioController.editarUsuario);
//Eliminar usuario
router.delete('/', auth, usuarioController.eliminarUsuario);

module.exports = router;
