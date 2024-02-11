const jwt = require("jsonwebtoken");
const BlacklistModel = require("../models/blackListModel");

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
                const isAccessTokenBlacklisted = await BlacklistModel.exists({ token: accessToken, type: 'access' });
                if (isAccessTokenBlacklisted) {
                    return res.status(401).send({ "msg": "Access token is blacklisted" });
                }
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
                const isRefreshTokenBlacklisted = await BlacklistModel.exists({ token: refreshToken, type: 'refresh' });
                if (isRefreshTokenBlacklisted) {
                    return res.status(401).send({ "msg": "Refresh token is blacklisted" });
                }
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
