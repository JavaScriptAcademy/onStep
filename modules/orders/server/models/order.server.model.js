'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// var User = require('../modules/users/server/models/user.server.model.js');
// var Dish = require('../modules/dishes/server/models/dish.server.model.js');

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  _creator:{
    type: Schema.ObjectId,
    ref: 'User'
  },
  dishes: {
    type: Schema.ObjectId,
    ref: 'Dish'
  },
  deliverInfo: {
    name: String,
    phone: String,
    address: String,
    expectDeliveryTime: String
  }
});

module.exports = mongoose.model('Order', OrderSchema);
