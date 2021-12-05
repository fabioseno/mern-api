module.exports = (context) => {

    const cors = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-Requested-With, Content-Type');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.header('Access-Control-Expose-Headers', 'Content-Disposition');

        next();
    };

    const ping = (req, res) => {
        res.send('Server is up and running!');
    };

    return {
        cors,
        ping
    };

};