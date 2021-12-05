module.exports = (context) => {

    const giftTypeService = require('./gift-type.service')(context);

    const list = async (req, res) => {
        try {
            let giftTypes = await giftTypeService.list();
            res.send(giftTypes);
        }
        catch (error) {
            res.status(500).send(error.message);
        }
    };

    const add = async (req, res) => {
        try {
            let response = await giftTypeService.add(req.body);
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