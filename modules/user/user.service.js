module.exports = (context) => {

    const { db } = context;

    const list = () => {
        return db.getConnection()
            .collection('users')
            .find()
            .project({ passcode: 0, createdAt: 0 })
            .sort({ name: 1 })
            .toArray()
            .then(rows => rows.map(item => {
                item._id = item._id.toString();

                return item;
            }));
    };

    const add = (data) => {
        data.passcode = generateRandomPasscode(1000, 9999);
        data.createdAt = new Date();

        return db.getConnection()
            .collection('users')
            .insertOne(data);
    };

    const login = (email, passcode) => {
        return db.getConnection()
            .collection('users')
            .findOne({ email, passcode }, {
                projection: { passcode: 0, createdAt: 0 }
            })
            .then(result => {
                if (result) {
                    result._id = result._id.toString();
                }

                return result;
            })
    };

    const generateRandomPasscode = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    return {
        list,
        add,
        login
    }

};