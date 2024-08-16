const authMiddleware = require("./authmiddleware");
const loggedInMiddleware = require("./loggedInmiddleware");
const tokenMiddleware = require("./tokenmiddleware");


module.exports = {
    authMiddleware,
    loggedInMiddleware,
    tokenMiddleware
}