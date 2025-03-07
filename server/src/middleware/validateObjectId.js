const mongoose = require('mongoose');

const validateObjectId = (req, res, next) => {
    const { locationId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(locationId)) {
        return res.status(400).json({ message: 'Invalid Location ID' });
    }

    next();
};

module.exports = validateObjectId;