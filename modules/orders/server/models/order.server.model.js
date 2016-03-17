'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Order Schema
 */
var OrderSchema = new Schema({
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  dishes:[
    {
      type:Schema.ObjectId,
      ref: 'Dish'
    }
  ],
  deliverInfo:{
    address:String,
    name: String,
    phone: String,
    time: String
  }
});

mongoose.model('Order', OrderSchema);
