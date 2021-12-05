module.exports = (context) => {

    const commonController = require('./common.controller')(context);
    const { app } = context;

    app.all('*', commonController.cors);
    app.get('/', commonController.ping);

};