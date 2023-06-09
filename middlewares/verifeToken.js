const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({error:"Not token provided!!!"});
    } 

    jwt.verify(token, process.env.JWT_SECRET,(err,decoded) => {
        
        if(err)  {
            return res.status(401).json({error:"Invalid Token..."});
        }

        req.user = decoded;
        next();
    });

};