const client = require('../config/cliente');
const ObjectId = require('mongodb').ObjectID;
const fecha = new Date();
const db = client.db('examen');
const collectionUsuario = db.collection('usuario');

exports.crearUsuario = async (req, res) => {
  try {
    let {nombre, apellido, email, contrasena} = req.body;

    if(nombre.trim() === '' || apellido.trim() === '' || email.trim() ==='' || contrasena.trim()=== ''){
      return res.status(400).json({ msg: 'Los datos {nombre, apellido, email, contrasena} son obligatorios' });
    }

    //Validacion de si Existe usuario
    let usuario = await collectionUsuario.findOne({email});
    if(usuario){
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    let newUsuario = {
      nombre,
      apellido,
      email,
      contrasena,
      fecha, 
    }

    collectionUsuario.insertOne(newUsuario);
    res.json({ msg: 'Usuario creado correctamente'});
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.editarUsuario = async (req, res) => {
  try {
    // Extraer el usuario y comprobar si existe
    const usuario = await collectionUsuario.findOne({"_id" : new ObjectId(req.usuario.id)});
    if(!usuario){
      return res.status(404).json({ msg: 'Este usuario no existe' });
    }

    const {nombre, apellido} = req.body;

    const updateDoc = {
      $set: {
        nombre, 
        apellido, 
      }
    }
  await collectionUsuario.updateOne({"_id" : new ObjectId(req.usuario.id)}, updateDoc );

    res.json({msg: "Usuario modificado"});
  } catch (error) {
    res.status(500).send('Hubo un error');

  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    // Extraer el usuario y comprobar si existe
    const usuario = await collectionUsuario.findOne({"_id" : new ObjectId(req.usuario.id)});
    if(!usuario){
      return res.status(404).json({ msg: 'Este usuario no existe' });
    }

    const result = await collectionUsuario.deleteOne({"_id" : new ObjectId(req.usuario.id)});

    res.json({msg: "Usuario Eliminado exitosamente"});

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};
