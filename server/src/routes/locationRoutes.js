const express = require('express');
const {getLocations, deleteLocation, addLocation, getLocationById, updateRaisedAmount, updateLocation} = require("../controllers/locationController");
const asyncHandler = require('../utils/asyncHandler');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../utils/auth');


const router = express.Router();

router.get('/', asyncHandler(getLocations));
router.post('/', auth, asyncHandler(addLocation));

router.get('/:locationId', validateObjectId, asyncHandler(getLocationById));
router.delete('/:locationId', auth, validateObjectId, asyncHandler(deleteLocation));
router.put('/:locationId', auth, validateObjectId, asyncHandler(updateLocation));
router.put('/:locationId/raised_amount', auth, validateObjectId, asyncHandler(updateRaisedAmount));

module.exports = router;