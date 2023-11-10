//Subida de archivos
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');



exports.subirArchivo = async (req, res, next) => {

    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination : (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename : (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length); 
                cb(null, `${shortid.generate()}${extension}`);
            },
            
        })
    }
    
    const upload = multer(configuracionMulter).single('archivo');

    console.log("1.Entramos a la funcion de subirArchivo de archivosController...");
    
    upload( req, res, async (error) =>{
        console.log("2.", req.file);

        if(!error){
            res.json({archivo: req.file.filename});
            console.log("3.Archivo cargado correctamente");
        } else {
            console.log("4.", error);
            return next();
        }

    })
}

exports.eliminarArchivo = async (req, res) => {
    console.log("Desde la funcion eliminarArchivo");
    console.log(req.archivo);

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
        console.log("...!Archivo eliminado Correctamente!...");
    } catch (error) {
        console.log("Error en la funcion eliminarArchivo ==>", error);
    }

}