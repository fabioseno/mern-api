"use strict";

module.exports = function (context) {
  var db = context.db;

  var list = function list(fromUser, filter) {
    var criteria;
    return regeneratorRuntime.async(function list$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            criteria = {};

            if (filter.type === 'received') {
              criteria.to_id = fromUser;
            } else if (filter.type === 'sent') {
              criteria.from_id = fromUser;
            } // return db.getConnection()
            //     .collection('gifts')
            //     .find(criteria)
            //     //.project({ createdAt: 0 })
            //     .sort({ createdAt: 1 })
            //     .toArray()
            //     .then(rows => rows.map(item => {
            //         item._id = item._id.toString();
            //         return item;
            //     }));


            return _context.abrupt("return", db.getConnection().collection('gifts').aggregate([{
              $match: criteria
            }, {
              $lookup: {
                from: 'giftTypes',
                localField: 'gift_id',
                foreignField: '_id',
                as: 'giftType'
              }
            }]).toArray());

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  };

  var add = function add(fromUser, data) {
    data.gift_id = db.toObjectId(data.gift_id);
    data.from_id = db.toObjectId(fromUser);
    data.createdAt = new Date();
    return db.getConnection().collection('gifts').insertOne(data);
  };

  return {
    list: list,
    add: add
  };
};