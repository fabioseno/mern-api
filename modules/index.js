module.exports = (context) => {
    require('./common')(context);
    require('./user')(context);
    require('./gift-type')(context);
    require('./gift')(context);
}