const client = require('../config/cliente');
const ObjectId = require('mongodb').ObjectID;
const fecha = new Date();
const db = client.db('examen');
const collectionComentario = db.collection('comentario');

exports.crearComentario = async (req, res) => {
  try {
    let {content} = req.body;

    if(content.trim() === ''){
      return res.status(400).json({ msg: 'El contenido del comentario es obligatorio' });
    }

    let newComentario = {
      content,
      ref_id: req.params.idpublicacion,
      user_id: req.usuario.id,
      fecha_creacion: fecha,
    }

    await collectionComentario.insertOne(newComentario);
    res.json({ msg: 'Comentario creado correctamente' });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

async function consultaComentariosPublic(id) {
  return await collectionComentario.find({"ref_id" : id});
  
}

exports.consultarComentariosPublicacion = async(req, res) => {
  try {

    let comentariosPublicacion = await consultaComentariosPublic(req.params.idpublicacion);

    comentariosPublicacion = comentariosPublicacion.toArray((err, docs)=>{
      res.json(docs);
    });

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.editarComentario = async(req, res) => {
  try {
    const {content} = req.body;

    const updateDoc = {
      $set: {
        content
      }
    }

  await collectionComentario.updateOne({"_id" : new ObjectId(req.params.id)}, updateDoc );

    res.json({ msg: 'Comentario actualizado exitosamente' });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarComentario = async(req, res) => {
  try {
  await collectionComentario.deleteOne({"_id" : new ObjectId(req.params.id)});
  res.json({ msg: 'Comentario eliminado exitosamente' });

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};