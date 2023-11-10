const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //useFindAndModify: false, // Esta opción ha sido reemplazada por findOneAndUpdate
            // useCreateIndex: true, // Esta opción ha sido reemplazada por createIndex
        });

        //mongoose.set('useFindAndModify', false); // Configurar useFindAndModify a false para evitar futuros problemas de depreciación
        //mongoose.set('useCreateIndex', true); // Configurar useCreateIndex a true para evitar futuros problemas de depreciación

        console.log('DB Conectada...');
        console.log('DB Conectada a Mongoose...');

    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);
    }
};

module.exports = conectarDB;
