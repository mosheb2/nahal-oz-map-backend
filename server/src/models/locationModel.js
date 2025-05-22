const mongoose = require('mongoose');

const coordinatesSchema = new mongoose.Schema({
    x: { type: Number, required: true, min:0, max: 100 },
    y: { type: Number, required: true, min:0, max: 100 }
}, { _id: false });

const locationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true
    },
    categoryName: {
        type: String,
        required: true,
        enum: ['youth', 'agriculture', 'community','education','other']
    },
    coverImagesUrl: { type: String, required: true },
    size: { type: Number, },
    sizeUnit: { type: String, enum: ['sqft', 'sqm', 'acres', 'hectares'] },
    coordinates: { type: coordinatesSchema },
    target:{ type: Number, required: true, min: 0, },
    raisedAmount: {
        type: Number,
        default: 0, //TODO: should be always lower or equal to target
        min: 0,
    },
    donorsCount: { type: Number, default: 0, min: 0 },
    targetCurrency: { type: String, default: 'USD' },
    projPageLinkUrl: { type: String, required: true },
    donatePageLinkUrl: { type: String, required: true },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true
});


module.exports = mongoose.model('location', locationSchema);