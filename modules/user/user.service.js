module.exports = (context) => {

    const { db } = context;

    const list = () => {
        return db.getConnection()
            .collection('users')
            .find()
            .project({ passcode: 0, createdAt: 0 })
            .sort({ name: 1 })
            .toArray();
    };

    const add = (data) => {
        data.passcode = generateRandomPasscode(1000, 9999);
        data.createdAt = new Date();

        return db.getConnection()
            .collection('users')
            .insertOne(data)
            .then(() => ({ passcode: data.passcode }));
    };

    const login = (email, passcode) => {
        return db.getConnection()
            .collection('users')
            .findOne({ email, passcode }, {
                projection: { passcode: 0, createdAt: 0 }
            });
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