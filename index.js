const express = require('express');
const conectarDB = require('./config/db');

//Creando servidor express
const app = express();
const PORT = 3000;

//Conectar la base de datos
conectarDB();

//Consultar datos de la base de datos
// async function traerDatos() {
//   let db = client.db(dbName);
//   let collection = db.collection('auth');

//   return collection.find().toArray((err, docs) => {
//     console.log(docs);
//   });
// }

//Agregar un dato a la base de datos
// async function insertarDato() {
//   let db = client.db(dbName);
//   let collection = db.collection('auth');

//   let newAuth = {
//     correo: 'nuevo@gmail.com',
//     contraseña: '12345',
//   };
//   await collection.insertOne(newAuth, res => {
//     console.log(res);
//   });
// }

// conectar();
//Traer datos de la db
// traerDatos();
//Insertar dato a la db
// insertarDato();

//Habilitar express.json -> nos permite leer datos que el usuario coloque
app.use(express.json({ extended: true }));

//Habilitar cors
// app.use(cors());

//importar Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/usuario', require('./routes/usuarios'));
app.use('/api/amigo', require('./routes/amigos'));
app.use('/api/mensaje', require('./routes/mensaje'));
app.use('/api/publicacion', require('./routes/publicaciones'));
app.use('/api/comentario', require('./routes/comentarios'));


// app.get('/estudiantes', async (req, res) => {
//   res.json(await traerDatos());
// });

app.listen(PORT, () => {
  console.log(`App corriendo en el puerto ${PORT}`);
});
