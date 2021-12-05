module.exports = (context) => {

    const giftService = require('./gift.service')(context);
    
    const list = async (req, res) => {
        try {
            let gifts = await giftService.list(req.user._id, req.query);
            res.send(gifts);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    };

    const add = async (req, res) => {
        try {
            let response = await giftService.add(req.user._id, req.body);
            res.send(response.insertedId);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    };

    return {
        list,
        add
    };

};