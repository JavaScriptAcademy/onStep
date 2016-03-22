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
      _dish: {
        type:Schema.ObjectId,
        ref: 'Dish'
      },
      quantity: Number,
    }
  ],
  deliverInfo:{
    address: String,
    name: String,
    phone: String,
    time: {
      date: String,
      time: String
    }
  },
  totalPrice: Number,
  status: {
    type: String,
    enum: ['PreOrder', 'Ordered', 'Paying', 'Paid']
  }
});

mongoose.model('Order', OrderSchema);
