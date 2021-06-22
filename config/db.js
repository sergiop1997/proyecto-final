const client = require('./cliente');

const conectarBD = async () => {
  try {
    await client.connect();
    console.log('Conectado a mongo');
  } catch (error) {
    console.log('Error de conecxion a mongo');
  }
};

module.exports = conectarBD;
