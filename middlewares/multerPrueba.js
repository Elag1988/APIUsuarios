//ejemplo de multer

const multer = require("multer");
const express = require("express");
const fs = require("fs")

const app = express();
const upload = multer({dest: "uploads"});

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    if(!file){
        res.status(400).send("No hay archivo");
        return;
    }

    const filePath = "uploads/" + file.filename;



    fs.renameSync(file.path, filePath);

    const {originalname, mimetype, size} = file;
    res.send(`Archivo '${originalname}' subido exitosamente.\nTamaño: ${size} bytes.\nTipo MIME: ${mimetype}`);
});

const port = 3000;
app.listen(port, () => {console.log("El servidor se ejecuta en http://localhost:" + port)});


