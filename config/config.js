module.exports = {

    db: {
        connectionString: process.env.DB_CONNECTION_STRING,
        name: process.env.DB_NAME
    },
    auth: {
        jwtSecret: 'A2@!##jj'
    }
};