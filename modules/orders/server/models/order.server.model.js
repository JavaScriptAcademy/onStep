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
      id : { type:Schema.ObjectId, ref: 'Dish' },
      quantity: Number,
      sumPrice: String
    }
  ],
  deliverInfo:{
    address: String,
    name: String,
    phone: String,
    time: String
  },
  totalPrice: String,
  status: { type: String, enum:['PreOrder', 'Ordered', 'Paying', 'Paid'] }
});

mongoose.model('Order', OrderSchema);
