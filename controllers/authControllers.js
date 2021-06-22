const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;
const client = require('../config/cliente');
const db = client.db('examen');
const collectionUsuario = db.collection('usuario');

exports.authUsuario = async(req, res) => {

 //Extraer el email y password
  const { email, contrasena } = req.body;

  try {
    //REvisar que sea un usuario registrado
    let usuario = await collectionUsuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: 'El usuario no existe' });
    }

    //Revisar el password
    if (contrasena.trim() === usuario.password) {
      return res.status(400).json({ msg: 'Password Incorrecto' });
    }

    //Si todo es correcto Crear y firmar el JWT
    const payload = {
      usuario: {
        id: usuario._id,
      },
    };

    //Firmar el JWT
    jwt.sign(
      payload,
      'SECRETA',
      {
        expiresIn: 3600, //Una hora
      },
      (error, token) => {
        if (error) throw error;
        //Mensaje de confirmacion
        res.json({ msg: 'Usuario logueado correctamente', token });
      }
    );

  } catch (error) {
    console.log('error');
  }
};

exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await collectionUsuario.findOne({"_id" : new ObjectId(req.usuario.id)});
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error' });
  }
};