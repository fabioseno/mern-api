var jwt = require('jsonwebtoken');

module.exports = (context) => {

    const { config } = context;

    const createToken = (payload) => {
        return jwt.sign(payload, config.auth.jwtSecret);
    };

    const verifyToken = (token) => {
        try {
            return jwt.decode(token, config.auth.jwtSecret);
        }
        catch (error) {
            return null;
        }
    };

    return {
        createToken,
        verifyToken
    }

};