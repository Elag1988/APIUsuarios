const mongoose = require("mongoose");
require('dotenv').config();

exports.dbConnection = () => {
    try{ 
        mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,
            useUnifiedTopology: true}) 
        console.log("Se conecto con base de datos");
    }
catch(err){
    console.log("Error de conexion con la base de datos", err);
};
}