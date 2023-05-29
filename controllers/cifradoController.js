const bcrypt = require("bcryptjs");
//Cifrado de contraseña
const saltRounds = 10;
const plainPassword = "password123";
bcrypt.hash(plainPassword, saltRounds, function(err, hash)
{
    if(err){
        console.error(err);
    } else {
        console.log("Se creo el hash de la contraseña", hash);
    }
})

//Autentificacion del hash

const hashedPassword = "$2b$10$";
const loginPassword = "password123";

bcrypt.compare(loginPassword, hashedPassword, function(err, result) {
    if(err){
        console.error(err);
    } else if(result) {
        console.log("La contraseña es válida")
    } else {
        console.log("La contraseña es inválida")
    }
})

