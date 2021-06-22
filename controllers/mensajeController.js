const client = require('../config/cliente');
const ObjectId = require('mongodb').ObjectID;
const fecha = new Date();
const db = client.db('examen');
const collectionMensaje = db.collection('mensaje');

exports.enviarMensaje = async (req, res) => {
  try {
    let {content} = req.body;

    if(content.trim() === ''){
      return res.status(400).json({ msg: 'El contenido del mensaje es obligatorio' });
    }

    let newMensaje = {
      content,
      user_id: req.usuario.id,
      receptor_id: req.params.receptorid,
      fecha_creacion: fecha,
    }

    await collectionMensaje.insertOne(newMensaje);
    res.json({ msg: 'Mensaje enviado correctamente', newMensaje });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};
