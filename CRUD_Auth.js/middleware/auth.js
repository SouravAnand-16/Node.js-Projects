const jwt = require("jsonwebtoken");

const secretKey = process.env.SecretKey;
const refreshSecretKey = process.env.RefreshSecretKey;

const auth = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.split(" ")[1];
         const refreshToken = req.headers.authorization?.split(" ")[2];
        if (!accessToken && !refreshToken) {
            return res.status(401).send({ "msg": "Token missing" });
        }
        if (accessToken) {
            try {
                const decodeAccessToken = jwt.verify(accessToken, secretKey);
                 req.userId = decodeAccessToken.userId;
                 req.username = decodeAccessToken.username ;
                return next();
            } catch (error) {
                return res.status(401).send({ "msg": "Invalid access token" });
            }
        }
        if (refreshToken) {
            try {
                const decodeRefreshToken = jwt.verify(refreshToken, refreshSecretKey);
                req.userId = decodeRefreshToken.userId;
                req.username = decodeRefreshToken.username ; 
                return next();
            } catch (error) {
                return res.status(401).send({ "msg": "Invalid refresh token" });
            }
        }
    } catch (error) {
        return res.status(500).send({ "error while auth middleware": error.message });
    }
}

module.exports = auth;
