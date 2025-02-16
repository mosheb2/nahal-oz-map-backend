const express = require('express');
const {getLocations, deleteLocation, addLocation, getLocationById, updateRaisedAmount, updateLocation} = require("../controllers/locationController");
const router = express.Router();

router.get('/', getLocations)
router.post('/', addLocation)

router.get('/:locationId', getLocationById)
router.delete('/:locationId', deleteLocation)
router.put('/:locationId', updateLocation)
router.put('/:locationId/raised_amount', updateRaisedAmount)


module.exports = router;