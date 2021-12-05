module.exports = (context) => {

    const { db } = context;

    const list = async (fromUser, filter) => {
        let criteria = {};
        let userField;

        if (filter.type === 'received') {
            userField = 'toId';
            criteria.toId = db.toObjectId(fromUser);
        } else if (filter.type === 'sent') {
            userField = 'fromId';
            criteria.fromId = db.toObjectId(fromUser);
        }

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
                // {
                //     $lookup: {
                //         from: 'users',
                //         localField: 'fromId',
                //         foreignField: '_id',
                //         as: 'fromUser'
                //     }
                // },
                {
                    $lookup: {
                        from: 'users',
                        localField: userField,
                        foreignField: '_id',
                        as: 'user'
                    }
                },

                { $unwind: { path: '$giftType' } },
                // { $unwind: { path: '$fromUser' } },
                { $unwind: { path: '$user' } },
                {
                    $project: {
                        _id: 1,
                        description: 1,
                        createdAt: 1,
                        'giftType.name': 1,
                        'giftType.icon': 1,
                        'user._id': 1,
                        'user.name': 1
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