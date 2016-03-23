'use strict';

/*
* Module dependencies.
*/
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
* Dish Schema
*/
var DishSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Dish name',
    trim: true
  },
  dishImage   : String,
  ingredients : [{ ingredientId: Number, name: String, weight: String }],
  cookingSteps: [String],
  price: Number,
  orderTimes: {
    type:Number,
    default: 0
  },
  order : {
    type:Schema.ObjectId,
    ref: 'Order'
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Dish', DishSchema);
