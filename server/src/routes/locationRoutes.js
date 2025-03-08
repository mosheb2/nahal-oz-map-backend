const express = require('express');
const {getLocations, deleteLocation, addLocation, getLocationById, updateRaisedAmount, updateLocation} = require("../controllers/locationController");
const asyncHandler = require('../utils/asyncHandler');
const validateObjectId = require('../middleware/validateObjectId');

const router = express.Router();

router.get('/', asyncHandler(getLocations));
router.post('/', asyncHandler(addLocation));

router.get('/:locationId', validateObjectId, asyncHandler(getLocationById));
router.delete('/:locationId', validateObjectId, asyncHandler(deleteLocation));
router.put('/:locationId', validateObjectId, asyncHandler(updateLocation));
router.put('/:locationId/raised_amount', validateObjectId, asyncHandler(updateRaisedAmount));

module.exports = router;