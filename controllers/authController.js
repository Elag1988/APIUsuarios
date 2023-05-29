const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
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
            //Si coincide la contraseña , el usuario fue autentificado exitosamente
            res.status(200).json({message:"Authentication was successful"});
        } else {
            //Si no coincide la contraseña , el usuario no pudo ser autentificado.
            res.status(401).json({error:"Authentication failed "});
        }
    });
  })
.catch((err) => res.status(500).json({ error:err.message}))
};
