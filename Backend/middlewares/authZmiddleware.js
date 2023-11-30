const jwt = require("jsonwebtoken");

exports.authZmiddleware = async (req, res, next) => {
    try {
        console.log("=============================");
        console.log("checked all cookies", req.cookies);
        console.log("cokkie", req.cookies ? req.cookies.token : null);
        console.log("body", req.body ? req.body.token : null);

        const headerToken = req.header("Authorization");
        const token = req.body?.token || req.cookies?.token || (headerToken ? headerToken.replace("Bearer ", "") : null);

        console.log("got token ==>", token);

        if (!token) {
            return res.status(405).json({
                success: false,
                message: "Token missing",
            });
        }

        try {
            const decode = await jwt.verify(token, "yourSecretKey");
            console.log(decode);

            req.user = decode;
            next(); // Move next() inside the try block to ensure it only proceeds if the token is valid
        
        } catch (error) {
            return res.status(405).json({
                success: false,
                message: "Token is invalid",
                error : error ,
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: `Something went wrong while verifying token ${error}`,
        });
    }
};
