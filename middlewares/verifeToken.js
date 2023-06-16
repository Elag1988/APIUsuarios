const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
    const authorizationHeaders = req.headers.authorization;
    if(!authorizationHeaders) {
        return res.status(401).json({error:"Not token provided!!!"});
    } 

    const token = authorizationHeaders.replace("Bearer ", '');

    jwt.verify(token, secret,(err) => {
        
        if(err)  {
            console.log("Clave secreta utilizada para verificar el token:!", secret, err);
            // res.status(401).json({error:"Invalid Token..."});
        }

        const payload = jwt.decode(token);

        req.user = {userId: payload.userId,
            email: payload.email,
            role: payload.role};
        next();
    });

};