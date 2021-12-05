module.exports = (context) => {

    const required = (req, res, next) => {
        let messages = [];

        if (!req.body.name) { messages.push('Name required.'); }
        if (!req.body.icon) { messages.push('Icon required.'); }

        if (messages.length) {
            return res.status(400).send({ success: false, messages });
        }

        next();
    };

    return {
        required
    };

};