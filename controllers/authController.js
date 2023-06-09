const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config(); //otra manera de importar modulos


exports.authenticateUser = (req, res) => {
  const { email, password } = req.body;
  
  userModel.findOne({ email }).then((user) => {
    if (!user) {
        //Si no se encuentra el usuario , se devuelve un mensaje de error
      return res.status(404).json({ error: "User not found" });
    }
    bcrypt.compare(password, user.password, function(err, result) {
        if(err){
            res.status(500).json({ error:err.message});
        } else if(result) {
          const payload = {
            userId: user._id,
            email: user.email,
            role:user.role
          } ;
            //Si coincide la contraseña , el usuario fue autentificado exitosamente
            const token = jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {expiresIn:"1h"});
            res.status(200).json({message:"Authentication was successful", token});
        } else {
            //Si no coincide la contraseña , el usuario no pudo ser autentificado.
            res.status(401).json({error:"Authentication failed "});
        }
    });
  })
.catch((err) => res.status(500).json({ error:err.message}))
};
