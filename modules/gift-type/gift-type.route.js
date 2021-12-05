module.exports = (context) => {

    const giftTypeController = require('./gift-type.controller')(context);
    const giftTypeMiddleware = require('./gift-type.middleware')(context);
    const { app, auth } = context;

    app.get('/gift-types', auth.hasPermission, giftTypeController.list);
    app.post('/gift-types', auth.hasPermission, giftTypeMiddleware.required, giftTypeController.add);

};