const locationService = require('../services/locationService');

const addLocation = async (req,res) => {
    const { size, sizeUnit, target, details, coordinates, imagesUrl, targetCurrency, title } = req.body;

    const location = {
        title,
        size,
        sizeUnit,
        target,
        targetCurrency,
        details,
        coordinates,
        imagesUrl
    }

    const createdLocation = await locationService.addLocation(location)
    res.status(201).json(createdLocation)
}

const getLocations  = async (req, res) => {
    const locations = await locationService.getLocations();
    res.status(200).json({
        locations
    });
}

const getLocationById = async (req, res) => {
    const locationId = req.params.locationId;
    const location = await locationService.getLocationById(locationId);
    if(location){
        res.status(200).json({
            location
        });
        return
    }

    res.status(404).json({
        message: 'Location not found'
    });
}

const deleteLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const wasDeleted = await locationService.deleteLocation(locationId);

    if(wasDeleted){
        res.status(204).send();
        return
    }

    res.status(500).send();
}

const updateRaisedAmount = async (req, res) => {
    const { locationId } = req.params;
    const { raisedAmount } = req.body;

    const wasUpdated = await locationService.updateRaisedAmount(locationId, raisedAmount);

    if(wasUpdated){
        res.status(204).send();
        return;
    }

    res.status(500).send({message: "Raised amount could not be updated"});
}

const updateLocation = async (req,res) => {
    const { locationId } = req.params;
    const { size, sizeUnit, target, details, coordinates, imagesUrl, targetCurrency, title } = req.body;

    const location = {
        title,
        size,
        sizeUnit,
        target,
        targetCurrency,
        details,
        coordinates,
        imagesUrl
    }
    const wasUpdated = await locationService.updateLocation(locationId, location);

    if(wasUpdated){
        res.status(204).send();
        return;
    }

    res.status(500).send({message: "Location could not be updated"});
}


module.exports ={
    getLocations,
    getLocationById,
    addLocation,
    updateLocation,
    deleteLocation,
    updateRaisedAmount
}