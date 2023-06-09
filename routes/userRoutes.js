const express = require("express");

const {upload} = require("../middlewares/fileUpload")

const router = express.Router();

const authController = require("../controllers/authController");

const {verifyToken} = require("../middlewares/verifeToken")

//importar el userController
const userController = require("../controllers/userController");

router.get('/', userController.getAllUsers);

router.get("/find/:email", userController.getOneUser)

router.post('/create', userController.createUser);

router.put('/update/:id', verifyToken, userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

router.post("/login", authController.authenticateUser);

module.exports = router;