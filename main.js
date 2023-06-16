//Se guarda la constante express la libreria express
const express = require("express");
//Se guarda la constante cors la libreria cors
const cors = require('cors');

//Se guardan en la constante app todos los metodos de la libreria express
const app = express();

const {dbConnection} = require("./connections/connections") 


//Creacion de la constante puerto
const port = 3000;

//creacion de la constante connectDB

const connectDB = '/api/users';

//creacion de la constante userRoutes
const userRoutes = require("./routes/userRoutes");

// Definicion para la autorizacion del puerto de Angular
app.use(cors(
    {
        origin: "*"
    }))

//Que todos los documentos que se crean sean en objeto json
app.use(express.json());



//ruta para acceso a la infornacion de la base de datos

app.use(connectDB, userRoutes);

dbConnection();


app.listen(port, () => {console.log("El servidor se ejecuta en http://localhost:" + port)});
