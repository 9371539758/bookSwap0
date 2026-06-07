const jwt = require("jsonwebtoken");
const redsi = require("../config/cache")
const redis = require("../config/cache");
const verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token found"
            });
        }
        const isBlackListing = await redis.get(token,"");
        if(isBlackListing){
            return res.status(401).json({
                message:"invalid token",
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

module.exports = verifyToken;