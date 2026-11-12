const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.checkToken = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization(' ')[1];
    }

    if(!token){
        return res.status(404).json({Error: "No token found, please login to generate token!"});
    }

    try{
        let decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode._id).select("-password");
        next();
    }catch(err){
        res.status(401).json({success: false, message: "Not authorized!"});
    }
}

exports.authorize = (...role) => {
    return (res, res, next) => {
        if(!role.includes(res.user.role)){
            res.status(403).json({error: "Access denialed, user role not admin"})
        }
    }
}