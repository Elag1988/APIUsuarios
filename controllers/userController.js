const { upload } = require("../middlewares/fileUpload");
const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.getAllUsers = (req, res) => {
  userModel
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getOneUser = (req, res) => {
  const {email} = req.params;

  userModel
    .findOne({email})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({error:err.message}));
};

exports.createUser = (req, res) => {
  const { username, email, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const newUser = new userModel({
        username,
        email,
        password: hash,
        image:""
      });

      newUser
        .save()
        .then(() => res.status(201).json({ success: "created" }))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  });
};


// exports.updateUser = (req, res) => {
//   const { id } = req.params;
//   const { username, email, password } = req.body;
//   userModel
//     .findByIdAndUpdate(id, { username, email, password }, { new: true })
//     .then((user) => {
//       if (!user) throw new Error(`user with ID ${id} not found`);
//       res.status(200).json({ user });
//     })
//     .catch((err) => res.status(404).json({ error: err.message }));
// };

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;
  const avatarFile = req.file;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).json({ error: err.message });
    }  else {
        const updateData = {username, email,password:hash, role}

        if(avatarFile) {
          
          updateData.image = {
            data: avatarFile.buffer, 
            contentType:avatarFile.mimeType
          }
        }
        userModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .then((user) => {
          if (!user) throw new Error(`User with ID ${id} not found`);
          res.status(200).json({ user });
        })
        .catch((err) => res.status(404).json({ error: err.message }));
        
      }
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  if(req.user.role !== "admin") {

    return res.status(401).json({error: "Not authorized!!"})
    
  }else {
  userModel
    .findByIdAndDelete(id)
    .then((user) => {
      if (!user) throw new Error(`user with ID ${id} not found`);
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => res.status(404).json({ error: err.message }));
};
}


exports.pruebaimg = ('/upload', (req, res) => {
  
  upload(req, res, (err) => {

    if (err) {
      console.log(err);
    } else {
      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, //Algun conflicto del JWT y multer que no permite pasar la contraseña como hash
        image: { 
          data:req.file.filename
        }
      });
      newUser
        .save()
        .then(() => res.status(201).json({ success: "created with image" }))
        .catch((err) => res.status(500).json({ error: err.message }));
    }
  })
}) 
