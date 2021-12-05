module.exports = (context) => {

    const userController = require('./user.controller')(context);
    const userMiddleware = require('./user.middleware')(context);
    const { app, auth } = context;

    app.get('/users', auth.hasPermission, userController.list);
    app.post('/users', userMiddleware.addRequired, userController.add);
    app.patch('/users', userMiddleware.loginRequired, userController.login);

};