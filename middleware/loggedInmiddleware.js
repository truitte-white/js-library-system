const { tokenMiddleware } = require('../middleware/index');
const axios = require('axios'); // Ensure axios is available for making API requests

module.exports = {
    loggedIn: async (req, res, next) => {
        try {
            const token = req.cookies['token'];
            if (!token) {
                res.locals.loggedIn = false;
                return next();
            }

            const decodedToken = tokenMiddleware.decode(token);
            if (!decodedToken) {
                res.locals.loggedIn = false;
                return next();
            }

            res.locals.loggedIn = true;
            res.locals.userId = decodedToken.userId;
            res.locals.role = decodedToken.role;

            // Fetch user details from the API
            const userId = res.locals.userId;
            if (userId) {
                try {
                    const userResponse = await axios.get(`http://localhost:5000/rfs-library/users/id/${userId}`);
                    const user = userResponse.data;
                    
                    res.locals.email = user.email || '';
                    res.locals.firstName = user.firstName || '';
                    res.locals.lastName = user.lastName || '';
                    res.locals.password = user.password || ''; // Be cautious with sensitive data
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }

            next();
        } catch (error) {
            console.error('Error in loggedIn middleware:', error);
            res.locals.loggedIn = false;
            next(error);
        }
    }
};
