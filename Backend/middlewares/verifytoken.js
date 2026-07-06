const jwt=require("jsonwebtoken");
const User=require("../models/User");


const verifyToken=async(req, res, next) => {

try
{
    const authHeader=req.headers.authorization;

    if(!authHeader )
    {
        return res.status(401).json({success: false, message: "authorization header is missing" });
    }

    const token=authHeader.split(" ")[1];

    if(!token)
    {
        return res.status(401).json({success: false, message: "Token is missing" });
    }

    const decoded=jwt.verify(token, process.env.JWT_SECRET);
const user=await User.findById(decoded.id);

if(!user || user.token !== token)
{
    return res.status(401).json({success: false, message: "User not found" });
}
    req.user=decoded;
    next();
}
catch(error)
{
    console.error("Token verification error:", error);
    res.status(401).json({success: false, message: "Invalid token" });
}
};




module.exports={verifyToken};