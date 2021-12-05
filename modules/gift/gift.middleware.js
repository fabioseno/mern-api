module.exports = (context) => {

    const listRequired = (req, res, next) => {
        let messages = [];

        if (!req.query.type) { messages.push('Type required.'); }

        if (messages.length) {
            return res.status(400).send({ success: false, messages });
        }

        next();
    };

    const addRequired = (req, res, next) => {
        let messages = [];

        if (!req.body.toId) { messages.push('Receiver required.'); }
        if (!req.body.giftTypeId) { messages.push('Gift type required.'); }

        if (messages.length) {
            return res.status(400).send({ success: false, messages });
        }

        next();
    };

    return {
        listRequired,
        addRequired
    };

};