const mongoose = require("mongoose");

const Uri = "mongodb://127.0.0.1:27017/users";

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
    password: {type:String, required:true},
    image: {type:String},
    role: {type:String,default:"user"}
}, {collection:"users25"});

module.exports = mongoose.model('users25', userSchema);