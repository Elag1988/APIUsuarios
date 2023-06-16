const mongoose = require("mongoose");

//Las bases de datos son para pruebas, no representan informacion real.  
const userSchema = new mongoose.Schema({

    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    image: {data:Buffer, contentType:String},
    role: {type:String,default:"user"}
}, {collection:"users25"});

module.exports = mongoose.model('users25', userSchema);