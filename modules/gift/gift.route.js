module.exports = (context) => {

    const giftController = require('./gift.controller')(context);
    const giftMiddleware = require('./gift.middleware')(context);
    const { app, auth } = context;

    app.get('/gifts', auth.hasPermission, giftMiddleware.listRequired, giftController.list);
    app.post('/gifts', auth.hasPermission, giftMiddleware.addRequired, giftController.add);

};