module.exports = (context) => {

    const addRequired = (req, res, next) => {
        let messages = [];

        if (!req.body.name) { messages.push('Name required.'); }
        if (!req.body.email) { messages.push('E-mail required.'); }

        if (messages.length) {
            return res.status(400).send({ success: false, messages });
        }

        next();
    };

    const loginRequired = (req, res, next) => {
        let messages = [];

        if (!req.body.email) { messages.push('E-mail required.'); }
        if (!req.body.passcode) { messages.push('Passcode required.'); }

        if (messages.length) {
            return res.status(400).send({ success: false, messages });
        }

        next();
    };

    return {
        addRequired,
        loginRequired
    };

};