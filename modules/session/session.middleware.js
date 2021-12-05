module.exports = (context) => {

    const sessionService = require('../session/session.service')(context);

    const hasPermission = (req, res, next) => {
        let authHeaderValue = req.get('Authorization');
        let user;

        if (authHeaderValue.indexOf(' ') >= 0) {
             user = sessionService.verifyToken(authHeaderValue.split(' ')[1]);
        }

        if (user) {
            req.user = user;
            return next();
        }

        return res.status(401).send('Access denied.');
    };

    return {
        hasPermission
    };

};