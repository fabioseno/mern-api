const { MongoClient, ObjectId } = require("mongodb");
let _db;

module.exports = {

    connect: async (connectionString, database) => {
        const client = new MongoClient(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();

        _db = client.db(database);

        console.log('Database connected.')
    },

    getConnection: () => {
        if (!_db) {
            throw new Error('Database not connected.')
        }

        return _db;
    },

    toObjectId: (value) => {
        if (value) {
            return new ObjectId(value);
        }

        return;
    }

};