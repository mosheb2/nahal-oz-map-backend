// models/Property.js
const mongoose = require('mongoose');

const coordinatesSchema = new mongoose.Schema({
    x: { type: Number, required: true, min:0, max: 100 },
    y: { type: Number, required: true, min:0, max: 100 }
}, { _id: false });

const locationSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: true
    },
    sizeUnit: {
        type: String,
        required: true,
        enum: ['sqft', 'sqm', 'acres', 'hectares']
    },
    categoryName: {
        type: String,
        required: true,
        enum: ['all', 'youth', 'agriculture', 'community','education']
    },
    target:{
        type: Number,

        required: true,
        min: 0,
    },
    raisedAmount: {
        type: Number,
        default: 0, //TODO: should be always lower or equal to target
    },
    title: {
        type: String,
        required: true,
    },
    targetCurrency: {
        type: String,
        required: true,
        default: 'USD'
    },
    details: {
        type: String,
        required: true
    },
    coordinates: { type: coordinatesSchema, required: true },
    imagesUrl: [{
        type: String
    }],
    deleted: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('location', locationSchema);