const express = require('express');
const db = require('./util/db');
const app = express();
const port = 8081;

// ENVIRONMENT VARIABLES
require('dotenv').config({ path: __dirname + '/.env' });

const config = require('./config/config');

const context = {
    app,
    db,
    config,
    auth: require('./modules/session/session.middleware')({ config })
};

// DATABASE
db.connect(config.db.connectionString, config.db.name);

// BODY PARSER
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json({ limit: '5mb' }));


require('./modules')(context);

app.get('*', (req, res) => {
    return res.status(404).send('Route not found');
});

app.use(function (err, req, res, next) {
    res.status(500).send('Unexptected error');
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});