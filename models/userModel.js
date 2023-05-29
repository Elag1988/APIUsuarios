const mongoose = require("mongoose");

const Uri = "Aqui va la url de mongo Altas o mongo local, una vez la colocas el programa funciona perfectamente";

mongoose.connect(Uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Se conecto con base de datos"))
.catch(err => console.log("Error de conexion con la base de datos", err));


//Las bases de datos son para pruebas, no representan informacion real.  
const userSchema = new mongoose.Schema({

    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}
}, {collection:"users25"});

module.exports = mongoose.model('users25', userSchema);