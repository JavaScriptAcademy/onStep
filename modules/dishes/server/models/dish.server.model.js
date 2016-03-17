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
  ingredients : [{name: String, price: Number, count: Number, weight: String}],
  cookingSteps: [String],
  orderTimes  : Number
});

mongoose.model('Dish', DishSchema);
