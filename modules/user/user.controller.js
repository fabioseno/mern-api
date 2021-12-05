module.exports = (context) => {

    const userService = require('./user.service')(context);
    const sessionService = require('../session/session.service')(context);

    const list = async (req, res, next) => {
        try {
            let users = await userService.list();
            res.send(users);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    };

    const add = async (req, res) => {
        try {
            let response = await userService.add(req.body);
            res.send(response.insertedId);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    };

    const login = async (req, res) => {
        try {
            let user = await userService.login(req.body.email, req.body.passcode);
            let data = {};

            if (user) {
                data.success = true;
                data.user =user;
                data.token = sessionService.createToken(user);
            } else {
                res.status(401);
                data.success = false;
            }

            res.send(data);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    };

    return {
        list,
        add,
        login
    };

};