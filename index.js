const express = require('express');
const conectarDB = require('./config/db.js');


//Crear el servidor 
const app = express();



//Conectar a la base de datos 
conectarDB();

//===============================
console.log('Comenzando Node Send');

//Puerto de la app
const port = process.env.PORT || 4000; 

//Habilitar leer los valores de un body
app.use( express.json());

//Rutas de la App
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));


//Arrancar la App
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor a inicializado en el puerto ${port}`);
    console.log(`Reafirmando conexion al puerto ${port}`);

})