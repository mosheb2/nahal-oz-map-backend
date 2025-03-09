const basicAuth = require("express-basic-auth");
const users = {
    'nahal_oz': '#bringthemhome',
};

const auth = basicAuth({
    users: users,
    challenge: true,
    unauthorizedResponse: (req) => {
        return `Credentials ${req.auth ? 'rejected' : 'not provided'}`;
    },
});

module.exports = auth;