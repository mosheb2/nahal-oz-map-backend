const asyncHandler = fn => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next); // This will catch any async errors
    };
};

module.exports = asyncHandler;