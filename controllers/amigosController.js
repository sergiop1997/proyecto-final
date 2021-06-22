const client = require('../config/cliente');
const ObjectId = require('mongodb').ObjectID;
const fecha = new Date();
const db = client.db('examen');
const collectionAmigo = db.collection('amigos');

exports.enviarSolicitudAmigo = async (req, res) => {
  try {
    let newAmigo = {
      ref_id_user: req.usuario.id,
      ref_id_amigo: req.params.idamigo,
      estado: 'PENDIENTE',
      fecha_creacion: fecha,
    }

    await collectionAmigo.insertOne(newAmigo);
    res.json({ msg: 'Solicitud enviada correctamente', newAmigo });

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.rechazarSolicitudAmigo = async (req, res) => {
  try {
  const updateDoc = {
    $set: {
      estado: 'RECHAZADA'
    }
  }

  await collectionAmigo.updateOne({"ref_id_amigo":req.params.idamigo}, updateDoc );
    res.json({ msg: 'Solicitud de amistad Rechazada' });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.aceptarSolicitudAmigo = async (req, res) => {
  try {
      const updateDoc = {
    $set: {
      estado: 'ACEPTADA'
    }
  }

  await collectionAmigo.updateOne({"ref_id_amigo":req.params.idamigo}, updateDoc );
    res.json({ msg: 'Solicitud de amistad aceptada' });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

async function consultaAmigos(id) {
  return await collectionAmigo.find({"ref_id_user" : id, estado: 'ACEPTADA'});
}

exports.listarMisAmigos = async (req, res) => {
  try {
    // console.log(req.usuario.id);
    let publicaciones = await consultaAmigos(req.usuario.id);
    publicaciones = publicaciones.toArray((err, docs)=>{
      res.json(docs);
    });

  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarMiAmigo = async (req, res) => {
  try {
  await collectionAmigo.deleteOne({"ref_id_amigo":req.params.idamigo});
    res.json({ msg: 'Amigo eliminado exitosamente' });
  } catch (error) {
    res.status(500).send('Hubo un error');
  }
};