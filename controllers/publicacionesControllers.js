const client = require('../config/cliente');
const ObjectId = require('mongodb').ObjectID;
const fecha = new Date();
const db = client.db('examen');
const collectionPublicacion = db.collection('publicacion');

exports.crearPublicacion = async (req, res) => {
  try {
    let {content} = req.body;

    if(content.trim() === ''){
      return res.status(400).json({ msg: 'El contenido de la publicacion es obligatorio' });
    }

    let newPublicacion = {
      content,
      author_ref_id: req.usuario.id,
      fecha_creacion: fecha,
    }

    await collectionPublicacion.insertOne(newPublicacion);
    res.json({ msg: 'Publicacion creada correctamente', newPublicacion });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

async function consultaPublic(id) {
  return await collectionPublicacion.find({"author_ref_id" : id});
  
}

exports.consultarPublicaciones = async(req, res) => {
  try {

    let publicaciones = await consultaPublic(req.usuario.id);

    publicaciones = publicaciones.toArray((err, docs)=>{
      res.json(docs);
    });

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.editarPublicacion = async(req, res) => {
  try {
    const {content} = req.body;

    const updateDoc = {
      $set: {
        content
      }
    }

  await collectionPublicacion.updateOne({"_id" : new ObjectId(req.params.id)}, updateDoc );

    res.json({ msg: 'publicacion actualizada' });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarPublicacion = async(req, res) => {
  try {
  await collectionPublicacion.deleteOne({"_id" : new ObjectId(req.params.id)});
  res.json({ msg: 'Publicacion eliminada exitosamente' });

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};
