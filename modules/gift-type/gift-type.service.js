module.exports = (context) => {

    const { db } = context;

    const list = () => {
        return db.getConnection()
            .collection('giftTypes')
            .find()
            .project({ createdAt: 0 })
            .sort({ name: 1 })
            .toArray();
    };

    const add = (data) => {
        data.createdAt = new Date();

        return db.getConnection()
            .collection('giftTypes')
            .insertOne(data);
    };

    return {
        list,
        add
    }

};