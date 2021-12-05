module.exports = (context) => {

    const { db } = context;

    const list = async (fromUser, filter) => {
        let criteria = {};

        if (filter.type === 'received') {
            criteria.toId = db.toObjectId(fromUser);
        } else if (filter.type === 'sent') {
            criteria.fromId = db.toObjectId(fromUser);
        }

        // return db.getConnection()
        //     .collection('gifts')
        //     .find(criteria)
        //     //.project({ createdAt: 0 })
        //     .sort({ createdAt: 1 })
        //     .toArray()
        //     .then(rows => rows.map(item => {
        //         item._id = item._id.toString();

        //         return item;
        //     }));

        return db.getConnection()
            .collection('gifts')
            .aggregate([
                { $match: criteria },
                {
                    $lookup: {
                        from: 'giftTypes',
                        localField: 'giftTypeId',
                        foreignField: '_id',
                        as: 'giftType'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'fromId',
                        foreignField: '_id',
                        as: 'fromUser'
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'toId',
                        foreignField: '_id',
                        as: 'toUser'
                    }
                },

                { $unwind: { path: '$giftType' } },
                { $unwind: { path: '$fromUser' } },
                { $unwind: { path: '$toUser' } },
                {
                    $project: {
                        _id: 1,
                        description: 1,
                        createdAt: 1,
                        'giftType.name': 1,
                        'giftType.icon': 1,
                        'fromUser._id': 1,
                        'fromUser.name': 1,
                        'toUser._id': 1,
                        'toUser.name': 1
                    }
                }
            ])
            .toArray();
    };

    const add = (fromUser, data) => {
        data.giftTypeId = db.toObjectId(data.giftTypeId);
        data.fromId = db.toObjectId(fromUser);
        data.toId = db.toObjectId(data.toId);
        data.createdAt = new Date();

        return db.getConnection()
            .collection('gifts')
            .insertOne(data);
    };

    return {
        list,
        add
    }

};