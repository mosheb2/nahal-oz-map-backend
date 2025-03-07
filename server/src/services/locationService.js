const Location = require('../models/locationModel');
const { Types } = require("mongoose");

const addLocation = async(location) => {
    const newLocation = new Location(location);

    return await newLocation.save();
}

const getLocations = async() => {
    return Location.find({ deleted: false }).exec();
}

const getLocationById = async(locationId) =>{
    return Location.findOne({_id: new Types.ObjectId(locationId), deleted: false}).exec()
}

const deleteLocation = async (locationId) => {
    const result = await Location.updateOne(
        { _id: new Types.ObjectId(locationId) },
        { $set: { deleted: true } }
    );

    return result.modifiedCount > 0;
}

const updateRaisedAmount = async (locationId, raisedAmount) => {
    const result = await Location.updateOne(
        { _id: new Types.ObjectId(locationId), deleted: false },
        { $set: { raisedAmount: raisedAmount } }
    );

    return result.modifiedCount > 0;
}

const updateLocation = async (locationId, updatedLocation) => {
    const result = await Location.updateOne(
        { _id: new Types.ObjectId(locationId), deleted: false },
        { $set: { ...updatedLocation } }
    );

    return result.modifiedCount > 0;
}

module.exports = {
    addLocation,
    getLocations,
    getLocationById,
    deleteLocation,
    updateLocation,
    updateRaisedAmount
}