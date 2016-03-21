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
  ingredients : [{ ingredientId: Number, name: String, price: Number, count: Number, weight: String }],
  cookingSteps: [String],
  price: Number,
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
